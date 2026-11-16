-- Wayamba Food Products: spice catalog table for Supabase.
-- Run this in Supabase → SQL Editor, then run seed.sql to load the starter catalog.

create table if not exists public.products (
  id            bigint generated always as identity primary key,
  slug          text unique not null,          -- used in the page URL, e.g. ceylon-cinnamon
  name          text not null,
  local_name    text,                          -- e.g. Kurundu
  category      text not null default 'Spices',
  shape         text default 'seed',           -- illustration when no photo: quill, seed, clove, pod, nut, blade, finger, chilli, powder, grain, leaf
  palette       text[],                        -- two colours for the illustration, e.g. {"#3b2216","#c47a3d"}
  featured      boolean default false,         -- show on home page
  tagline       text,
  description   text,
  origin        text,
  forms         text[],                        -- e.g. {"Whole","Ground"}
  variants      jsonb,                         -- e.g. [{"name":"Alba","note":"Finest grade"}]
  pack_sizes    text[],
  moq           text,
  shelf_life    text,
  certifications text[],
  uses          text[],
  image_url     text,                          -- public URL, e.g. from Supabase Storage
  video_url     text,                          -- .mp4/.webm URL or YouTube link
  sort_order    int default 100,
  published     boolean default true,
  updated_at    timestamptz default now()
);

-- Anyone may read published products (the website uses the public anon key).
alter table public.products enable row level security;
drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products"
  on public.products for select
  using (published = true);

-- Storage bucket for product photos and videos (public read).
insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', true)
on conflict (id) do nothing;
