# Wayamba Food Products – wholesale spice showcase

Live site: https://vcreatework.github.io/wayamba-food-products/

A fast, animated showcase for Wayamba Food Products' wholesale spices. Buyers browse
spices, pick a grade and pack size, and tap **Inquire on WhatsApp**, which opens WhatsApp
with a ready-written message including the product link.

Built with [Astro](https://astro.build) (static site), [GSAP](https://gsap.com) for
animations, and optional [Supabase](https://supabase.com) for the catalog. Hosted free on
GitHub Pages and rebuilt automatically by GitHub Actions on every push.

---

## Quick edits

### Change the WhatsApp number
Open `src/config.ts` and change:

```ts
export const WHATSAPP_NUMBER = '94700000000';
```

Use the international format with digits only: `94` + the number without its leading 0.
For 077 614 4427 that is `94776144427`. You can edit this file directly on GitHub
(pencil icon) and the site redeploys in about two minutes.

Business name, address, phone, email and opening hours are in the same file.

### Edit products (simple way, no database)
All products live in `src/data/products.json`. Each spice looks like this. Only `slug`,
`name` and `category` are required; leave anything else out and that section is hidden.

```json
{
  "slug": "ceylon-cinnamon",          // page address: /spices/ceylon-cinnamon/
  "name": "Ceylon Cinnamon",
  "localName": "Kurundu",
  "category": "Bark & Quills",         // used for the filter buttons
  "featured": true,                    // show on the home page
  "tagline": "One-line summary",
  "description": "Longer paragraph",
  "origin": "Galle and Matara",
  "forms": ["Whole", "Ground"],
  "variants": [{ "name": "Alba", "note": "Finest grade" }],
  "packSizes": ["1 kg", "25 kg carton"],
  "moq": "5 kg",
  "shelfLife": "24 months",
  "certifications": ["SLS"],
  "uses": ["Bakeries"],
  "shape": "quill",                    // illustration used until a photo is added
  "palette": ["#3b2216", "#c47a3d"],   // illustration colours (dark, light)
  "image": "",                         // optional photo URL
  "video": ""                          // optional .mp4/.webm URL or YouTube link
}
```

### Add product photos
Put a photo in `src/assets/products/` named after the slug, e.g.
`src/assets/products/ceylon-cinnamon.jpg`. It is resized and converted to WebP
automatically and replaces the illustration. Landscape photos around 2000px wide work best.

### Replace the home page video
Replace `public/media/hero-placeholder.mp4` and `.webm` (and the `hero-poster.webp` still)
with your own short loop. Keep it under 10 seconds, muted, 1280px wide, and under ~3 MB.
Converting with ffmpeg:

```bash
ffmpeg -i input.mov -t 8 -vf scale=1280:-2 -an -c:v libx264 -crf 28 -movflags +faststart hero-placeholder.mp4
ffmpeg -i hero-placeholder.mp4 -c:v libvpx-vp9 -crf 38 -b:v 0 -an hero-placeholder.webm
```

---

## Using Supabase for the catalog (optional)

With Supabase you can edit products in a spreadsheet-like table instead of a JSON file.

1. Create a free project at supabase.com.
2. In **SQL Editor**, run `supabase/schema.sql`, then `supabase/seed.sql` (loads the starter range).
3. In **Project Settings → API**, copy the Project URL and the `anon` public key.
4. On GitHub: **Settings → Secrets and variables → Actions → New repository secret**, add
   `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
5. Run the workflow once (**Actions → Build and deploy → Run workflow**).

From then on the site reads products from Supabase. It rebuilds every morning, or straight
away when you press **Run workflow**. Upload photos to the `product-media` storage bucket
and paste their public URL in `image_url`. If Supabase is ever unreachable, the build falls
back to `src/data/products.json`, so the site never breaks.

---

## Custom domain later
Add the domain under **Settings → Pages → Custom domain**, then under
**Settings → Secrets and variables → Actions → Variables** set `SITE_URL` to
`https://yourdomain.lk` and `BASE_PATH` to `/`.

## Run locally
```bash
npm install
npm run dev      # http://localhost:4321/wayamba-food-products/
npm run build    # output in dist/
```
