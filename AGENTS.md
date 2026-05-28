# AGENTS.md — Prose & Versioning Extension

> This file extends [CLAUDE.md](CLAUDE.md).
> Read CLAUDE.md first — it defines the base schema (INGEST, QUERY, LINT, page formats, conventions).
> This file adds the prose layer on top of that foundation.

---

## How the Two Files Relate

| File | Covers | Layer |
|------|--------|-------|
| `CLAUDE.md` | Wiki operations, page templates, conventions | **Infra** — reference knowledge |
| `AGENTS.md` (this file) | Prose writing, versioning, drift tracking | **Prose** — actual writing output |

The infra layer (CLAUDE.md) must always be stable and correct before prose (this file) is written against it. Changes to infra must be tracked so prose can stay in sync.

---

## Three-Stage Flow

```
raw-sources/          →    story-wiki/content/         →    prose/
(raw-idea)                 (infra — CLAUDE.md rules)        (prose — AGENTS.md rules)
immutable                  versioned, logged                 versioned, drift-tracked
Notion exports,            index.md, characters/,           _outline.md, scenes/,
rough notes                themes/, world/                   _changes.md
```

Each stage feeds the next. Prose is always written *against* a known infra version.

---

## Folder Structure Per Story

```
story-wiki/content/stories/[category]/[Story-Name]/
├── index.md              ← infra (CLAUDE.md rules)
├── characters/           ← infra (CLAUDE.md rules)
│   └── Character-Name.md
├── ideas/                ← infra (between raw-idea and wiki)
│   └── concept-note.md
└── prose/                ← prose (AGENTS.md rules)
    ├── _outline.md       ← scene queue and status
    ├── _changes.md       ← infra change log (drift tracker)
    └── scenes/
        ├── 001-scene-slug.md
        └── 002-scene-slug.md
```

---

## File Versioning (Strict — applies to ALL files)

Every file — both infra and prose — must carry version metadata in YAML frontmatter.

### Format
```yaml
version: 1.0
last-modified: YYYY-MM-DD
```

### Rules
- `version` must be bumped on every substantive edit — **no exceptions**
- `last-modified` must reflect the actual date of the change
- Version format: `MAJOR.MINOR`
  - `MINOR` bump (`1.0 → 1.1`): additions, clarifications, minor corrections
  - `MAJOR` bump (`1.x → 2.0`): rewrites, structural changes, canon reversals, power set changes
- An unversioned edit is an untracked edit — treat it as unreliable

### Infra Frontmatter (extends CLAUDE.md page templates)
All infra pages (story index, characters, themes, world, techniques) must add to their existing frontmatter:
```yaml
---
layout: default
title: "[Page Title]"
version: 1.0
last-modified: YYYY-MM-DD
---
```

---

## Operations (extends CLAUDE.md operations)

### WRITE
When working on prose for a story:
1. Read the story's `index.md` + all referenced character/world pages (infra layer)
2. Note the current `version` of each infra page you are writing against
3. Read `prose/_outline.md` — create it if it doesn't exist yet
4. Write or continue a scene in `prose/scenes/`; populate `infra-baseline` in frontmatter
5. After writing, mark scene status in `prose/_outline.md`

### INFRA-CHANGE
When any infra page (character, story index, world, theme) is modified:
1. Bump the file's `version` in frontmatter — **mandatory before saving**
   - Minor: `1.0 → 1.1` | Major (canon change): `1.x → 2.0`
2. Update `last-modified` to today's date
3. Log the change in the story's `prose/_changes.md`:
   ```
   ## [YYYY-MM-DD] [filename] v[old] → v[new]
   - What changed: [description of the edit]
   - Prose impact: [which story elements or scenes may be affected]
   - Scenes to review: [001, 004] or "none yet"
   ```
4. Create `prose/_changes.md` if it doesn't exist yet

### PROSE-SYNC
Run this after any INFRA-CHANGE to detect drift in prose:
1. For each scene file in `prose/scenes/`, read its `infra-baseline` field
2. Compare each baseline version against the current version of that infra file
3. Flag any scene where `current infra version > scene's baseline version`
4. Output a drift report:
   ```
   DRIFT REPORT — [Story Name] — [date]
   ─────────────────────────────────────
   scenes/001-slug.md — DRIFT DETECTED
     Sato.md: scene baseline v1.0 | current v2.0 → review required
   
   scenes/003-slug.md — OK (all baselines match current)
   ```
5. After reviewing and updating each flagged scene:
   - Bump the scene's `infra-baseline` to match current infra versions
   - Bump the scene's own `version`

---

## File Templates

### Prose Scene (`prose/scenes/NNN-slug.md`)
```markdown
---
scene: NNN
title: "[Scene Title]"
version: 1.0
last-modified: YYYY-MM-DD
status: draft | revised | locked
infra-baseline:
  "characters/Character-Name.md": 1.0
  "characters/Other-Character.md": 1.0
  "world/World-Page.md": 1.0
---

# Scene NNN — [Title]

**Location:** [where this takes place]
**Characters:** [who appears]
**Purpose:** [what this scene accomplishes narratively]

---

[prose begins here]
```

### Prose Outline (`prose/_outline.md`)
```markdown
---
version: 1.0
last-modified: YYYY-MM-DD
---

# [Story Title] — Scene Outline

| # | Scene | Status | Notes |
|---|-------|--------|-------|
| 001 | [Scene title] | ⬜ Todo | |
| 002 | [Scene title] | 🔄 Draft | |
| 003 | [Scene title] | ✅ Locked | |

## Arc Notes
[Any high-level notes about intended story shape, episode groupings, etc.]
```

**Scene status key:**
- `⬜ Todo` — not yet written
- `🔄 Draft` — written, not reviewed for drift
- `📋 Review` — flagged by PROSE-SYNC, needs update
- `✅ Locked` — written, drift-checked, considered stable

### Infra Change Log (`prose/_changes.md`)
```markdown
---
version: 1.0
last-modified: YYYY-MM-DD
---

# [Story Title] — Infra Change Log

> Append-only. Every infra edit that may affect prose must be logged here.
> Written by: INFRA-CHANGE operation. Read by: PROSE-SYNC operation.

---

## [YYYY-MM-DD] [filename] v[old] → v[new]
- **What changed:** [description]
- **Prose impact:** [how this may affect existing scenes]
- **Scenes to review:** [001, 003] or "none yet"
```

---

## Drift Loop (How It All Works Together)

```
1. Edit Sato.md (v1.0 → v2.0) [INFRA-CHANGE]
        ↓
2. Log in prose/_changes.md:
   "power set changed — review scenes 001, 004"
        ↓
3. Run PROSE-SYNC:
   scene 001 baseline: Sato v1.0 | current: v2.0 → DRIFT
   scene 004 baseline: Sato v1.0 | current: v2.0 → DRIFT
        ↓
4. Update scene 001 prose if needed
   Bump scene 001: infra-baseline Sato → v2.0, scene version 1.0 → 1.1
        ↓
5. PROSE-SYNC re-run: scene 001 — OK
```

---

## Conventions (extends CLAUDE.md conventions)

- Every infra file must have `version` and `last-modified` in frontmatter
- Every prose file must have `version`, `last-modified`, `status`, and `infra-baseline`
- INFRA-CHANGE is always logged in `prose/_changes.md` — no silent edits
- PROSE-SYNC must be run after any major infra change (MAJOR version bump)
- `locked` scenes are not exempt from PROSE-SYNC — lock is re-evaluated after drift
