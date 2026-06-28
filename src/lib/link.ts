// Prefix internal paths with the configured base (`/` in production, or
// `/preview/` for the GoDaddy staging subfolder) so links + assets resolve
// correctly in both. Use for every internal href and public asset.
const BASE = import.meta.env.BASE_URL || '/';

export function link(path: string): string {
  const base = BASE.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
}
