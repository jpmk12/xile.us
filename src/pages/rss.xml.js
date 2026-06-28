import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('projects'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => +b.data.date - +a.data.date);

  return rss({
    title: 'xile.us — makerspace build logs',
    description:
      'Code, robotics, 3D printing, and Halloween projects — documented project by project.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      categories: p.data.tags,
      link: `/projects/${p.id}/`,
    })),
  });
}
