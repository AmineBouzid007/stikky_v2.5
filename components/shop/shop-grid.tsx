"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import type { Product, ProductType } from "@/lib/types";
import type { CategoryMeta } from "@/lib/products";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export function ShopGrid({
  products,
  categories,
  initialCategory,
}: {
  products: Product[];
  categories: CategoryMeta[];
  initialCategory?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory ?? "all");
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    }
    return sorted;
  }, [products, activeCategory, sort]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`text-sm px-4 py-2 rounded-full border transition-colors font-mono ${
              activeCategory === "all"
                ? "bg-stikky-orange border-stikky-orange text-white"
                : "border-foreground/15 text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors font-mono ${
                activeCategory === c.slug
                  ? "bg-stikky-orange border-stikky-orange text-white"
                  : "border-foreground/15 text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-muted-foreground uppercase">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="bg-transparent border border-foreground/15 rounded-full text-sm px-4 py-2 focus:outline-none focus:border-stikky-orange text-foreground"
          >
            <option value="featured" className="bg-background">Featured</option>
            <option value="price-asc" className="bg-background">Price: low to high</option>
            <option value="price-desc" className="bg-background">Price: high to low</option>
            <option value="rating" className="bg-background">Top rated</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground">
          Nothing here yet — try a different category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
