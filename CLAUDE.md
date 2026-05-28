# Story Wiki Schema

## Purpose
This wiki maintains a living knowledge base of all my creative writing 
projects, characters, themes, and techniques.

## Operations

### INGEST
When I add a new raw source (story idea, draft, notes):
1. Read the source completely
2. Discuss key elements with me
3. Create or update relevant wiki pages:
   - Story page (if new story or major update)
   - Character pages (extract/update profiles)
   - Theme pages (identify themes, link to other stories)
   - Technique pages (narrative devices used)
4. Update index.md with new/modified pages
5. Append entry to log.md

### QUERY
When I ask questions about my stories:
1. Search index.md for relevant pages
2. Read those pages
3. Synthesize answer with citations
4. If answer is valuable, offer to create new wiki page

### LINT
Periodically check wiki health:
- Find contradictions between character descriptions
- Identify orphan pages (no inbound links)
- Suggest connections between similar themes across stories
- Flag incomplete character arcs
- Note world-building gaps

## Page Formats

### Story Page Template
```markdown
# [Story Title]

**Status:** Draft | Outlined | Idea
**Format:** Film | Web Series | Anime | Short
**Genre:** [genres]
**Working Premise:** [one-line]

## Synopsis
[2-3 paragraph summary]

## Characters
- [[Character Name]] - [role]
- [[Character Name]] - [role]

## Themes
- [[Theme Name]]
- [[Theme Name]]

## Structure
[Act breakdown or outline]

## World
- [[World Page]] - [description]

## Techniques
- [[Technique]] - [how it's used]

## Status & Notes
[Current stage, next steps, open questions]

## Sources
- raw-sources/drafts/[filename]
- raw-sources/ideas/[filename]
```

### Character Page Template
```markdown
# [Character Name]

**Appears In:** [[Story 1]], [[Story 2]]
**Role:** Protagonist | Antagonist | Supporting

## Core Traits
[personality, motivations, flaws]

## Arc
[how they change]

## Relationships
- [[Character Name]] - [relationship type]

## Appearances
### [[Story Title]]
[role in this story]

### [[Story Title]]
[role in this story]
```

## Conventions
- Use [[wikilinks]] for all cross-references
- Every page must link to at least one other page
- Update index.md after every ingest
- Log format: `## [YYYY-MM-DD] operation | subject`