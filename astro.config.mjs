// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Harden + optimize rendered Markdown: external links get rel=noopener
// (anti-tabnabbing), and content images lazy-load. Applies to migrated and
// future posts alike — no per-file edits needed.
function rehypeLinksAndImages() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element') {
        const p = (node.properties ||= {});
        if (node.tagName === 'a') {
          const href = String(p.href || '');
          if (/^https?:\/\//i.test(href) || p.target === '_blank') {
            p.target = '_blank';
            p.rel = 'noopener noreferrer';
          }
        } else if (node.tagName === 'img') {
          if (p.loading == null) p.loading = 'lazy';
          if (p.decoding == null) p.decoding = 'async';
        }
      }
      (node.children || []).forEach(visit);
    };
    visit(tree);
  };
}

// `base` lets the same build serve from the live root (`/`) OR a GoDaddy
// preview subfolder. The deploy workflow sets SITE_BASE=/preview/ for staging.
export default defineConfig({
  site: 'https://www.xile.us',
  base: process.env.SITE_BASE || '/',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeLinksAndImages],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
