/** Resolve a path under `public/` (works with Vite `base: './'` and GitHub Pages). */
export function publicAsset(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\//, '');
  const base = import.meta.env.BASE_URL ?? '/';
  const joined = `${base}${clean}`;
  try {
    return encodeURI(decodeURI(joined));
  } catch {
    return encodeURI(joined);
  }
}

/** Link to another app hosted under `public/` (e.g. mta-transit). */
export function publicHref(path: string): string {
  return publicAsset(path.endsWith('/') ? path : `${path}/`);
}
