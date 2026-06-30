import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Projects = blog posts (one MDX/MD file per build). Migrated from the
// legacy WordPress xile.us, and the model for all new posts. See ROADMAP.md §4.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z
      .enum(['flying', 'robotics', '3d-printing', 'code', 'halloween', 'updates'])
      .default('updates'),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    status: z.enum(['complete', 'in-progress']).default('complete'),
    summary: z.string().default(''),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    legacyUrl: z.string().optional(),
    downloads: z
      .array(z.object({ label: z.string(), file: z.string() }))
      .default([]),
    series: z.string().optional(),
    updates: z.array(z.object({ date: z.string(), note: z.string() })).default([]),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    bom: z
      .array(z.object({ part: z.string(), qty: z.string().optional(), link: z.string().optional() }))
      .default([]),
    models: z.array(z.object({ label: z.string(), file: z.string() })).default([]),
  }),
});

// Games = a showcase of games built. One file per game; title + brief
// description + screenshot, with optional repo/play links. See /games.
const games = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    screenshot: z.string().optional(),
    repo: z.string().optional(),
    play: z.string().optional(),
    tech: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

// Apps = software tools (e.g. flying / mission-planning apps) shown on /flying.
const apps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/apps' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    screenshot: z.string().optional(),
    repo: z.string().optional(),
    url: z.string().optional(),
    tech: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, games, apps };
