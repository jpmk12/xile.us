import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { categorySlugs } from '../src/lib/categories';

const DIR = path.join(process.cwd(), 'src/content/projects');
const PUBLIC = path.join(process.cwd(), 'public');

const files = readdirSync(DIR).filter((f) => f.endsWith('.md'));
const posts = files.map((f) => {
  const { data } = matter(readFileSync(path.join(DIR, f), 'utf-8'));
  return { file: f, slug: f.replace(/\.md$/, ''), data };
});

const publicExists = (p: string) => existsSync(path.join(PUBLIC, p.replace(/^\//, '')));

describe('content integrity', () => {
  it('found project posts to validate', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it('has no duplicate slugs', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const p of posts) {
    describe(p.file, () => {
      it('has a title and a valid date', () => {
        expect(typeof p.data.title).toBe('string');
        expect(p.data.title.length).toBeGreaterThan(0);
        expect(Number.isNaN(new Date(p.data.date).getTime())).toBe(false);
      });

      it('uses a known category', () => {
        const cat = p.data.category ?? 'updates';
        expect(categorySlugs).toContain(cat);
      });

      it('references files that exist in public/', () => {
        if (p.data.cover) expect(publicExists(p.data.cover), `cover ${p.data.cover}`).toBe(true);
        for (const d of p.data.downloads ?? [])
          expect(publicExists(d.file), `download ${d.file}`).toBe(true);
        for (const m of p.data.models ?? [])
          expect(publicExists(m.file), `model ${m.file}`).toBe(true);
      });

      it('has well-formed bom entries', () => {
        for (const b of p.data.bom ?? []) {
          expect(typeof b.part).toBe('string');
          if (b.link) expect(/^https?:\/\//.test(b.link)).toBe(true);
        }
      });
    });
  }
});
