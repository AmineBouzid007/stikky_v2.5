// Full database schema for the Stikky ecommerce platform.
// Executed idempotently by the guarded /api/setup route.

export const SCHEMA_SQL = /* sql */ `
-- ============ PROFILES ============
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- ============ CATEGORIES ============
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  type text not null check (type in ('poster','sticker')),
  created_at timestamptz not null default now(),
  unique (slug, type)
);
alter table public.categories enable row level security;

-- ============ PRODUCTS ============
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null default 0,
  product_type text not null check (product_type in ('poster','sticker')),
  category text not null default 'lifestyle',
  image_url text not null default '',
  images text[] not null default '{}',
  sizes jsonb not null default '[]',
  material text,
  is_featured boolean not null default false,
  is_bestseller boolean not null default false,
  stock integer not null default 100,
  rating numeric(2,1) not null default 5.0,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;

-- ============ ORDERS ============
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  city text not null,
  governorate text not null,
  notes text,
  subtotal numeric(10,2) not null default 0,
  shipping numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  payment_method text not null default 'cod' check (payment_method in ('cod','paymee','flouci','stripe')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid','refunded','failed')),
  status text not null default 'pending' check (status in ('pending','processing','shipped','delivered','cancelled')),
  created_at timestamptz not null default now()
);
alter table public.orders enable row level security;

-- ============ ORDER ITEMS ============
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  price numeric(10,2) not null default 0,
  quantity integer not null default 1,
  size text,
  image_url text
);
alter table public.order_items enable row level security;

-- ============ PAYMENTS ============
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'cod',
  amount numeric(10,2) not null default 0,
  status text not null default 'pending',
  transaction_ref text,
  created_at timestamptz not null default now()
);
alter table public.payments enable row level security;

-- ============ REVIEWS ============
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  comment text not null default '',
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;

-- ============ CUSTOM REQUESTS ============
create table if not exists public.custom_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  product_type text not null check (product_type in ('poster','sticker')),
  size text not null,
  frame_option text,
  image_url text,
  notes text,
  estimated_price numeric(10,2),
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.custom_requests enable row level security;

-- ============ INDEXES ============
create index if not exists idx_products_type on public.products(product_type);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_featured on public.products(is_featured);
create index if not exists idx_orders_user on public.orders(user_id);
create index if not exists idx_order_items_order on public.order_items(order_id);
create index if not exists idx_reviews_product on public.reviews(product_id);

-- ============ RLS POLICIES ============
-- Public catalog: readable by everyone
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select using (true);

drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read" on public.categories for select using (true);

drop policy if exists "reviews_public_read" on public.reviews;
create policy "reviews_public_read" on public.reviews for select using (true);

drop policy if exists "reviews_insert_any" on public.reviews;
create policy "reviews_insert_any" on public.reviews for insert with check (true);

-- Profiles: own row
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- Orders: guests and users can create; users can read their own
drop policy if exists "orders_insert_any" on public.orders;
create policy "orders_insert_any" on public.orders for insert with check (true);
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);

drop policy if exists "order_items_insert_any" on public.order_items;
create policy "order_items_insert_any" on public.order_items for insert with check (true);
drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);

drop policy if exists "payments_insert_any" on public.payments;
create policy "payments_insert_any" on public.payments for insert with check (true);

-- Custom requests: anyone can submit; users read own
drop policy if exists "custom_insert_any" on public.custom_requests;
create policy "custom_insert_any" on public.custom_requests for insert with check (true);
drop policy if exists "custom_select_own" on public.custom_requests;
create policy "custom_select_own" on public.custom_requests for select using (auth.uid() = user_id);

-- ============ AUTO PROFILE TRIGGER ============
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    coalesce(new.raw_user_meta_data ->> 'phone', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
`
