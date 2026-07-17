"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PageHeader } from "@/components/shop/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      toast("Message sent — we'll reply within a business day.");
    }, 500);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Talk to a
            <br />
            <span className="text-muted-foreground">real human.</span>
          </>
        }
        description="Questions about an order, a custom piece, or a wholesale inquiry — we usually reply within one business day."
      />

      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-stikky-orange mt-1 shrink-0" />
              <div>
                <span className="block text-sm font-medium">Email</span>
                <span className="text-muted-foreground text-sm">hello@stikky.tn</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-stikky-orange mt-1 shrink-0" />
              <div>
                <span className="block text-sm font-medium">Phone / WhatsApp</span>
                <span className="text-muted-foreground text-sm">+216 00 000 000</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-stikky-orange mt-1 shrink-0" />
              <div>
                <span className="block text-sm font-medium">Studio</span>
                <span className="text-muted-foreground text-sm">Tunis, Tunisia — shipping worldwide</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div className="border border-foreground/10 p-10 text-center">
                <h2 className="font-display text-2xl mb-3">Message sent</h2>
                <p className="text-muted-foreground">Thanks for reaching out — we&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={6} required />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-stikky-orange hover:brightness-110 text-white rounded-full h-14 px-8 text-base"
                >
                  {submitting ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
