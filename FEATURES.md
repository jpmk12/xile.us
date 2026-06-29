# Feature notes

## Build-log series
Give related posts the same **Series** slug (e.g. `fpv-build`) in the CMS. Posts
with a shared series get a build-log nav box (ordered by date, with prev/next) and
a landing page at `/series/<slug>`.

## Update log
Add dated entries under **Update log** on any post — they render as a timeline.
Ideal for `in-progress` builds.

## Workbench
`/workbench` automatically lists every post with status **in-progress**, so it's
your live "what I'm building now" page. Set a post's status to `in-progress` to
put it there.

## Sharing
Every post has Copy-link / X / Reddit buttons (and the native share sheet on
mobile) — no setup needed.

---

## Comments (giscus) — optional, needs one-time setup
Comments are powered by GitHub Discussions via giscus. They stay **off** until
configured. To enable:

1. On `jpmk12/xile.us`: **Settings → General → Features → enable Discussions**.
2. Install the **giscus** GitHub App on the repo: https://github.com/apps/giscus
3. Go to https://giscus.app, enter the repo, pick the **Discussion category**
   (e.g. "Comments"), and copy the generated **`data-repo-id`** and
   **`data-category-id`**.
4. In `src/lib/site.ts`, set `giscus.enabled: true` and paste `repoId` +
   `categoryId`. Commit → comments appear on every project page.

## Newsletter — optional, needs a provider
The home "Follow the builds" block shows an RSS button until you wire an email
provider. To enable email signup:

1. Create a list with a provider that offers a plain form endpoint
   (e.g. **Buttondown**, Mailchimp embedded form, EmailOctopus).
2. In `src/lib/site.ts`, set `newsletter.enabled: true` and `newsletter.action`
   to the provider's subscribe URL. Commit → the email form replaces the RSS CTA.
