# Content migration — legacy xile.us → new build

## Source databases

Three WordPress SQL dumps were provided. They are **three different sites** on
the same GoDaddy account, not three versions of xile.us:

| Dump | Database | Site | Status |
|---|---|---|---|
| wp1 | `xilehost_wp1` | **sickfun.org** ("Sick Fun") | not migrated (different site) |
| **wp2** | **`xilehost_wp2`** | **xile.us** ("Xile Development — A journey through technology") | **migrated** |
| wp3 | `xilehost_wp3` | runwithreason.com ("Run With Reason") | not migrated (different site) |

So "which is newest" didn't apply — only **wp2** is xile.us.

## What was migrated (from wp2)

- **10 published posts** + **1 draft**, spanning **2013-07-06 → 2017-02-19**.
- Converted to Markdown in `src/content/projects/` with frontmatter (title, date,
  tags from WP categories+tags, summary, cover, legacyUrl). The draft is marked
  `draft: true` and hidden from listings.
- WordPress `<blockquote><div>…</div></blockquote>` code was rebuilt as fenced
  code blocks; image/link URLs rewritten from `…/wp-content/uploads/…` to
  `/legacy-uploads/…`; YouTube embeds preserved.

Posts: Arduino RC robot · remote controls · balsa-foam models · quadcopter build ·
Python cheat sheets · Raspberry Pi photo frame · EXIF rotation script · site news.

## What still needs to come over: the media binaries

The SQL holds only **URLs**, not files. **50 assets** (48 images + 2 `.txt` Arduino
sketches) are referenced — full list in [`legacy/uploads-manifest.txt`](./legacy/uploads-manifest.txt).

**To finish:** place the old `wp-content/uploads/` files under
`public/legacy-uploads/`, preserving the `YYYY/MM/` structure. Two ways:

1. **From cPanel** — File Manager → the old WordPress `wp-content/uploads`
   folder → Compress → Download → unzip into `public/legacy-uploads/`. Commit.
2. **Via CI** — since the FTP secrets are set, a one-shot GitHub Action can pull
   the folder down and commit it. Tell me the remote path and I'll add it.

Until then, images hide gracefully and download links 404 — the text content is
fully live.

## Redirects (apply at cutover)

Old WordPress permalinks → new project pages. Add to the live `.htaccess` when
going live (also in `legacy/uploads-manifest.txt`'s sibling notes):

```apache
# generated for the 11 migrated posts, e.g.
Redirect 301 /building-a-quadcopter/ /projects/building-a-quadcopter/
Redirect 301 /arduino-powered-remote-control-robot/ /projects/arduino-powered-remote-control-robot/
# …one per slug
```
