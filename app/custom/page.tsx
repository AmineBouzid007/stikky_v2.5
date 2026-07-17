"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadCloud, Check } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PageHeader } from "@/components/shop/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ProductType } from "@/lib/types";
import { toast } from "sonner";

export default function CustomPage() {
  const [productType, setProductType] = useState<ProductType>("poster");
  const [size, setSize] = useState("A3");
  const [frame, setFrame] = useState("Solid black frame");
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Demo submission — wire this to /api/custom-requests + Supabase `custom_requests`
    // table (see lib/db/schema.ts) once the backend is connected.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast("Custom request sent — our design team will be in touch within 48h.");
    }, 600);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <PageHeader
        eyebrow="Custom design"
        title={
          <>
            Send a photo,
            <br />
            <span className="text-muted-foreground">we&apos;ll build the proof.</span>
          </>
        }
        description="Fully custom posters and stickers, designed around your own reference. You approve the proof before anything goes to print — usually within 2 days."
      />

      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        {submitted ? (
          <div className="max-w-xl mx-auto text-center border border-foreground/10 py-20 px-8">
            <div className="w-14 h-14 rounded-full bg-stikky-orange/10 border border-stikky-orange flex items-center justify-center mx-auto mb-6">
              <Check className="w-6 h-6 text-stikky-orange" />
            </div>
            <h2 className="font-display text-3xl mb-4">Request received</h2>
            <p className="text-muted-foreground mb-8">
              Our design team is on it. Expect a design proof in your inbox within 48 hours — nothing gets printed until you approve it.
            </p>
            <Button asChild variant="outline" className="rounded-full h-12 px-8 border-foreground/20">
              <Link href="/collections">Keep browsing</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-8">
              <div>
                <span className="text-sm font-medium">What are we making?</span>
                <RadioGroup
                  value={productType}
                  onValueChange={(v) => setProductType(v as ProductType)}
                  className="grid grid-cols-2 gap-3 mt-3"
                >
                  {[
                    { value: "poster", label: "A framed poster" },
                    { value: "sticker", label: "A sticker / sticker pack" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      htmlFor={`type-${opt.value}`}
                      className={`flex items-center gap-3 border px-5 py-4 cursor-pointer transition-colors ${
                        productType === opt.value ? "border-stikky-orange bg-stikky-orange/10" : "border-foreground/15"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} id={`type-${opt.value}`} />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" required />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Preferred size</Label>
                  <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                  >
                    {(productType === "poster" ? ["A4", "A3", "A2"] : ["Small", "Medium", "Large"]).map((s) => (
                      <option key={s} value={s} className="bg-background">{s}</option>
                    ))}
                  </select>
                </div>
                {productType === "poster" && (
                  <div className="space-y-2">
                    <Label htmlFor="frame">Frame option</Label>
                    <select
                      id="frame"
                      value={frame}
                      onChange={(e) => setFrame(e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                    >
                      {["Solid black frame", "Natural oak frame", "No frame — print only"].map((f) => (
                        <option key={f} value={f} className="bg-background">{f}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Tell us about the idea</Label>
                <Textarea
                  id="notes"
                  rows={5}
                  placeholder="A photo you want stylized, a scene, a character, a quote — the more detail, the better the first proof."
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="bg-stikky-orange hover:brightness-110 text-white rounded-full h-14 px-8 text-base"
              >
                {submitting ? "Sending…" : "Send request"}
              </Button>
            </div>

            {/* Upload panel */}
            <div className="lg:col-span-2">
              <span className="text-sm font-medium">Reference image (optional)</span>
              <label
                htmlFor="reference"
                className="mt-3 flex flex-col items-center justify-center gap-3 border border-dashed border-foreground/20 hover:border-stikky-orange transition-colors aspect-square cursor-pointer overflow-hidden"
              >
                {preview ? (
                  <img src={preview} alt="Reference preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload a photo</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
                  </>
                )}
                <input id="reference" type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              {fileName && <p className="text-xs text-muted-foreground mt-2 font-mono truncate">{fileName}</p>}
            </div>
          </form>
        )}
      </section>

      <FooterSection />
    </main>
  );
}
