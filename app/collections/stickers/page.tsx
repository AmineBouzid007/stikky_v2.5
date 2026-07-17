import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PageHeader } from "@/components/shop/page-header";
import { ShopGrid } from "@/components/shop/shop-grid";
import { getCategories, getProductsByType } from "@/lib/products";

export const metadata: Metadata = {
  title: "Stickers",
  description: "Die-cut, weatherproof stickers across cars, anime, gaming, quotes, and vector art. Built to survive laptops, bottles, and bumpers.",
};

export default async function StickersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = getProductsByType("sticker");
  const categories = getCategories("sticker");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <PageHeader
        eyebrow="Stickers"
        title={
          <>
            Small format,
            <br />
            <span className="text-muted-foreground">big personality.</span>
          </>
        }
        description="Weatherproof, glossy die-cut vinyl in packs or singles. Made to survive laptops, water bottles, and bumpers alike."
      />
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <ShopGrid products={products} categories={categories} initialCategory={category} />
      </section>
      <FooterSection />
    </main>
  );
}
