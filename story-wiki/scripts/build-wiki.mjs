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
  ideas:      'idea',
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

function processFile(filePath, category) {
  const file = path.basename(filePath);
  if (!file.endsWith('.md')) return;

  const raw = fs.readFileSync(filePath, 'utf-8');
  // Strip Jekyll front matter
  const content = raw.replace(/^---[\s\S]*?---\n?/, '').trim();

  // Extract links
  const links = new Set();
  
  // 1. [[wikilinks]]
  const wikiRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let m;
  while ((m = wikiRe.exec(content)) !== null) links.add(slugify(m[1]));

  // 2. [markdown links](path/to/file.md)
  const mdRe = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
  while ((m = mdRe.exec(content)) !== null) {
    const target = path.basename(m[2]);
    links.add(slugify(target));
  }

  // Use first H1 header if available, else derive from filename
  const h1 = content.match(/^#\s+(.+)$/m);
  const title = h1 ? h1[1].trim() : humanTitle(file);

  pages.push({
    slug:     slugify(file),
    id:       "0000", // Placeholder for now
    title,
    category,
    links:    [...links],
    content,
  });

  console.log(`  [${category}] ${slugify(file)}`);
}

// 1. Process Categories
for (const [dir, cat] of Object.entries(CATEGORY_MAP)) {
  const dirPath = path.join(WIKI_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    console.warn(`  ⚠ Directory not found: ${dirPath}`);
    continue;
  }

  for (const file of fs.readdirSync(dirPath)) {
    processFile(path.join(dirPath, file), cat);
  }
}

const out = `export type PageCategory = 'story' | 'character' | 'theme' | 'technique' | 'world' | 'analysis' | 'idea';

export interface WikiPage {
  slug: string;
  id: string;
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
// Regenerate with: npm run prebuild
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
