import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ProductCard } from "@/components/shop/product-card";
import { getBestsellers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Shop Stikky framed posters and die-cut stickers across cars, anime, football, movies, gaming, and more.",
};

const tiles = [
  {
    href: "/collections/posters",
    label: "Posters",
    tagline: "Framed, museum-grade, ready to hang",
    image: "/products/poster-neo-tokyo.png",
  },
  {
    href: "/collections/stickers",
    label: "Stickers",
    tagline: "Die-cut, weatherproof, made to stack",
    image: "/products/sticker-cars.png",
  },
];

export default function CollectionsPage() {
  const bestsellers = getBestsellers(4);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-16 lg:pt-48 lg:pb-20">
        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
          <span className="w-8 h-px bg-foreground/30" />
          The full collection
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-display tracking-tight leading-[0.95] max-w-4xl">
          Posters &amp; stickers,
          <br />
          made for fans.
        </h1>
      </div>

      {/* Two big category tiles */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {tiles.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-black border border-foreground/10"
            >
              <img
                src={tile.image}
                alt={tile.label}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
                <span className="text-sm font-mono text-white/60 mb-2">{tile.tagline}</span>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl lg:text-6xl font-display text-white">{tile.label}</h2>
                  <ArrowUpRight className="w-8 h-8 text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom design CTA strip */}
        <Link
          href="/custom"
          className="group mt-4 lg:mt-6 relative flex items-center justify-between gap-6 border border-foreground/10 bg-secondary/30 hover:bg-secondary/50 transition-colors px-8 py-8 lg:px-12 lg:py-10"
        >
          <div>
            <span className="text-sm font-mono text-muted-foreground">Not seeing it?</span>
            <h3 className="text-2xl lg:text-3xl font-display mt-1">Design a fully custom piece</h3>
          </div>
          <ArrowUpRight className="w-8 h-8 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
        </Link>
      </section>

      {/* Bestsellers */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl lg:text-4xl font-display">Bestsellers right now</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
