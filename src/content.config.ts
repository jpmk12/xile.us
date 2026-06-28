import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Projects = blog posts (one MDX/MD file per build). Migrated from the
// legacy WordPress xile.us, and the model for all new posts. See ROADMAP.md §4.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['complete', 'in-progress']).default('complete'),
    summary: z.string().default(''),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    legacyUrl: z.string().optional(),
  }),
});

export const collections = { projects };
