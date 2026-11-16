import localProducts from '../data/products.json';
import type { Product } from './types';

/**
 * Loads the spice catalog at build time.
 * If PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are set, products come from
 * the Supabase "products" table. Otherwise (or if Supabase fails) the local
 * src/data/products.json file is used, so the site always builds.
 */
let cache: Product[] | null = null;

const arr = (v: unknown): string[] | undefined =>
  Array.isArray(v) ? v.filter(Boolean).map(String) : undefined;

function fromRow(r: Record<string, any>): Product {
  return {
    slug: r.slug,
    name: r.name,
    localName: r.local_name ?? undefined,
    category: r.category ?? 'Spices',
    shape: r.shape ?? 'seed',
    palette: Array.isArray(r.palette) && r.palette.length === 2 ? r.palette : undefined,
    featured: !!r.featured,
    tagline: r.tagline ?? undefined,
    description: r.description ?? undefined,
    origin: r.origin ?? undefined,
    forms: arr(r.forms),
    variants: Array.isArray(r.variants) ? r.variants : undefined,
    packSizes: arr(r.pack_sizes),
    moq: r.moq ?? undefined,
    shelfLife: r.shelf_life ?? undefined,
    certifications: arr(r.certifications),
    uses: arr(r.uses),
    image: r.image_url ?? undefined,
    video: r.video_url ?? undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (cache) return cache;
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const db = createClient(url, key);
      const { data, error } = await db
        .from('products')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      if (data && data.length) {
        cache = data.map(fromRow);
        console.log(`[catalog] Loaded ${cache.length} products from Supabase`);
        return cache;
      }
      console.warn('[catalog] Supabase returned no products, using local JSON');
    } catch (e) {
      console.warn('[catalog] Supabase failed, using local JSON:', (e as Error).message);
    }
  }
  cache = localProducts as Product[];
  return cache;
}

export function categoriesOf(products: Product[]) {
  return [...new Set(products.map((p) => p.category))];
}
export function formsOf(products: Product[]) {
  return [...new Set(products.flatMap((p) => p.forms ?? []))];
}
