import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PageHeader } from "@/components/shop/page-header";
import { ShopGrid } from "@/components/shop/shop-grid";
import { getCategories, getProductsByType } from "@/lib/products";

export const metadata: Metadata = {
  title: "Posters",
  description: "Framed posters across cars & racing, anime, football, movies & series, gaming, and home decor. Museum-grade printing, ready to hang.",
};

export default async function PostersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = getProductsByType("poster");
  const categories = getCategories("poster");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <PageHeader
        eyebrow="Posters"
        title={
          <>
            Framed art for
            <br />
            <span className="text-muted-foreground">every obsession.</span>
          </>
        }
        description="200gsm archival matte paper, a solid frame, and hanging hardware already attached. Pick a size, we do the rest."
      />
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <ShopGrid products={products} categories={categories} initialCategory={category} />
      </section>
      <FooterSection />
    </main>
  );
}
