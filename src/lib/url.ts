// Prefix internal links with the site's base path (needed on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path: string) => (path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`);
export const abs = (path: string, site: URL | undefined) => new URL(u(path), site ?? 'https://vcreatework.github.io').toString();
