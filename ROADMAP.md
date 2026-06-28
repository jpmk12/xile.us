# xile.us — Modernization Roadmap

A plan to rebuild xile.us as a fast, modern **living portfolio** for makerspace
projects (code, robotics, 3D printing, Halloween) that's easy to post to, shows
off photo galleries, and offers clean file downloads — wrapped in an
**industrial-maker / glitch** aesthetic carried over from the "DEAD" designs.

---

## 0. Current situation (read first)

- **The GitHub repo is empty.** `jpmk12/xile.us` has no commits or branches. The
  code currently powering the live site is not in this repo. Before/while we
  build, we'll either (a) push the existing site files here so they're version
  controlled, or (b) build fresh and retire the old files.
- **Hosting stays on GoDaddy.** This is the key constraint. GoDaddy does *not*
  auto-deploy from GitHub, so the new build needs a pipeline:
  **GitHub → build static site → upload to GoDaddy over (S)FTP.** This works
  cleanly *if* the GoDaddy plan is **cPanel "Web Hosting" (Linux)**, which
  serves static files and supports FTP. It does **not** work the same way on
  **Managed WordPress** or the **Website Builder** plans.
  → **Action: confirm which GoDaddy product the site runs on.** Everything below
  assumes cPanel Web Hosting.

---

## 1. Recommended stack

| Concern | Choice | Why |
|---|---|---|
| Site framework | **Astro** | Built for content + media portfolios. Ships zero JS by default (fast), first-class Markdown/MDX, built-in image optimization, outputs plain static files that drop straight into GoDaddy's `public_html`. |
| Content | **Markdown/MDX content collections** | Blog posts and projects as Markdown files with typed frontmatter (title, date, tags, cover, downloads). Version-controlled, portable, future-proof. |
| Visual editing (the "hybrid" half) | **Sveltia CMS** (modern Decap/Netlify-CMS fork) | A browser admin at `/admin` that reads/writes the same Markdown files and commits to GitHub via OAuth. Lets you post from a laptop or phone without opening a terminal — while power-editing in Markdown stays available. |
| Images | Astro `<Image>` + a gallery component | Auto-resizes/compresses, lazy-loads, generates responsive sizes. Keeps download pages snappy even with lots of photos. |
| Downloads | A `/files` library + per-project download cards | Docs/instructions (PDF, wiring diagrams, BOMs) stored in repo under `public/files/`, surfaced as labeled download buttons with size + type. |
| Deploy | **GitHub Actions → SFTP to GoDaddy** | On every push to `main`: build Astro, then upload `dist/` to `public_html` via FTP-Deploy-Action using GoDaddy FTP creds stored as repo secrets. |
| Styling | Tailwind CSS + a small custom theme layer | Fast to build the glitch/industrial system; purges unused CSS for tiny payloads. |

**Why Astro over the alternatives:** Hugo is faster to build but its templating
is clunkier for rich project pages; Next.js is overkill (and its best features
assume a Node server GoDaddy shared hosting won't run). Astro hits the sweet
spot: static output, great content ergonomics, and room to add interactivity
(the glitch effects) only where you want it.

---

## 2. Information architecture (site map)

```
/                     Home — latest projects feed + hero
/projects             Gallery grid, filterable by tag (code · robotics · 3D · Halloween)
/projects/<slug>      Project / blog detail: write-up, photo gallery, downloads, BOM
/files                Downloads library — all docs/files in one searchable place
/about                Who you are + the makerspace
/tags/<tag>           Everything under a tag
/rss.xml              Feed so people can subscribe
/admin                Sveltia CMS (visual editor)
```

**One content model does double duty.** A "project" *is* a blog post: it has a
date and a write-up (blog), plus photos, tags, and downloads (portfolio). No
separate "blog vs projects" split to maintain.

Project frontmatter (the fields you fill in per post):
```yaml
title: "Animatronic Skull v2"
date: 2026-06-20
tags: [robotics, halloween, 3d-printing]
cover: ./cover.jpg
gallery: [./build1.jpg, ./build2.jpg]
downloads:
  - { label: "Wiring diagram (PDF)", file: "/files/skull-v2-wiring.pdf" }
  - { label: "Bill of materials",     file: "/files/skull-v2-bom.pdf" }
status: complete   # or: in-progress
```

---

## 3. Design direction — "Industrial maker / glitch"

Carry the DEAD energy forward without it becoming a costume. The throughline:
**a workshop terminal that's slightly haunted.**

- **Palette:** near-black base (`#0a0a0b`), graphite panels, bone/off-white
  text, one hot accent (toxic green `#39ff14` *or* warning amber) plus a danger
  red for hover/alerts. Restraint is what makes it feel designed, not Halloween-y.
- **Type:** a condensed industrial display face for headings (stencil/grotesque),
  a clean monospace for metadata/labels (gives the "terminal/maker" read), a
  highly legible sans for body copy.
- **Motifs:** thin hairline grids/blueprint lines, exposed-circuit traces,
  corner registration marks, "// status" labels, tape/label-maker tags for
  categories.
- **Glitch, used sparingly:** RGB-split text on hover for titles, a subtle
  scanline/CRT overlay toggle, occasional flicker on the logo. Effects are
  CSS-driven, behind `prefers-reduced-motion`, and never block reading.
- **Accessibility guardrail:** dark theme with AA-contrast text, motion respects
  reduced-motion, glitch never applied to body text. Spooky ≠ unreadable.

I'll produce a one-page style tile early (Phase 1) so we lock the look before
building pages on top of it.

---

## 4. Phased roadmap

### Phase 0 — Foundations (decisions + assets)
- Confirm GoDaddy plan type (cPanel vs Managed WP vs Website Builder).
- Collect GoDaddy FTP/SFTP host, user, password, and target directory.
- Gather existing content: current posts, photos, any files, the old "DEAD"
  design assets (screenshots, fonts, colors, logo).
- Decide: migrate existing site files into the repo, or start clean.

### Phase 1 — Scaffold + design system + deploy pipeline
- Initialize Astro + Tailwind project; commit to this repo.
- Build the industrial/glitch theme (tokens, fonts, base components) + a style tile.
- Stand up the GitHub Actions → SFTP-to-GoDaddy deploy on a staging path first
  (e.g. `xile.us/preview`) so we can verify before touching the live site.

### Phase 2 — Content model + first posts
- Define the `projects` content collection + frontmatter schema.
- Migrate (or author) 3–5 real projects across your categories to pressure-test
  the layout with actual content.
- Project detail page: write-up, metadata, status badge.

### Phase 3 — Galleries + downloads
- Responsive, optimized photo gallery with lightbox.
- `/files` downloads library + per-project download cards (label, type, size).
- Tag filtering on `/projects`.

### Phase 4 — Hybrid authoring (visual CMS)
- Wire up Sveltia CMS at `/admin` with GitHub OAuth.
- Configure post + image + download fields so you can publish from a browser or
  phone. Document the "new post" flow.

### Phase 5 — Polish
- Glitch interactions, scanline toggle, hover states.
- RSS feed, SEO/meta/Open Graph cards, sitemap, favicon set.
- Performance pass (Lighthouse), image budgets, 404 page.

### Phase 6 — Launch / cutover
- Point the live GoDaddy `public_html` at the new build (swap from the preview
  path), verify downloads and links, keep a backup of the old site.
- Post-launch checklist: analytics (privacy-friendly, e.g. Plausible/Umami),
  broken-link sweep, mobile pass.

### Later / nice-to-have
- Client-side search (Pagefind) once there are enough posts.
- "Project series" / build-log threading for multi-part projects.
- Newsletter capture, a printable BOM view, STL/3MF previews if you later add
  3D files.

---

## 5. What I need from you to start building

1. **GoDaddy plan type** (cPanel Web Hosting / Managed WordPress / Website Builder).
2. **Whether to push your existing site files** into this repo, or build fresh.
3. **DEAD design assets** — screenshots, fonts, logo, exact colors — so the new
   theme echoes the old one instead of guessing.
4. **GoDaddy FTP credentials** when we reach Phase 1 (added as GitHub secrets,
   never committed).

> Suggested first move: confirm #1 and #2, and I'll scaffold Phase 1 (Astro +
> theme + a working deploy to a GoDaddy preview path) so you can see it live.
