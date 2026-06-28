# xile.us

A living portfolio of makerspace projects — code, robotics, 3D printing, and
Halloween — built as a fast static site in the **DEAD** design language and
hosted on **GoDaddy cPanel**. See [`ROADMAP.md`](./ROADMAP.md) for the full plan.

This is **Phase 1**: the Astro scaffold, the ported DEAD theme + design tokens,
base components, a style tile, and the GoDaddy deploy pipeline.

## Stack

- **Astro** (static output) + **Tailwind CSS v4**
- DEAD theme tokens as CSS variables with a `data-theme` switcher
  (`nightwatch` · `amber` · `arctic` · `mission`)
- Deploy: **GitHub Actions → FTPS → GoDaddy `public_html`**

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview  # serve the built site
```

## Project layout

```
src/
  components/   Header, Footer, Mark (◆), ThemeSwitcher, Button, Badge, ProjectCard
  layouts/      BaseLayout.astro (head, theme init, header/footer)
  pages/        index, projects/, files, about, style-tile
  styles/       global.css (DEAD tokens + component classes)
  data/         projects.ts (sample content — replaced by MDX in Phase 2)
  lib/          link.ts (base-path aware internal links)
public/         icon.svg (the ◆ mark) and static assets
.github/        deploy workflow
```

Visit **`/style-tile`** to see the palette, type, and components, and use the
swatches in the header to swap themes live.

## Deploying to GoDaddy

The workflow in `.github/workflows/deploy.yml` builds the site and uploads it to
a **preview subfolder** (`public_html/preview/`) on every push to `main`.

1. In **Settings → Secrets and variables → Actions**, add:
   `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (see `ROADMAP.md` §7 / the
   credential instructions).
2. Push to `main` (or run the workflow manually via **Actions → Run workflow**).
3. View it at the preview path. For a clean URL, map a `preview.xile.us`
   subdomain in cPanel to `public_html/preview`.

To go live later, point `server-dir` at `public_html/` and drop the
`SITE_BASE` env so the build targets the root.

> Note: this branch is `claude/clever-shannon-5yw1f7`. The deploy workflow runs
> on `main`, so it won't fire until this is merged (or triggered manually).
