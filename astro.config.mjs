// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// `base` lets the same build serve from the live root (`/`) OR a GoDaddy
// preview subfolder. The deploy workflow sets SITE_BASE=/preview/ for staging.
export default defineConfig({
  site: 'https://www.xile.us',
  base: process.env.SITE_BASE || '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
