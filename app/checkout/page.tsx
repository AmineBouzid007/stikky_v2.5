"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart-context";
import { createOrder, getProfile } from "@/lib/local-store";
import { formatPrice } from "@/lib/products";
import type { PaymentMethod } from "@/lib/types";
import { toast } from "sonner";

const GOVERNORATES = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
  "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", "Other",
];

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const router = useRouter();
  const profile = getProfile();

  const [form, setForm] = useState({
    full_name: profile?.full_name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    address: profile?.address ?? "",
    city: profile?.city ?? "",
    governorate: profile?.governorate ?? "Tunis",
    notes: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    const order = createOrder({
      customer: form,
      items,
      subtotal,
      shipping,
      total,
      payment_method: payment,
      notes: form.notes,
    });
    clear();
    toast(`Order ${order.id} placed`, { description: "You can track it from your account." });
    router.push("/account?tab=orders");
  };

  if (items.length === 0) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-background">
        <Navigation />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24 lg:pt-48 lg:pb-32 text-center">
          <h1 className="text-4xl font-display mb-6">Your cart is empty</h1>
          <Button asChild className="bg-stikky-orange hover:brightness-110 text-white rounded-full h-12 px-8">
            <Link href="/collections">Browse the collection</Link>
          </Button>
        </div>
        <FooterSection />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <h1 className="text-5xl lg:text-6xl font-display tracking-tight mb-12">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-2xl mb-6">Contact &amp; shipping</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full name</Label>
                  <Input
                    id="full_name"
                    required
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="governorate">Governorate</Label>
                  <select
                    id="governorate"
                    value={form.governorate}
                    onChange={(e) => setForm({ ...form, governorate: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                  >
                    {GOVERNORATES.map((g) => (
                      <option key={g} value={g} className="bg-background">{g}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Order notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Delivery instructions, gift note, etc."
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl mb-6">Payment method</h2>
              <RadioGroup value={payment} onValueChange={(v) => setPayment(v as PaymentMethod)} className="space-y-3">
                {[
                  { value: "cod", label: "Cash on delivery", desc: "Pay when your order arrives" },
                  { value: "paymee", label: "Paymee", desc: "Local card & wallet payment" },
                  { value: "flouci", label: "Flouci", desc: "Local card & wallet payment" },
                  { value: "stripe", label: "Card (Stripe)", desc: "International cards" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    htmlFor={opt.value}
                    className={`flex items-center gap-4 border px-5 py-4 cursor-pointer transition-colors ${
                      payment === opt.value ? "border-stikky-orange bg-stikky-orange/10" : "border-foreground/15"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <div>
                      <span className="block text-sm font-medium">{opt.label}</span>
                      <span className="block text-xs text-muted-foreground">{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border border-foreground/10 p-8 sticky top-32">
              <h2 className="font-display text-2xl mb-6">Order summary</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-3 items-center">
                    <div className="w-14 h-14 shrink-0 overflow-hidden bg-secondary/40 border border-foreground/10">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.size} × {item.quantity}</p>
                    </div>
                    <span className="text-sm shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm mt-6 pt-6 border-t border-foreground/10">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm mt-3">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-display text-2xl mt-6 pt-6 border-t border-foreground/10">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-stikky-orange hover:brightness-110 text-white rounded-full h-14 text-base mt-8"
              >
                Place order
              </Button>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                This is a demo checkout — no payment is actually processed.
              </p>
            </div>
          </div>
        </form>
      </div>
      <FooterSection />
    </main>
  );
}
