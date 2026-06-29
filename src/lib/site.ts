// Site-wide config for opt-in integrations. Both are off until you add the
// IDs/URL (see FEATURES.md) — nothing renders or breaks while disabled.
export const site = {
  author: 'Justin Poole',
  url: 'https://www.xile.us',

  // giscus comments (GitHub Discussions). Enable Discussions + the giscus app,
  // then paste the repo/category IDs from giscus.app and flip enabled.
  giscus: {
    enabled: false,
    repo: 'jpmk12/xile.us',
    repoId: '',
    category: 'Comments',
    categoryId: '',
  },

  // Newsletter. Point `action` at your provider's subscribe endpoint
  // (e.g. Buttondown) and flip enabled to show an email form; otherwise the
  // subscribe block falls back to promoting the RSS feed.
  newsletter: {
    enabled: false,
    action: '',
  },
};

export function prettify(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
