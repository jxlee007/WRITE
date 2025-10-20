# Quick Reference: Project Overview Feature

## What We're Building
A **Project Overview Panel** that displays when a user clicks on a project, showing:
- Project title, genre, format
- Statistics (chapters, words, tokens)
- Token breakdown by type
- Project description (editable)
- Quick action buttons

## Visual Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ 📁 My Epic Novel                                    Genre: Fantasy│
│    Format: Novel                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📊 STATISTICS                                                    │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐          │
│  │   25        │  │    15,240    │  │      42        │          │
│  │  Chapters   │  │  Words       │  │  Tokens        │          │
│  └─────────────┘  └──────────────┘  └─────────────────┘          │
│                                                                   │
│  📋 TOKEN BREAKDOWN                                               │
│  Characters: 12  │  Locations: 8  │  Objects: 15  │  Events: 7  │
│                                                                   │
│  ✍️  DESCRIPTION                                   [✏️ Edit]     │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │ This is an epic fantasy novel following the hero's quest...  ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│  🔤 RECENT TOKENS (Top 8)                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ 👤 Aragorn   │  │ 🏰 Rivendell │  │ ⚔️ Excalibur │           │
│  │ Character    │  │ Location     │  │ Object       │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ ... 2 more   │  │ ... 2 more   │  │ ... 2 more   │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  🔘 ACTIONS                                                       │
│  [+ Add Chapter] [+ Add Token] [📤 Export] [⚙️ Settings]         │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## Implementation Breakdown

### 🎯 Phase 1: Backend (Convex)
**Query:** `getProjectOverview(projectId)`
- Fetches project data
- Counts documents & calculates word count
- Groups tokens by type
- Returns top 8 tokens for preview

**Mutation:** `updateProjectDescription(projectId, description)`
- Updates project metadata

### 🎨 Phase 2: Components
1. **ProjectOverview.tsx** (main panel)
2. **ProjectStatCard.tsx** (stat display - optional)
3. **TokenPreviewCard.tsx** (token card)

### 🔌 Phase 3: Integration
- Update `Index.tsx` to show overview when project selected
- Update `ProjectManager.tsx` to handle selection

### ⚡ Phase 4: Enhancements
- Inline description editing
- Action button handlers

## Key Files Involved

| File | Action |
|------|--------|
| `convex/projects.ts` | ➕ Add 2 functions |
| `src/components/ProjectOverview.tsx` | ✨ Create new |
| `src/components/ProjectStatCard.tsx` | ✨ Create new (optional) |
| `src/components/TokenPreviewCard.tsx` | ✨ Create new |
| `src/pages/Index.tsx` | 🔄 Modify rendering logic |
| `src/components/ProjectManager.tsx` | 🔄 Minor tweaks |

## Data Flow

```
User Clicks Project in Sidebar
  ↓
ProjectManager.onProjectSelect(projectId)
  ↓
Index.tsx: selectedProjectId = projectId
  ↓
ProjectOverview component mounts
  ↓
useQuery(getProjectOverview) → Fetch all data
  ↓
Render stats, tokens, description
```

## Estimated Work

- **Backend:** ~30 mins
- **Components:** ~60 mins
- **Integration:** ~30 mins
- **Polish & Testing:** ~30 mins
- **Total:** ~2.5 hours

## Next Steps

Ready to proceed? We can build this in phases:
1. Start with backend queries
2. Build UI components
3. Integrate everything
4. Add polish and refinements

Would you like to start with Phase 1 (Backend)?
