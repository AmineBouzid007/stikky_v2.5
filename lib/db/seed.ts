import type { ProductType } from "@/lib/types"

const posterSizes = [
  { label: "A4", dimensions: "21 x 30 cm", price: 0 },
  { label: "A3", dimensions: "30 x 42 cm", price: 20 },
  { label: "A2", dimensions: "42 x 59 cm", price: 45 },
]

const stickerSizes = [
  { label: "Small", dimensions: "5 x 5 cm", price: 0 },
  { label: "Medium", dimensions: "10 x 10 cm", price: 4 },
  { label: "Large", dimensions: "15 x 15 cm", price: 8 },
]

export const SEED_CATEGORIES: { name: string; slug: string; type: ProductType }[] = [
  { name: "Cars", slug: "cars", type: "poster" },
  { name: "Anime", slug: "anime", type: "poster" },
  { name: "Football", slug: "football", type: "poster" },
  { name: "Movies", slug: "movies", type: "poster" },
  { name: "Gaming", slug: "gaming", type: "poster" },
  { name: "Lifestyle", slug: "lifestyle", type: "poster" },
  { name: "Cars", slug: "cars", type: "sticker" },
  { name: "Anime", slug: "anime", type: "sticker" },
  { name: "Gaming", slug: "gaming", type: "sticker" },
  { name: "Quotes", slug: "quotes", type: "sticker" },
  { name: "Logos", slug: "logos", type: "sticker" },
]

export interface SeedProduct {
  slug: string
  name: string
  description: string
  price: number
  product_type: ProductType
  category: string
  image_url: string
  images: string[]
  sizes: typeof posterSizes
  material: string
  is_featured: boolean
  is_bestseller: boolean
  rating: number
}

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    slug: "midnight-gtr",
    name: "Midnight GT-R",
    description:
      "A cinematic study of Japan's most iconic machine, bathed in a single warm rim light against pure black. Printed on premium matte fine-art paper that makes the reflections glow.",
    price: 65,
    product_type: "poster",
    category: "cars",
    image_url: "/products/poster-nissan-gtr.png",
    images: ["/products/poster-nissan-gtr.png"],
    sizes: posterSizes,
    material: "260gsm museum-grade matte paper",
    is_featured: true,
    is_bestseller: true,
    rating: 4.9,
  },
  {
    slug: "neo-tokyo-nights",
    name: "Neo Tokyo Nights",
    description:
      "Neon-drenched streets and a lone silhouette. A moody anime cityscape that turns any wall into a scene from your favourite late-night episode.",
    price: 59,
    product_type: "poster",
    category: "anime",
    image_url: "/products/poster-neo-tokyo.png",
    images: ["/products/poster-neo-tokyo.png"],
    sizes: posterSizes,
    material: "260gsm museum-grade matte paper",
    is_featured: true,
    is_bestseller: false,
    rating: 4.8,
  },
  {
    slug: "the-last-dribble",
    name: "The Last Dribble",
    description:
      "Stadium floodlights, dust in the air, and one decisive touch. A dramatic football poster for anyone who lives for the beautiful game.",
    price: 55,
    product_type: "poster",
    category: "football",
    image_url: "/products/poster-football.png",
    images: ["/products/poster-football.png"],
    sizes: posterSizes,
    material: "260gsm museum-grade matte paper",
    is_featured: false,
    is_bestseller: true,
    rating: 4.7,
  },
  {
    slug: "golden-reel",
    name: "Golden Reel",
    description:
      "A noir tribute to cinema, a beam of projector light cutting through the dark. Understated, elegant, and unmistakably filmic.",
    price: 59,
    product_type: "poster",
    category: "movies",
    image_url: "/products/poster-cinema.png",
    images: ["/products/poster-cinema.png"],
    sizes: posterSizes,
    material: "260gsm museum-grade matte paper",
    is_featured: false,
    is_bestseller: false,
    rating: 4.6,
  },
  {
    slug: "pixel-ascension",
    name: "Pixel Ascension",
    description:
      "An abstract climb toward the light, rendered in glowing pixel art. Built for the gamer who appreciates design as much as the grind.",
    price: 62,
    product_type: "poster",
    category: "gaming",
    image_url: "/products/poster-gaming.png",
    images: ["/products/poster-gaming.png"],
    sizes: posterSizes,
    material: "260gsm museum-grade matte paper",
    is_featured: false,
    is_bestseller: true,
    rating: 4.8,
  },
  {
    slug: "concrete-calm",
    name: "Concrete Calm",
    description:
      "Brutalist architecture meets a single shaft of warm sunlight. A serene, minimal statement piece for the considered space.",
    price: 69,
    product_type: "poster",
    category: "lifestyle",
    image_url: "/products/poster-lifestyle.png",
    images: ["/products/poster-lifestyle.png"],
    sizes: posterSizes,
    material: "260gsm museum-grade matte paper",
    is_featured: true,
    is_bestseller: false,
    rating: 4.9,
  },
  {
    slug: "velocity-917",
    name: "Velocity 917",
    description:
      "A silver icon of endurance racing, captured in a dramatic dark studio. Fine-art automotive photography for the purist.",
    price: 65,
    product_type: "poster",
    category: "cars",
    image_url: "/products/poster-porsche.png",
    images: ["/products/poster-porsche.png"],
    sizes: posterSizes,
    material: "260gsm museum-grade matte paper",
    is_featured: false,
    is_bestseller: false,
    rating: 4.7,
  },
  {
    slug: "dusk-spirits",
    name: "Dusk Spirits",
    description:
      "A dreamy hillside under an endless dusk sky. Painterly, warm, and quietly emotional, inspired by the golden age of animation.",
    price: 59,
    product_type: "poster",
    category: "anime",
    image_url: "/products/poster-anime-dusk.png",
    images: ["/products/poster-anime-dusk.png"],
    sizes: posterSizes,
    material: "260gsm museum-grade matte paper",
    is_featured: false,
    is_bestseller: true,
    rating: 4.9,
  },
  {
    slug: "jdm-sticker-pack",
    name: "JDM Silhouette Pack",
    description:
      "Eight die-cut vinyl stickers of legendary JDM silhouettes. Weatherproof, glossy, and made to survive laptops, bottles, and bumpers alike.",
    price: 18,
    product_type: "sticker",
    category: "cars",
    image_url: "/products/sticker-cars.png",
    images: ["/products/sticker-cars.png"],
    sizes: stickerSizes,
    material: "Weatherproof glossy vinyl",
    is_featured: false,
    is_bestseller: true,
    rating: 4.8,
  },
  {
    slug: "anime-faces-pack",
    name: "Anime Faces Pack",
    description:
      "A colourful set of die-cut anime character stickers. The perfect way to give your gear a little more personality.",
    price: 16,
    product_type: "sticker",
    category: "anime",
    image_url: "/products/sticker-anime.png",
    images: ["/products/sticker-anime.png"],
    sizes: stickerSizes,
    material: "Weatherproof glossy vinyl",
    is_featured: true,
    is_bestseller: false,
    rating: 4.7,
  },
  {
    slug: "arcade-icons-pack",
    name: "Arcade Icons Pack",
    description:
      "Retro controllers and pixel icons in a premium die-cut set. A love letter to gaming, ready to stick anywhere.",
    price: 16,
    product_type: "sticker",
    category: "gaming",
    image_url: "/products/sticker-gaming.png",
    images: ["/products/sticker-gaming.png"],
    sizes: stickerSizes,
    material: "Weatherproof glossy vinyl",
    is_featured: false,
    is_bestseller: false,
    rating: 4.6,
  },
  {
    slug: "stay-focused-pack",
    name: "Stay Focused Pack",
    description:
      "Minimal typographic quote stickers to keep you moving. Clean matte lettering that looks great on any surface.",
    price: 14,
    product_type: "sticker",
    category: "quotes",
    image_url: "/products/sticker-quotes.png",
    images: ["/products/sticker-quotes.png"],
    sizes: stickerSizes,
    material: "Matte removable vinyl",
    is_featured: false,
    is_bestseller: true,
    rating: 4.8,
  },
  {
    slug: "minimal-logos-pack",
    name: "Minimal Logos Pack",
    description:
      "Abstract geometric marks in a restrained monochrome palette with a hit of orange. Design-forward stickers for the details-obsessed.",
    price: 15,
    product_type: "sticker",
    category: "logos",
    image_url: "/products/sticker-logos.png",
    images: ["/products/sticker-logos.png"],
    sizes: stickerSizes,
    material: "Weatherproof glossy vinyl",
    is_featured: true,
    is_bestseller: false,
    rating: 4.7,
  },
  {
    slug: "retro-racer-sticker",
    name: "Retro Racer",
    description:
      "A single oversized die-cut sticker of a striped vintage racer. A bold statement piece for laptops and hard cases.",
    price: 9,
    product_type: "sticker",
    category: "cars",
    image_url: "/products/sticker-retro-racer.png",
    images: ["/products/sticker-retro-racer.png"],
    sizes: stickerSizes,
    material: "Weatherproof glossy vinyl",
    is_featured: false,
    is_bestseller: false,
    rating: 4.9,
  },
]
