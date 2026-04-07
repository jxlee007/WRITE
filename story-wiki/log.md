---
layout: default
title: "log"
---

# Story Wiki — Operations Log

> Append-only. Format: `## [YYYY-MM-DD] operation | subject`
> Parse recent entries: `grep "^## \[" log.md | tail -10`

---

## [2026-04-07] ingest | stories-index.json — Full Catalog (30 stories)

**Action:** Initial wiki bootstrap from `stories-index.json` (30 entries) and `raw-sources/ideas/` raw source files (51 markdown files).

**Pages created (40 total):**
- `index.md` — master catalog
- `log.md` — this file
- `story-wiki/stories/` — 29 story pages (all 30 catalog entries; 6 fully developed, 14 structured stubs, 9 concept-fragment stubs)
- `story-wiki/characters/` — 3 characters (Thoulien Multiour, Sato, Grand-Emo Storm)
- `story-wiki/themes/` — 1 deep theme page (Immortality vs. Mortality)
- `story-wiki/techniques/` — 2 technique pages (Power Level System Design, Generational Saga Structure)
- `story-wiki/world/` — 1 world page (52 Card Universe)
- `story-wiki/analyses/` — 1 analysis page (Cross-Story Patterns)

**Key raw sources read:**
- `raw-sources/ideas/Amarta 2d8d707c4ce9808a949bd20d5bf0c65f.md`
- `raw-sources/ideas/Lvl 3 power 2d5d707c4ce980f88f53c335c387ba79.md`
- `stories-index.json` (all 30 entries)

**Notes:** Raw sources in `raw-sources/` are treated as immutable. Wiki pages synthesize from them.

---

## [2026-04-07] restructure | Reorganizing wiki and raw sources

**Action:** Reorganized folder structures for clarity and minimalism, separating raw sources from LLM-maintained wiki pages.
- Moved all raw sources (drafts, ideas, notes) originally in `story-wiki/Synopsis` to `/raw-sources/ideas/`.
- Repositioned associated files, references, and CSVs into `/raw-sources/references/` and `/raw-sources/characters/`.
- Moved LLM-maintained markdown wiki from `/wiki/` into `/story-wiki/`.
- Updated all references across the wiki linking to `story-wiki/Synopsis/` to use the new `raw-sources/ideas/` paths.
- Updated mentions of `thoulien_character_design.md.` to `raw-sources/characters/thoulien_character_design.md`.

---

## [2026-04-07] restructure-sweep | Unfiled Raw Sources

**Action:** Swept remaining standalone folders and unfiled assets into the new `/raw-sources/` minimal directory structure.
- Moved `ANANTA` pilot assets into `/raw-sources/drafts/`.
- Moved `HIS` text draft into `/raw-sources/ideas/`.
- Moved `V1` video, `WRITE.zip`, `logo.png`, `Image Block 11.png`, and root-level reference `.xml`/`.html` files into `/raw-sources/references/`.
- Removed empty/redundant `CP` directory.

---

## [2026-04-07] deploy | GitHub Pages — Jekyll site setup

**Action:** Prepared the wiki for GitHub Pages deployment via Jekyll.

**Files created:**
- `_config.yml` — Jekyll config (title, kramdown, minima theme, baseurl `/story-wiki`)
- `_convert.py` — Wikilink converter + front matter injector (idempotent; re-run after any edit)
- `_layouts/default.html` — Custom layout: dark sidebar + indigo-accented content area
- `_includes/nav.html` — Auto-built sidebar listing all stories/characters/themes/etc.
- `_data/navigation.yml` — Navigation data for Jekyll menus
- `assets/css/style.scss` — Full custom CSS (no external CDN dependency)
- `.gitignore` — Excludes `_site/`, `.jekyll-cache/`, build artifacts
- **Separate git repo** initialized in `story-wiki/` (independent of parent WRITE repo)

**Wikilink conversion:** `_convert.py` converted all `[[wikilinks]]` in 40 files to relative Markdown links. All links verified OK.

**Next step:** Create GitHub repo `jxlee007/story-wiki` → push → enable Pages (see deploy instructions).

---
