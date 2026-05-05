#!/usr/bin/env node
// build-prose.mjs
// Reads prose/scenes/*.md from each story that has a prose/ folder.
// Parses frontmatter, metadata block, arc groupings from _outline.md,
// and emits app/src/data/prose-generated.ts
//
// Usage: node ../scripts/build-prose.mjs (run from story-wiki/app/)

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONTENT_DIR = path.resolve(__dirname, '../content');
const OUTPUT      = path.resolve(__dirname, '../app/src/data/prose-generated.ts');

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Strip YAML frontmatter block, return { meta, body } */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const metaRaw = match[1];
  const body    = match[2];
  const meta    = {};

  for (const line of metaRaw.split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*"?([^"]*)"?\s*$/);
    if (kv) meta[kv[1].trim()] = kv[2].trim();
  }

  return { meta, body };
}

/** Extract bold-label lines: **Label:** value */
function extractMeta(text, label) {
  const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+?)\\s*$`, 'm');
  const m  = text.match(re);
  return m ? m[1].replace(/\s{2,}/g, ' ').trim() : '';
}

/** Strip everything up to and including the first --- separator after frontmatter */
function extractBody(bodyText) {
  // Remove the H1 scene heading line
  let t = bodyText.replace(/^#\s+Scene \d+.*$/m, '').trim();

  // Remove the metadata block (Location / Characters / Purpose lines)
  t = t.replace(/\*\*Location:\*\*.*?(?=\*\*Characters|\*\*Purpose|^---)/ms, '');
  t = t.replace(/\*\*Characters:\*\*.*?(?=\*\*Purpose|^---)/ms, '');
  t = t.replace(/\*\*Purpose:\*\*.*?(?=^---)/ms, '');

  // Remove the first --- separator (and any trailing whitespace before it)
  t = t.replace(/^\s*---\s*\n/, '').trimStart();

  // Also strip any trailing --- at the end
  t = t.replace(/\n---\s*$/, '').trimEnd();

  return t;
}

// ─── Parse _outline.md ──────────────────────────────────────────────────────

/** Returns { sceneArcMap: Map<sceneId, arcName>, arcs: [{ name, sceneIds, note }] } */
function parseOutline(outlinePath) {
  if (!fs.existsSync(outlinePath)) return { sceneArcMap: new Map(), arcs: [] };

  const raw = fs.readFileSync(outlinePath, 'utf-8');

  // Parse table rows: | 001 | Scene Title | Arc Name | ... |
  const tableRe = /^\|\s*(\d{3})\s*\|[^|]*\|\s*([^|]+?)\s*\|/gm;
  const sceneArcMap = new Map();
  const arcOrder    = [];
  let m;

  while ((m = tableRe.exec(raw)) !== null) {
    const sceneId = m[1];
    const arcName = m[2].trim();
    sceneArcMap.set(sceneId, arcName);
    if (!arcOrder.includes(arcName)) arcOrder.push(arcName);
  }

  // Parse Arc Notes: **Arc N — Name (001–003):** description
  const arcNoteRe = /\*\*Arc \d+ — ([^(]+?)\s*\((\d+)[–-](\d+)\):\*\*\s*(.+?)(?=\n|$)/g;
  const arcNoteMap = new Map();
  while ((m = arcNoteRe.exec(raw)) !== null) {
    const arcName = m[1].trim();
    const note    = m[4].trim();
    arcNoteMap.set(arcName, note);
  }

  // Build arcs array in order
  const arcs = arcOrder.map(name => ({
    name,
    sceneIds: [...sceneArcMap.entries()]
      .filter(([, a]) => a === name)
      .map(([id]) => id),
    note: arcNoteMap.get(name) || '',
  }));

  return { sceneArcMap, arcs };
}

// ─── Process a single story's prose folder ──────────────────────────────────

const STORY_CONFIG = {
  '007-Spy': {
    slug:        '007-spy-treatment',
    storyTitle:  '007: Spy Continue',
    genre:       'thriller',
    logline:     'A former Indian intelligence operative — erased by the state, presumed dead across three continents — resurfaces from the margins of the world to protect the one person who still remembers his name, before the people who buried him find out he\'s still breathing.',
  },
};

function processStory(storyDir, storyName) {
  const config    = STORY_CONFIG[storyName];
  if (!config) return null;

  const proseDir  = path.join(storyDir, 'prose');
  const scenesDir = path.join(proseDir, 'scenes');

  if (!fs.existsSync(scenesDir)) return null;

  console.log(`  Processing prose: ${storyName}`);

  const outlinePath = path.join(proseDir, '_outline.md');
  const { sceneArcMap, arcs } = parseOutline(outlinePath);

  // Read scene files
  const sceneFiles = fs.readdirSync(scenesDir)
    .filter(f => f.endsWith('.md'))
    .sort();

  const scenes = [];
  let lockedCount = 0;

  for (const file of sceneFiles) {
    const filePath = path.join(scenesDir, file);
    const raw      = fs.readFileSync(filePath, 'utf-8');
    const { meta, body } = parseFrontmatter(raw);

    const sceneId  = String(meta['scene'] || '000').padStart(3, '0');
    const title    = meta['title']  || '';
    const status   = meta['status'] || 'draft';

    const location   = extractMeta(body, 'Location');
    const characters = extractMeta(body, 'Characters');
    const purpose    = extractMeta(body, 'Purpose');
    const prose      = extractBody(body);
    const arcName    = sceneArcMap.get(sceneId) || 'Uncategorized';

    if (status === 'locked') lockedCount++;

    scenes.push({
      sceneNumber: parseInt(sceneId, 10),
      sceneId,
      title,
      status,
      location,
      characters,
      purpose,
      arcName,
      body: prose,
    });

    console.log(`    [${status}] ${sceneId} — ${title} (Arc: ${arcName})`);
  }

  return {
    slug:       config.slug,
    storyTitle: config.storyTitle,
    genre:      config.genre,
    logline:    config.logline,
    arcs,
    scenes,
    sceneCount:  scenes.length,
    lockedCount,
  };
}

// ─── Walk content for prose folders ─────────────────────────────────────────

function walkStories(contentDir) {
  const works = [];

  const storiesDir = path.join(contentDir, 'stories');
  if (!fs.existsSync(storiesDir)) return works;

  for (const category of fs.readdirSync(storiesDir, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    const catDir = path.join(storiesDir, category.name);

    for (const story of fs.readdirSync(catDir, { withFileTypes: true })) {
      if (!story.isDirectory()) continue;
      const storyDir = path.join(catDir, story.name);
      const work = processStory(storyDir, story.name);
      if (work) works.push(work);
    }
  }

  return works;
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('Building prose treatment data...');
const works = walkStories(CONTENT_DIR);

const out = `// AUTO-GENERATED from /story-wiki/content/*/prose/ — do not edit directly.
// Regenerate with: node scripts/build-prose.mjs  (or via npm run predev)

export interface ProseScene {
  sceneNumber: number;
  sceneId: string;
  title: string;
  status: 'draft' | 'revised' | 'locked';
  location: string;
  characters: string;
  purpose: string;
  arcName: string;
  body: string;
}

export interface ProseArc {
  name: string;
  sceneIds: string[];
  note: string;
}

export interface ProseWork {
  slug: string;
  storyTitle: string;
  genre: string;
  logline: string;
  arcs: ProseArc[];
  scenes: ProseScene[];
  sceneCount: number;
  lockedCount: number;
}

export const proseWorks: ProseWork[] = ${JSON.stringify(works, null, 2)} as ProseWork[];

export const proseWorksBySlug = new Map(proseWorks.map(w => [w.slug, w]));
`;

fs.writeFileSync(OUTPUT, out);
console.log(`\n✅ Generated ${works.length} prose work(s) → src/data/prose-generated.ts`);
works.forEach(w => {
  console.log(`   ${w.slug}: ${w.lockedCount}/${w.sceneCount} scenes locked`);
});
