"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/lib/types";
import { formatPrice, getCategoryMeta } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addItem, open } = useCart();
  const categoryMeta = getCategoryMeta(product.product_type, product.category);
  const baseSize = product.sizes[0];

  const handleQuickAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price + baseSize.price,
      quantity: 1,
      size: baseSize.label,
      image_url: product.image_url,
      product_type: product.product_type,
    });
    toast(`${product.name} added to cart`, {
      description: `${baseSize.label} · ${formatPrice(product.price + baseSize.price)}`,
    });
    open();
  };

  return (
    <>
      <div className="group relative flex flex-col">
        <Link
          href={`/product/${product.slug}`}
          className={`relative block overflow-hidden bg-secondary/40 border border-foreground/10 ${
            product.product_type === "poster" ? "aspect-[3/4]" : "aspect-square"
          }`}
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_bestseller && (
              <span className="text-[10px] font-mono tracking-wide uppercase px-2 py-1 bg-stikky-orange text-white rounded-sm">
                Bestseller
              </span>
            )}
            {product.is_featured && !product.is_bestseller && (
              <span className="text-[10px] font-mono tracking-wide uppercase px-2 py-1 bg-white text-black rounded-sm">
                Featured
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
              aria-label="Quick preview"
              className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleQuickAdd();
              }}
              aria-label="Add to cart"
              className="w-9 h-9 rounded-full bg-stikky-orange text-white flex items-center justify-center hover:brightness-110 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </Link>

        <div className="pt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground">
              {categoryMeta?.name ?? product.category}
            </span>
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-display text-xl leading-tight mt-1 truncate hover:text-stikky-orange transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 fill-stikky-orange text-stikky-orange" />
              <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <span className="font-display text-xl shrink-0">{formatPrice(product.price)}</span>
        </div>
      </div>

      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-3xl bg-background border-foreground/10 p-0 overflow-hidden">
          <DialogTitle className="sr-only">{product.name} quick preview</DialogTitle>
          <div className="grid md:grid-cols-2">
            <div className={`bg-secondary/40 ${product.product_type === "poster" ? "aspect-[3/4]" : "aspect-square"}`}>
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground">
                {categoryMeta?.name ?? product.category}
              </span>
              <h3 className="font-display text-3xl mt-2">{product.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-4 line-clamp-4">
                {product.description}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-3xl">{formatPrice(product.price)}</span>
                <span className="text-xs text-muted-foreground font-mono">from · {baseSize.label}</span>
              </div>
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Button
                  className="bg-stikky-orange hover:brightness-110 text-white rounded-full h-12"
                  onClick={() => {
                    handleQuickAdd();
                    setQuickViewOpen(false);
                  }}
                >
                  Add to cart — {formatPrice(product.price + baseSize.price)}
                </Button>
                <Button asChild variant="outline" className="rounded-full h-12 border-foreground/20">
                  <Link href={`/product/${product.slug}`}>View full details</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
