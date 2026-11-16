import { defineConfig } from 'astro/config';

// Hosted on GitHub Pages at https://vcreatework.github.io/wayamba-food-products/
// When you move to a custom domain (or Cloudflare Pages), set SITE_URL to the new
// address and BASE_PATH to "/" in the build environment.
export default defineConfig({
  site: process.env.SITE_URL || 'https://vcreatework.github.io',
  base: process.env.BASE_PATH || '/wayamba-food-products',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  image: {
    remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }],
  },
});
