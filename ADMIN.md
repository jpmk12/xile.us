# Visual editor (`/admin`) — Sveltia CMS

Post projects + photos from a laptop or phone at **https://www.xile.us/admin/**.
Sveltia writes the same Markdown files as the repo, so hand-editing still works.

## One-time setup: GitHub login

GoDaddy is static hosting, so the GitHub OAuth handshake needs a tiny broker.
Two options — pick one.

### Option A — Free OAuth broker (one-click "Sign in with GitHub")

1. **Deploy the broker.** Use the `sveltia-cms-auth` Cloudflare Worker template
   (free): https://github.com/sveltia/sveltia-cms-auth — "Deploy to Cloudflare".
   Note its URL, e.g. `https://xile-auth.<you>.workers.dev`.
2. **Create a GitHub OAuth App** — github.com → Settings → Developer settings →
   OAuth Apps → New:
   - Homepage URL: `https://www.xile.us`
   - Authorization callback URL: `https://xile-auth.<you>.workers.dev/callback`
   - Copy the **Client ID** and generate a **Client secret**.
3. **Set the Worker's variables** to that `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`.
4. **Point the CMS at it:** in `public/admin/config.yml`, set
   `backend.base_url` to your Worker URL. Commit.

Then visit `/admin/`, click **Sign in with GitHub**, and you're in.

### Option B — Personal Access Token (no extra service)

Sveltia can authenticate with a fine-grained **PAT** instead of OAuth:
- github.com → Settings → Developer settings → Fine-grained tokens → generate one
  scoped to `jpmk12/xile.us` with **Contents: Read and write**.
- At `/admin/`, choose token sign-in and paste it. (Less seamless than Option A,
  but zero extra infrastructure.)

## How posting works

1. `/admin/` → **Projects → New Project**.
2. Fill in title, date, tags, status, summary; drag-drop a **cover** + inline
   photos; add any **downloads**; write the body.
3. **Publish** → Sveltia commits the Markdown + images to the `main` branch →
   the deploy workflow builds and uploads to GoDaddy. Live in ~1–2 minutes.

New images land in `public/uploads/`; posts in `src/content/projects/`.

## Notes
- The editor is `noindex` and only writes to the repo — GoDaddy stays static.
- `config.yml` `branch:` is `main` (production). New posts deploy live on merge.
