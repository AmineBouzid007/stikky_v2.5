import { NextResponse, type NextRequest } from "next/server"
import { Client } from "pg"
import { SCHEMA_SQL } from "@/lib/db/schema"
import { SEED_CATEGORIES, SEED_PRODUCTS } from "@/lib/db/seed"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const SETUP_TOKEN = "stikky-setup-2026"

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")
  if (token !== SETUP_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const connectionString =
    process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
  if (!connectionString) {
    return NextResponse.json({ error: "No database connection string" }, { status: 500 })
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await client.connect()

    // 1. Schema
    await client.query(SCHEMA_SQL)

    // 2. Seed categories (idempotent)
    for (const c of SEED_CATEGORIES) {
      await client.query(
        `insert into public.categories (name, slug, type)
         values ($1, $2, $3)
         on conflict (slug, type) do update set name = excluded.name`,
        [c.name, c.slug, c.type],
      )
    }

    // 3. Seed products (idempotent by slug)
    for (const p of SEED_PRODUCTS) {
      await client.query(
        `insert into public.products
          (slug, name, description, price, product_type, category, image_url, images, sizes, material, is_featured, is_bestseller, rating)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         on conflict (slug) do update set
           name = excluded.name,
           description = excluded.description,
           price = excluded.price,
           product_type = excluded.product_type,
           category = excluded.category,
           image_url = excluded.image_url,
           images = excluded.images,
           sizes = excluded.sizes,
           material = excluded.material,
           is_featured = excluded.is_featured,
           is_bestseller = excluded.is_bestseller,
           rating = excluded.rating`,
        [
          p.slug,
          p.name,
          p.description,
          p.price,
          p.product_type,
          p.category,
          p.image_url,
          p.images,
          JSON.stringify(p.sizes),
          p.material,
          p.is_featured,
          p.is_bestseller,
          p.rating,
        ],
      )
    }

    // 4. Seed a few reviews for social proof
    const { rows: featured } = await client.query(
      `select id from public.products where is_bestseller = true limit 4`,
    )
    const reviewSamples = [
      { author: "Yassine B.", rating: 5, comment: "The print quality is unreal. Feels like a gallery piece." },
      { author: "Mariem T.", rating: 5, comment: "Shipping was fast and the frame is gorgeous. Ordering again." },
      { author: "Omar K.", rating: 4, comment: "Colors are rich and the paper is thick. Very happy." },
      { author: "Sarra L.", rating: 5, comment: "Transformed my whole room. Worth every dinar." },
    ]
    for (let i = 0; i < featured.length; i++) {
      const r = reviewSamples[i % reviewSamples.length]
      const { rows: existing } = await client.query(
        `select id from public.reviews where product_id = $1 and author_name = $2 limit 1`,
        [featured[i].id, r.author],
      )
      if (existing.length === 0) {
        await client.query(
          `insert into public.reviews (product_id, author_name, rating, comment) values ($1,$2,$3,$4)`,
          [featured[i].id, r.author, r.rating, r.comment],
        )
      }
    }

    const { rows: counts } = await client.query(
      `select
        (select count(*) from public.products) as products,
        (select count(*) from public.categories) as categories,
        (select count(*) from public.reviews) as reviews`,
    )

    return NextResponse.json({ ok: true, counts: counts[0] })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    )
  } finally {
    await client.end().catch(() => {})
  }
}
