"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/types";
import { formatPrice, getCategoryMeta } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/shop/product-card";
import { toast } from "sonner";

const REVIEW_POOL = [
  { name: "Amine K.", body: "Print quality is genuinely gallery-level. Colors are richer in person than in the photos." },
  { name: "Sarra B.", body: "Arrived already framed and perfectly packaged. Straight onto the wall, zero fuss." },
  { name: "Yassine T.", body: "Ordered the large size for my office — it's the first thing people ask about now." },
  { name: "Nour H.", body: "Fast shipping and the paper feels genuinely premium, not like a poster shop print." },
  { name: "Malek R.", body: "Bought this as a gift and ended up ordering one for myself too. Worth it." },
];

function mockReviewsFor(slug: string) {
  const seed = slug.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return [0, 1, 2].map((i) => REVIEW_POOL[(seed + i) % REVIEW_POOL.length]);
}

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, open } = useCart();
  const categoryMeta = getCategoryMeta(product.product_type, product.category);
  const size = product.sizes[sizeIndex];
  const unitPrice = product.price + size.price;
  const reviews = useMemo(() => mockReviewsFor(product.slug), [product.slug]);
  const images = product.images.length > 0 ? product.images : [product.image_url];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: unitPrice,
      quantity,
      size: size.label,
      image_url: product.image_url,
      product_type: product.product_type,
    });
    toast(`${product.name} added to cart`, {
      description: `${size.label} × ${quantity} · ${formatPrice(unitPrice * quantity)}`,
    });
    open();
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-24 lg:pb-32">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-10">
        <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
        <span>/</span>
        <Link
          href={product.product_type === "poster" ? "/collections/posters" : "/collections/stickers"}
          className="hover:text-foreground transition-colors capitalize"
        >
          {product.product_type}s
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div>
          <div
            className={`relative overflow-hidden bg-secondary/40 border border-foreground/10 ${
              product.product_type === "poster" ? "aspect-[3/4]" : "aspect-square"
            }`}
          >
            <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 overflow-hidden border transition-colors ${
                    i === activeImage ? "border-stikky-orange" : "border-foreground/10"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground">
            {categoryMeta?.name ?? product.category}
          </span>
          <h1 className="font-display text-4xl lg:text-5xl mt-2 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating) ? "fill-stikky-orange text-stikky-orange" : "text-foreground/20"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)} · {reviews.length} reviews</span>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-6 max-w-lg">{product.description}</p>

          <div className="mt-8">
            <span className="font-display text-4xl">{formatPrice(unitPrice)}</span>
          </div>

          {/* Size selector */}
          <div className="mt-8">
            <span className="text-sm font-medium">Size</span>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {product.sizes.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSizeIndex(i)}
                  className={`border px-4 py-3 text-left transition-colors ${
                    i === sizeIndex
                      ? "border-stikky-orange bg-stikky-orange/10"
                      : "border-foreground/15 hover:border-foreground/30"
                  }`}
                >
                  <span className="block text-sm font-medium">{s.label}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{s.dimensions}</span>
                  <span className="block text-xs font-mono mt-1">
                    {s.price === 0 ? "included" : `+${formatPrice(s.price)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + add to cart */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border border-foreground/15 rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center hover:text-stikky-orange transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-11 flex items-center justify-center hover:text-stikky-orange transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-stikky-orange hover:brightness-110 text-white rounded-full h-[44px] text-base"
            >
              Add to cart — {formatPrice(unitPrice * quantity)}
            </Button>
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-foreground/10">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground leading-tight">Tracked worldwide shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground leading-tight">Archival, fade-resistant print</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground leading-tight">14-day return window</span>
            </div>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="material">
              <AccordionTrigger className="text-sm">Material &amp; care</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {product.material ?? "Premium archival materials, made to last."} Keep out of direct, prolonged sunlight and wipe with a dry cloth.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-sm">Shipping &amp; returns</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                Printed to order and shipped within 48 hours. Delivery typically takes 4–6 business days.
                Free shipping on orders over $75. Not right for your wall? Return it within 14 days for a full refund.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="custom">
              <AccordionTrigger className="text-sm">Want it customized?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                Send us your own photo or idea inspired by this piece and our design team will build a proof you approve before printing.{" "}
                <Link href="/custom" className="text-stikky-orange hover:underline">Start a custom order →</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-24 lg:mt-32 pt-16 border-t border-foreground/10">
        <h2 className="text-3xl lg:text-4xl font-display mb-10">What people are saying</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="border border-foreground/10 p-6">
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-stikky-orange text-stikky-orange" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{r.body}&rdquo;</p>
              <span className="block text-sm font-medium mt-4">{r.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24 lg:mt-32 pt-16 border-t border-foreground/10">
          <h2 className="text-3xl lg:text-4xl font-display mb-10">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
