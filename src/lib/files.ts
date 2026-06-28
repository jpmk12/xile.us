import { statSync } from 'node:fs';
import path from 'node:path';

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// Resolve a public file's extension + size at build time (static host has no
// runtime). Returns empty size if the binary isn't present yet.
export function fileMeta(file: string): { ext: string; size: string } {
  const ext = (file.split('.').pop() || '').split('?')[0].toUpperCase();
  let size = '';
  try {
    size = humanSize(statSync(path.join(process.cwd(), 'public', file)).size);
  } catch {
    /* binary not present — leave size blank */
  }
  return { ext, size };
}
