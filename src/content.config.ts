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

export const collections = { projects };
