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

## 2. Current xile.us — needs confirmation

I couldn't load the live site from here, so please confirm a few things (or just say
"build fresh"):

- **Where it's hosted today** (the previous draft assumed GoDaddy/cPanel — unverified).
  Heritage signals suggest the xile.us/jpmk12 lineage was once an early-2000s
  **PostNuke** community (forums, tutorials, downloads). If any of that is still live
  and worth keeping (old posts, files), we migrate; otherwise we start clean.
- **The current content** — how many existing project posts/photos/files exist, so we
  know whether Phase 2 is "migrate" or "author from scratch."

This is the only real fork in the plan, and it only affects migration effort — not the
recommended build below.

---

## 3. Recommended stack — match the family

Because the family already runs **Next.js + Tailwind on Vercel**, xile.us should too.
This lets us **literally share the DEAD design tokens and theme switcher**, deploy on
push with zero FTP, and keep one mental model across all your sites.

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router)** | Matches the family; static-export-capable, great image handling, room for interactivity. |
| Styling | **Tailwind CSS** + a shared `dead-theme` token layer | Reuse `slate-950`/`emerald`, the `data-theme` switcher, and the ◆ mark from the existing sites verbatim. |
| Content | **MDX content collections** (`content-collections` or Velite) | Each project = one MDX file with typed frontmatter (title, date, tags, cover, gallery, downloads). Version-controlled, portable. |
| Images | `next/image` + a gallery/lightbox component | Auto-resize, lazy-load, responsive sizes — keeps photo-heavy pages fast. |
| Downloads | `/files` library + per-project download cards | Files in `public/files/` (or **Vercel Blob** for big STL/3MF), surfaced as labeled buttons with type + size. |
| Visual authoring (optional) | **Sveltia CMS** at `/admin` | Browser/phone editor that commits the same MDX + images to GitHub via OAuth — post without a terminal. Power-edit in MDX stays available. |
| Deploy | **Vercel (Git push → deploy)** | Auto preview deploys per PR, instant rollback, no FTP. If xile.us's domain must stay on current DNS, point it at Vercel. |
| Analytics | **Vercel Analytics** or Plausible/Umami | Privacy-friendly, lightweight. |

**Why not Astro/Hugo/GoDaddy-FTP (the prior draft):** those don't share anything with
your existing Next.js sites. Standardizing on Next.js means the theme, components, and
deploy flow are reused, not reinvented. (If you specifically want to keep the xile.us
domain on GoDaddy static hosting, Next.js can still `output: 'export'` to plain static
files — so this choice doesn't lock hosting either way.)

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
- Confirm §2: current hosting, and migrate-vs-build-fresh.
- Gather existing posts/photos/files to migrate (if any).
- Get (or extract) the shared **DEAD theme tokens, font, and `icon.svg`** from the
  existing Next.js sites so xile.us reuses them exactly.
- Confirm deploy target: **Vercel** (recommended) or static-export to current host.

### Phase 1 — Scaffold + design system + deploy
- Initialize **Next.js + Tailwind**; commit to this repo.
- Port the **DEAD token layer + theme switcher + ◆ mark**; build base components
  (header/nav, project card, badge, button) + a style tile.
- Wire **Vercel** with preview deploys (verify on a preview URL before touching the
  live domain).

### Phase 2 — Content model + first posts
- Define the `projects` MDX collection + typed frontmatter (schema in §4).
- Author/migrate **3–5 real projects** across categories to pressure-test the layout.
- Build the project detail page: write-up, metadata, status badge.

### Phase 3 — Galleries + downloads
- Responsive, optimized **photo gallery + lightbox** (`next/image`).
- **`/files`** downloads library + per-project download cards (label · type · size).
- **Tag filtering** on `/projects`.

### Phase 4 — Hybrid authoring (optional visual CMS)
- Wire **Sveltia CMS** at `/admin` with GitHub OAuth; configure post/image/download
  fields so you can publish from a laptop **or phone**. Document the "new post" flow.

### Phase 5 — Polish
- Glitch/scanline interactions and hover states (reduced-motion safe).
- RSS feed, SEO/Open Graph cards, sitemap, favicon set, 404 page.
- Performance pass (Lighthouse) + image budgets.

### Phase 6 — Launch / cutover
- Point the **xile.us domain** at the new deploy; verify links + downloads; keep a
  backup of the old site.
- Post-launch: analytics, broken-link sweep, mobile pass.

### Later / nice-to-have
- Client-side search (**Pagefind**) once there are enough posts.
- **STL/3MF previews** for 3D files; printable BOM view.
- "Project series" / build-log threading for multi-part builds.
- Shared **component package** across the family so all DEAD sites pull one theme.

---

## 7. Open decisions (what I need to start building)

1. **Hosting today + migrate vs. build fresh** (§2).
2. **Stack confirmation:** Next.js + Tailwind on Vercel to match the family (my
   recommendation), or a constraint that forces static-export to the current host?
3. **Authoring preference:** Git/MDX only, or add the **Sveltia `/admin`** visual editor
   for phone posting?
4. When we reach Phase 1: access to (or copies of) the family's **theme tokens, font,
   and `icon.svg`** so xile.us reuses the real DEAD assets instead of reapproximating.

> Suggested first move: confirm #1–#3, and I'll scaffold Phase 1 (Next.js + the ported
> DEAD theme + a working Vercel preview) so you can see xile.us live in the family look.
