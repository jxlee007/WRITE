#!/usr/bin/env node
// Regenerate wiki-generated.ts from /story-wiki/content/ markdown files
// Usage: node scripts/build-wiki.js

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WIKI_DIR = path.resolve(__dirname, '../content');
const OUTPUT   = path.resolve(__dirname, '../app/src/data/wiki-generated.ts');

const CATEGORY_MAP = {
  stories:    'story',
  characters: 'character',
  themes:     'theme',
  techniques: 'technique',
  world:      'world',
  analyses:   'analysis',
  ideas: 'idea',
};

function slugify(s) {
  return s
    .replace(/\.md$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function humanTitle(filename) {
  return filename
    .replace(/\.md$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

const pages = [];

for (const [dir, cat] of Object.entries(CATEGORY_MAP)) {
  const dirPath = path.join(WIKI_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    console.warn(`  ⚠ Directory not found: ${dirPath}`);
    continue;
  }

  for (const file of fs.readdirSync(dirPath)) {
    if (!file.endsWith('.md')) continue;

    const raw     = fs.readFileSync(path.join(dirPath, file), 'utf-8');
    // Strip Jekyll front matter
    const content = raw.replace(/^---[\s\S]*?---\n?/, '').trim();

    // Extract [[wikilink]] targets
    const links = new Set();
    const re    = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
    let m;
    while ((m = re.exec(content)) !== null) links.add(slugify(m[1]));

    // Use first H1 header if available, else derive from filename
    const h1 = content.match(/^#\s+(.+)$/m);
    const title = h1 ? h1[1].trim() : humanTitle(file);

    pages.push({
      slug:     slugify(file),
      title,
      category: cat,
      links:    [...links],
      content,
    });

    console.log(`  [${cat}] ${slugify(file)}`);
  }
}

const out = `export type PageCategory = 'story' | 'character' | 'theme' | 'technique' | 'world' | 'analysis' | 'idea';

export interface WikiPage {
  slug: string;
  title: string;
  category: PageCategory;
  content: string;
  links: string[];
}

export const categoryLabels: Record<PageCategory, string> = {
  story: 'Stories',
  character: 'Characters',
  theme: 'Themes',
  technique: 'Techniques',
  world: 'Worlds',
  analysis: 'Analyses',
  idea: 'Raw Ideas',
};

export const categoryIcons: Record<PageCategory, string> = {
  story: '📖',
  character: '👤',
  theme: '💡',
  technique: '🔧',
  world: '🌍',
  analysis: '🔬',
  idea: '📝',
};

// AUTO-GENERATED from /story-wiki/content/ — do not edit directly.
// Regenerate with: node scripts/build-wiki.js
export const wikiPages: WikiPage[] = ${JSON.stringify(pages, null, 2)} as WikiPage[];

export const pagesBySlug = new Map(wikiPages.map(p => [p.slug, p]));
export const pagesByCategory = wikiPages.reduce<Record<PageCategory, WikiPage[]>>((acc, page) => {
  if (!acc[page.category]) acc[page.category] = [];
  acc[page.category].push(page);
  return acc;
}, {} as Record<PageCategory, WikiPage[]>);
`;

fs.writeFileSync(OUTPUT, out);
console.log(`\n✅ Generated ${pages.length} wiki pages → src/data/wiki-generated.ts`);
