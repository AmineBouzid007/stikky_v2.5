import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PageHeader } from "@/components/shop/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "Stikky is a Tunisian brand printing museum-grade framed posters and stickers, designed for fans and shipped worldwide.",
};

const values = [
  {
    number: "01",
    title: "Made for fans, not walls",
    description: "Every piece starts with something people actually love — a car, a scene, a character — not a generic pattern that fits any room.",
  },
  {
    number: "02",
    title: "Print quality over everything",
    description: "Archival paper and fade-resistant ink because a poster you paid for should still look right in five years.",
  },
  {
    number: "03",
    title: "Built in Tunisia, shipped everywhere",
    description: "We design and print out of Tunis and ship worldwide — proof that a small studio can hold a global standard.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <PageHeader
        eyebrow="Our story"
        title={
          <>
            Wall art built
            <br />
            <span className="text-muted-foreground">by obsessives.</span>
          </>
        }
        description="Stikky started with a simple frustration: nothing you could buy looked like the things we actually cared about. So we started printing it ourselves."
      />

      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 lg:mb-32">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              From Tunis to your wall
            </span>
            <h2 className="text-4xl lg:text-5xl font-display leading-tight mb-6">
              A small studio with a global standard.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Stikky is a Tunisian brand designing and printing framed posters and stickers for the things people
              are genuinely obsessed with — cars, anime, football, cinema, and gaming. We treat every poster like a
              piece of art, not a printout: real materials, real frames, and design that respects the source.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What we couldn&apos;t find on any wall, we started making ourselves. Today that same instinct drives
              every custom request that lands in our inbox — if you can describe it, our design team can build it.
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-secondary/40 border border-foreground/10">
            <img src="/stikky-studio.png" alt="Inside the Stikky studio" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {values.map((v) => (
            <div key={v.number} className="border border-foreground/10 p-8">
              <span className="font-mono text-sm text-stikky-orange">{v.number}</span>
              <h3 className="font-display text-2xl mt-4 mb-4">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
