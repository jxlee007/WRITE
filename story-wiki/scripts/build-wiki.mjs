#!/usr/bin/env node
// Regenerate wiki-generated.ts from /story-wiki/content/ markdown files
// Usage: node scripts/build-wiki.js

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WIKI_DIR = path.resolve(__dirname, '../content');
const OUTPUT   = path.resolve(__dirname, '../app/src/data/wiki-generated.ts');

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

/**
 * Determines the category based on the relative path from the wiki content root.
 */
function getCategory(filePath) {
  const relPath = path.relative(WIKI_DIR, filePath);
  const parts = relPath.split(path.sep);

  // Character and Idea folders take precedence regardless of nesting
  if (parts.includes('characters')) return 'character';
  if (parts.includes('ideas')) return 'idea';

  // Story types
  if (parts[0] === 'stories') {
    if (parts[1] === 'anime-series') return 'anime-series';
    if (parts[1] === 'movies') return 'movie';
    if (parts[1] === 'short-films') return 'short-film';
  }
  
  // Top-level non-story categories
  if (parts[0] === 'themes') return 'theme';
  if (parts[0] === 'techniques') return 'technique';
  if (parts[0] === 'world') return 'world';
  if (parts[0] === 'analyses') return 'analysis';

  return 'idea'; // Fallback
}

function processFile(filePath) {
  const file = path.basename(filePath);
  
  // Skip non-markdown files, log files, and the root index.md
  if (!file.endsWith('.md') || file === 'log.md' || (file === 'index.md' && path.dirname(filePath) === WIKI_DIR)) {
    return;
  }

  const category = getCategory(filePath);
  const raw = fs.readFileSync(filePath, 'utf-8');
  
  // Strip Jekyll-style front matter
  const content = raw.replace(/^---[\s\S]*?---\n?/, '').trim();

  // Extract links for graph/backlink features
  const links = new Set();
  
  // 1. [[wikilinks]]
  const wikiRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let m;
  while ((m = wikiRe.exec(content)) !== null) links.add(slugify(m[1]));

  // 2. [markdown links](path/to/file.md)
  const mdRe = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
  while ((m = mdRe.exec(content)) !== null) {
    const target = m[2].includes('/') ? path.basename(m[2]) : m[2];
    links.add(slugify(target));
  }

  // Use first H1 header if available, else derive from filename or data title
  const h1Match = content.match(/^#\s+(.+)$/m);
  const title = h1Match ? h1Match[1].trim() : humanTitle(file);
  
  // Strip the first H1 from content to avoid double headings in the UI
  const finalContent = h1Match ? content.replace(/^#\s+.+$/m, '').trim() : content;

  // Slug logic: index.md takes the name of its parent folder (the story name)
  let slug = slugify(file);
  if (file === 'index.md') {
    const parent = path.basename(path.dirname(filePath));
    slug = slugify(parent);
  }

  pages.push({
    slug,
    id: "0000", // Placeholder
    title,
    category,
    links: [...links],
    content: finalContent,
  });

  console.log(`  [${category}] ${slug}`);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

console.log('Building wiki data from nested structure...');
walk(WIKI_DIR);

const out = `// AUTO-GENERATED from /story-wiki/content/ — do not edit directly.
// Regenerate with: npm run prebuild

export type PageCategory = 
  | 'anime-series' 
  | 'movie' 
  | 'short-film' 
  | 'character' 
  | 'theme' 
  | 'technique' 
  | 'world' 
  | 'analysis' 
  | 'idea';

export interface WikiPage {
  slug: string;
  id: string;
  title: string;
  category: PageCategory;
  content: string;
  links: string[];
}

export const categoryLabels: Record<PageCategory, string> = {
  'anime-series': 'Anime Series',
  'movie': 'Movies',
  'short-film': 'Short Films',
  'character': 'Characters',
  'theme': 'Themes',
  'technique': 'Techniques',
  'world': 'Worlds',
  'analysis': 'Analyses',
  'idea': 'Raw Ideas',
};

export const categoryIcons: Record<PageCategory, string> = {
  'anime-series': '🎌',
  'movie': '📽️',
  'short-film': '🎬',
  'character': '👤',
  'theme': '💡',
  'technique': '🔧',
  'world': '🌍',
  'analysis': '🔬',
  'idea': '📝',
};

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
