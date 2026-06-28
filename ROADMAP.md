# xile.us — Modernization Roadmap

A plan to rebuild **xile.us** as a fast, modern **living portfolio** for makerspace
projects (code · robotics · 3D printing · Halloween) that's easy to post to, shows
photo galleries well, and offers clean file downloads — wrapped in the **"DEAD"
design system** already running across the family of sites.

> **This roadmap is grounded in the live family sites**, not guesses. I read the
> actual shipped source of `justinpoole.com` and `jpmk12.net` to extract the real
> stack and design tokens (see §1). I could **not** reach `xile.us` or
> `deadplanning.com` directly — this environment's network policy denies them at
> the proxy, and the Wayback Machine too — so the current-xile.us specifics in §2
> are marked as **needs confirmation**.

---

## 1. What the live "DEAD" sites actually are (evidence)

`justinpoole.com` and `jpmk12.net` currently both serve the **same modern app** — a
gated "DEAD's Dashboard." Reading their shipped HTML/CSS gives us the real system:

- **Framework:** **Next.js** (App Router, React Server Components) + **Tailwind CSS**,
  custom font via `next/font` (woff2). Almost certainly deployed on **Vercel**.
- **Base palette:** `bg-slate-950` (`#020617`) background, `text-slate-100` body,
  `text-slate-400` for muted/secondary text.
- **Accent:** **emerald** — `emerald-500` solid (buttons), `emerald-400` (icons/text),
  with `emerald-500/10` fills behind `emerald-500/30` borders for chips/badges.
- **Type treatment:** headings are `font-bold tracking-widest uppercase`; buttons are
  `text-xs font-bold uppercase tracking-wider`, `rounded-md`. Reads as a clean
  **ops/terminal** look.
- **Brand mark:** a **`◆` diamond** glyph inside a `w-9 h-9 rounded-md` emerald-tinted
  chip (`bg-emerald-500/10 border border-emerald-500/30`). There's an `icon.svg`.
- **Theming:** an `html[data-theme]` system with **swappable themes** —
  `nightwatch` (default), plus `amber`, `arctic`, `mission` — persisted to
  `localStorage` under `app-theme`. This is the reusable backbone we want.
- **Mood:** sleek dark "intelligence/ops dashboard," **not** Halloween-gothic. Spooky
  is optional flavor; the core is restrained, high-contrast, monospace-adjacent.

**Takeaway:** "incorporate DEAD design elements" doesn't mean inventing a haunted
theme — it means **reusing this exact token set** (slate-950 + emerald, uppercase
tracking, the ◆ mark, the multi-theme switcher) so xile.us visibly joins the family.

---

## 2. Decisions locked

- **Hosting: GoDaddy cPanel (Linux "Web Hosting").** Serves **static files** over
  HTTP and supports **(S)FTP** — no Node server, so the site must build to plain
  static HTML/CSS/JS and be uploaded to `public_html`. Deploy pipeline:
  **GitHub → build → SFTP to GoDaddy** (see §3).
- **Content: migrate the old content into the new build.** We pull the existing
  xile.us posts/photos/files forward into the new content model (MDX + images +
  `/files`) rather than starting empty. (Heritage note: the xile.us/jpmk12 lineage
  traces to an early-2000s **PostNuke** community — forums/tutorials/downloads. We
  migrate the portfolio/blog/file content; legacy forum software is not carried over.)

- **Authoring: both — Git/MDX *and* the Sveltia `/admin` visual editor.** They aren't
  alternatives: every post is a plain `.mdx` file, and Sveltia is a browser/phone UI
  that writes those same files. So you can hand-edit MDX for power *or* snap-and-publish
  from `/admin`. Start with **PAT auth** (site stays 100% on GoDaddy); MDX works from
  Phase 2, the `/admin` layer lands in Phase 4.

### Migration plan (old → new)
1. **Inventory** the current site: list every post, photo set, and downloadable file
   (I'll need an export, FTP access, or a crawl — the live site is unreachable from my
   sandbox, so you'll provide the source).
2. **Convert** each post to an MDX file with the §4 frontmatter; salvage dates and
   categories so nothing loses its history.
3. **Re-home assets:** images into per-project folders (optimized at build), downloads
   into `public/files/` with labels + sizes.
4. **Redirects:** map old URLs to new slugs (a `.htaccess` 301 table on cPanel) so old
   links and search results keep working.
5. **Verify** post-by-post against the old site before cutover.

---

## 3. Recommended stack — static build for GoDaddy cPanel

GoDaddy cPanel serves **static files only** (no Node server), so the site must build to
plain HTML/CSS/JS and upload via SFTP. The **DEAD look is just Tailwind/CSS tokens + the
`◆` mark + the `data-theme` switcher**, so it ports to any framework — we keep the family
*look* without needing the family *runtime*.

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro** (primary) — or **Next.js `output: 'export'`** | For a static FTP target, Astro is purpose-built: zero-JS by default, first-class Markdown/MDX, build-time image optimization, drops straight into `public_html`. Next.js static-export is the alternative if you want maximum code parity with the family. |
| Styling | **Tailwind CSS** + a shared `dead-theme` token layer | Reuse `slate-950`/`emerald`, the `data-theme` switcher, and the ◆ mark from the existing sites verbatim (these are framework-agnostic CSS). |
| Content | **MDX content collections** | Each project = one MDX file with typed frontmatter (title, date, tags, cover, gallery, downloads). Version-controlled, portable. |
| Images | Build-time optimization via **`sharp`** + a gallery/lightbox | No server means no on-demand optimization — responsive sizes are generated **at build** and shipped static. Keeps photo-heavy pages fast on GoDaddy. |
| Downloads | `/files` library + per-project download cards | Files in `public/files/`, uploaded with the build, surfaced as labeled buttons with type + size. (Very large STL/3MF can live in GitHub Releases and link out.) |
| Visual authoring (optional) | **Sveltia CMS** at `/admin` | Browser/phone editor that commits the same MDX + images to GitHub — post without a terminal. Works on static hosting because writes go to GitHub, not GoDaddy. See §7. |
| Deploy | **GitHub Actions → SFTP to GoDaddy `public_html`** | On push to `main`: build the static site, then upload `dist/` via an FTP-deploy action using GoDaddy SFTP creds stored as **repo secrets** (never committed). |
| Analytics | **Plausible** or **Umami** | Privacy-friendly, lightweight, static-host-friendly (a single script tag). |

**Why Astro here (vs. Next.js):** the family runs Next.js for its *server* features (RSC,
auth, dashboards) — none of which run on GoDaddy static hosting. On a static FTP target
those benefits disappear, while Astro gives a cleaner static + image-optimization story.
The only thing we actually need to carry from the family is the **visual** system, and
that's pure CSS/Tailwind — so it ports 1:1. (Pick Next.js static-export instead only if
sharing the literal component code with the family matters more than static ergonomics.)

---

## 4. Information architecture (site map)

```
/                     Home — hero + latest projects feed (+ theme switcher)
/projects             Gallery grid, filterable by tag (code · robotics · 3d · halloween)
/projects/<slug>      Project = blog post: write-up, photo gallery, downloads, status
/files                Downloads library — every file in one searchable place
/about                Who you are + the makerspace
/tags/<tag>           Everything under a tag
/rss.xml              Subscribe feed
/admin                Sveltia CMS (optional visual editor)
```

**One content model does double duty.** A "project" *is* a blog post — it has a date and
a write-up (blog) plus photos, tags, and downloads (portfolio). No separate blog-vs-
projects split to maintain.

Project frontmatter (the fields you fill per post):
```yaml
title: "Animatronic Skull v2"
date: 2026-06-20
tags: [robotics, halloween, 3d-printing]
status: complete          # or: in-progress
cover: ./cover.jpg
gallery: [./build1.jpg, ./build2.jpg]
downloads:
  - { label: "Wiring diagram (PDF)", file: "/files/skull-v2-wiring.pdf" }
  - { label: "STL — jaw assembly",    file: "/files/skull-v2-jaw.stl" }
```

---

## 5. Design direction — extend "DEAD," don't reinvent it

Lift the system from §1 directly:

- **Tokens:** `--bg: #020617` (slate-950), graphite panels (`slate-900/800`), `slate-100`
  text, `slate-400` muted, **emerald** accent (`emerald-500/400`, `/10` fills + `/30`
  borders). Keep the **theme switcher** (`nightwatch` default + `amber`/`arctic`/
  `mission`) so xile.us inherits the family's swappable looks.
- **Type:** the family's uppercase, `tracking-widest`, bold display treatment for
  headings and category labels; a clean sans for body; monospace for metadata
  (date · tags · file sizes) to reinforce the maker/terminal read.
- **Brand mark:** reuse the **◆ chip** as the xile.us logo lockup so the family
  connection is instant.
- **Motifs (light touch):** hairline/blueprint grid lines, corner registration marks,
  `// status` labels, status badges (`complete` / `in-progress`), label-maker tags for
  categories. These echo the ops-dashboard vibe without becoming a costume.
- **Spooky as seasoning:** a subtle scanline/CRT toggle or RGB-split-on-hover for
  titles — **CSS-only, behind `prefers-reduced-motion`, never on body text.** The
  `mission`/`amber` themes can lean Halloween for October.
- **Accessibility guardrail:** AA contrast on dark, motion respects reduced-motion,
  effects never block reading.

I'll produce a one-page **style tile** in Phase 1 to lock the look before building pages.

---

## 6. Phased roadmap

### Phase 0 — Decisions + assets
- ~~Confirm hosting / migrate-vs-fresh~~ → **done: GoDaddy cPanel + migrate (§2).**
- Collect **GoDaddy SFTP** host, user, password, and `public_html` path → store as
  GitHub repo secrets.
- Run the **content inventory** (§2 migration plan, step 1).
- Get (or extract) the shared **DEAD theme tokens, font, and `icon.svg`** from the
  existing sites so xile.us reuses them exactly.
- Decide authoring workflow (§7, choice 3).

> **Live preview:** the site is deployed to GoDaddy and viewable at
> **https://www.xile.us/preview/** (auto-redeploys on push to the dev branch via the
> `deploy` workflow + your FTP secrets).

### Phase 1 — Scaffold + design system + deploy
- Initialize **Astro + Tailwind** (or Next.js static-export); commit to this repo.
- Port the **DEAD token layer + theme switcher + ◆ mark**; build base components
  (header/nav, project card, badge, button) + a style tile.
- Stand up **GitHub Actions → SFTP** to a **staging subfolder** (e.g.
  `public_html/preview`) so we verify on the real host before touching the live root.

### Phase 2 — Content model + first posts  ✅ (text done; media pending)
- ✅ Defined the `projects` content collection + typed frontmatter (`src/content.config.ts`).
- ✅ Migrated the real xile.us WordPress content (db `xilehost_wp2`): **10 posts +
  1 draft, 2013–2017**, converted to Markdown in `src/content/projects/` with code
  blocks, tags, dates, and redirects. See **MIGRATION.md**.
- ✅ Built the project detail page (`/projects/[slug]`) with prose styles + status badge.
- ✅ Pulled the legacy media (148 files incl. all WP thumbnail sizes) from GoDaddy via
  the `fetch-legacy-uploads` CI workflow → `public/legacy-uploads/`; post photos and
  file downloads now render.

### Phase 3 — Galleries + downloads  ✅
- ✅ **Photo lightbox** (`Lightbox.astro`): click any post image → fullscreen viewer
  with prev/next, counter, keyboard nav; reduced-motion safe, zero deps.
- ✅ **`/files`** library — aggregates `downloads` frontmatter across all projects with
  build-time file sizes, a search box, and links back to the source project; plus a
  per-project **// files** section on detail pages.
- ✅ **Interactive tag filtering** on `/projects` (client-side, no reload).

### Phase 4 — Hybrid authoring (optional visual CMS)
- Wire **Sveltia CMS** at `/admin` with GitHub OAuth; configure post/image/download
  fields so you can publish from a laptop **or phone**. Document the "new post" flow.

### Phase 4.5 — Client-side search  ✅
- ✅ **Pagefind** search at `/search` (nav-linked), indexed post-build (`pagefind
  --site dist`), themed to DEAD; posts indexed via `data-pagefind-body`.

### Phase 5 — Polish  ✅ (formal Lighthouse audit still optional)
- ✅ **RSS** (`/rss.xml`), **sitemap** (`@astrojs/sitemap`), **favicon set** (svg +
  16/32 png + apple-touch), **Open Graph / Twitter cards** (default `og-default.png`;
  per-post uses the cover) + canonical URLs.
- ✅ **404 page** ("Signal lost") in the DEAD style; glitch hover + reduced-motion
  guards carried through from Phase 1.
- ◻ Optional later: formal Lighthouse pass / scanline toggle (already static +
  near-zero-JS, Inter subset, lazy images).

### Phase 6 — Launch / cutover
- Back up the current `public_html`, then **swap the live root** from the preview
  subfolder to the new build; apply the **`.htaccess` 301 redirects** (§2) for old URLs.
- Verify links + downloads against the migration checklist; keep the old-site backup.
- Post-launch: analytics, broken-link sweep, mobile pass.

### Later / nice-to-have
- Client-side search (**Pagefind**) once there are enough posts.
- **STL/3MF previews** for 3D files; printable BOM view.
- "Project series" / build-log threading for multi-part builds.
- Shared **component package** across the family so all DEAD sites pull one theme.

---

## 7. Open decisions (what I need to start building)

1. ~~Hosting + migrate vs. fresh~~ → **decided: GoDaddy cPanel + migrate (§2).**
2. ~~Stack~~ → **decided by hosting: static build (Astro recommended) → SFTP (§3).**
3. ~~Authoring workflow~~ → **decided: both — Git/MDX *and* Sveltia `/admin`** (the CMS
   writes the same MDX files, so it's additive, not a fork). Start with **PAT auth**.
   Remaining auth upgrade path, when wanted: a tiny free **OAuth broker** on
   Cloudflare/Netlify for one-click "Sign in with GitHub," or Sveltia's hosted GitHub App.
4. **Inputs for build time:** GoDaddy **SFTP credentials** (→ repo secrets), the
   **content export/FTP access** to migrate from, and the family's **theme tokens,
   font, and `icon.svg`**.

> Suggested first move: hand me SFTP creds + a content export, and I'll scaffold Phase 1
> (Astro + the ported DEAD theme + a working SFTP preview deploy) so you can see xile.us
> live on GoDaddy in the family look.
