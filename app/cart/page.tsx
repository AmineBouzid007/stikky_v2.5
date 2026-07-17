"use client";

import Link from "next/link";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, shipping, total } = useCart();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <h1 className="text-5xl lg:text-6xl font-display tracking-tight mb-4">Your cart</h1>
        <p className="text-muted-foreground mb-12">
          {items.length === 0 ? "Your cart is empty." : `${items.reduce((s, i) => s + i.quantity, 0)} item(s) ready to ship.`}
        </p>

        {items.length === 0 ? (
          <div className="border border-foreground/10 py-24 flex flex-col items-center gap-6">
            <p className="text-muted-foreground">Nothing here yet — go find something for your wall.</p>
            <Button asChild className="bg-stikky-orange hover:brightness-110 text-white rounded-full h-12 px-8">
              <Link href="/collections">Browse the collection</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col divide-y divide-foreground/10 border-t border-b border-foreground/10">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex gap-6 py-6">
                  <Link
                    href={`/product/${item.slug}`}
                    className="w-24 h-24 shrink-0 overflow-hidden bg-secondary/40 border border-foreground/10"
                  >
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div>
                      <Link href={`/product/${item.slug}`} className="font-display text-xl hover:text-stikky-orange transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-xs font-mono text-muted-foreground mt-1 uppercase">
                        {item.size} · {item.product_type}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-foreground/15 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:text-stikky-orange transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:text-stikky-orange transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-lg w-16 text-right">{formatPrice(item.price * item.quantity)}</span>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        aria-label="Remove item"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border border-foreground/10 p-8 sticky top-32">
                <h2 className="font-display text-2xl mb-6">Order summary</h2>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {remainingForFreeShipping > 0 && (
                  <p className="text-xs font-mono text-stikky-orange mt-2">
                    Add {formatPrice(remainingForFreeShipping)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between font-display text-2xl mt-6 pt-6 border-t border-foreground/10">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Button
                  asChild
                  className="w-full bg-stikky-orange hover:brightness-110 text-white rounded-full h-14 text-base mt-8 group"
                >
                  <Link href="/checkout">
                    Checkout
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <FooterSection />
    </main>
  );
}
