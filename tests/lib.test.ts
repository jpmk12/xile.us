import { describe, it, expect } from 'vitest';
import { link } from '../src/lib/link';
import { fileMeta } from '../src/lib/files';
import { getCategory, categorySlugs, categories } from '../src/lib/categories';
import { prettify } from '../src/lib/site';

describe('link()', () => {
  it('returns root for "/"', () => {
    expect(link('/')).toBe('/');
  });
  it('keeps absolute internal paths', () => {
    expect(link('/projects')).toBe('/projects');
    expect(link('/tags/quadcopter')).toBe('/tags/quadcopter');
  });
  it('normalizes a missing leading slash', () => {
    expect(link('flying')).toBe('/flying');
  });
});

describe('fileMeta()', () => {
  it('reports extension + size for an existing public file', () => {
    const m = fileMeta('/og-default.png');
    expect(m.ext).toBe('PNG');
    expect(m.size).not.toBe('');
  });
  it('returns blank size for a missing file (no throw)', () => {
    const m = fileMeta('/nope/does-not-exist.stl');
    expect(m.ext).toBe('STL');
    expect(m.size).toBe('');
  });
  it('strips query strings from the extension', () => {
    expect(fileMeta('/x/y.pdf?v=2').ext).toBe('PDF');
  });
});

describe('categories', () => {
  it('resolves a known category', () => {
    expect(getCategory('flying')?.label).toBe('Flying');
  });
  it('returns undefined for an unknown slug', () => {
    expect(getCategory('not-a-category')).toBeUndefined();
  });
  it('every category has slug/label/blurb and matching slug list', () => {
    for (const c of categories) {
      expect(c.slug).toBeTruthy();
      expect(c.label).toBeTruthy();
      expect(c.blurb).toBeTruthy();
    }
    expect(categorySlugs).toContain('flying');
    expect(categorySlugs.length).toBe(categories.length);
  });
});

describe('prettify()', () => {
  it('title-cases a slug', () => {
    expect(prettify('wireless-robot')).toBe('Wireless Robot');
    expect(prettify('python-cheat-sheets')).toBe('Python Cheat Sheets');
  });
});
