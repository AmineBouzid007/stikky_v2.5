import { SEED_PRODUCTS, SEED_CATEGORIES, type SeedProduct } from "@/lib/db/seed"
import type { Product, ProductType } from "@/lib/types"

// -----------------------------------------------------------------------------
// This module is the single source of truth the storefront reads from today.
// It's built directly on top of lib/db/seed.ts (the same shape the Supabase
// `products` / `categories` tables use — see lib/db/schema.ts) so that once
// NEXT_PUBLIC_SUPABASE_URL is wired up, swapping these functions for real
// queries is a drop-in change: same `Product` / `Category` shapes throughout.
// -----------------------------------------------------------------------------

export interface CategoryMeta {
  slug: string
  name: string
  type: ProductType
  description: string
}

// Display names extend the brief's requested taxonomy (Cars, Anime, Football,
// F1, Movies/Series, Home Decor, Vector Art, Custom) onto the existing seed
// categories/images rather than inventing categories with no artwork behind them.
const CATEGORY_META: Record<string, { name: string; description: string }> = {
  "poster:cars": { name: "Cars & Racing", description: "JDM icons, endurance racers, and garage-worthy machines." },
  "poster:anime": { name: "Anime", description: "Moody, painterly scenes for late-night rewatches." },
  "poster:football": { name: "Football", description: "Stadium lights, dust, and the beautiful game." },
  "poster:movies": { name: "Movies & Series", description: "Cinema-grade tributes for the true film heads." },
  "poster:gaming": { name: "Gaming", description: "Pixel worlds and arcade nostalgia, framed." },
  "poster:lifestyle": { name: "Home Decor", description: "Quiet, architectural pieces for considered spaces." },
  "sticker:cars": { name: "Cars", description: "Die-cut JDM and racing silhouettes." },
  "sticker:anime": { name: "Anime", description: "Character packs with real personality." },
  "sticker:gaming": { name: "Gaming", description: "Retro controllers and pixel icons." },
  "sticker:quotes": { name: "Quotes", description: "Minimal typographic lines that stick." },
  "sticker:logos": { name: "Vector Art", description: "Abstract geometric marks, monochrome with a hit of orange." },
}

function toProduct(p: SeedProduct, index: number): Product {
  return {
    id: `seed-${index}-${p.slug}`,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    product_type: p.product_type,
    category: p.category,
    image_url: p.image_url,
    images: p.images,
    sizes: p.sizes,
    material: p.material,
    is_featured: p.is_featured,
    is_bestseller: p.is_bestseller,
    stock: 100,
    rating: p.rating,
    created_at: new Date("2026-01-01").toISOString(),
  }
}

const ALL_PRODUCTS: Product[] = SEED_PRODUCTS.map(toProduct)

export function getAllProducts(): Product[] {
  return ALL_PRODUCTS
}

export function getProductsByType(type: ProductType): Product[] {
  return ALL_PRODUCTS.filter((p) => p.product_type === type)
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}

export function getFeaturedProducts(limit = 4): Product[] {
  return ALL_PRODUCTS.filter((p) => p.is_featured).slice(0, limit)
}

export function getBestsellers(limit = 4): Product[] {
  return ALL_PRODUCTS.filter((p) => p.is_bestseller).slice(0, limit)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.product_type === product.product_type && p.category === product.category
  )
    .concat(ALL_PRODUCTS.filter((p) => p.id !== product.id && p.product_type === product.product_type))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, limit)
}

export function getCategories(type: ProductType): CategoryMeta[] {
  const seen = new Set<string>()
  return SEED_CATEGORIES.filter((c) => c.type === type)
    .filter((c) => {
      const key = `${c.type}:${c.slug}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map((c) => {
      const meta = CATEGORY_META[`${c.type}:${c.slug}`]
      return {
        slug: c.slug,
        type: c.type,
        name: meta?.name ?? c.name,
        description: meta?.description ?? "",
      }
    })
}

export function getCategoryMeta(type: ProductType, slug: string): CategoryMeta | undefined {
  return getCategories(type).find((c) => c.slug === slug)
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(0)}`
}
