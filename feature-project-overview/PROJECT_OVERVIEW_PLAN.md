# Project Overview Feature - Development Plan

## 📋 Overview
When a user clicks on a specific project in the sidebar, the main content area (currently showing "Select a project from the sidebar") should display a comprehensive Project Overview panel showing:
- Project metadata (title, genre, format)
- Statistics (chapters/documents count, word count)
- Related tokens (characters, locations, etc.)
- Project description
- Quick actions for editing project details

---

## 📊 Feature Components & Data Requirements

### 1. **Project Overview Panel Component**
**File:** `src/components/ProjectOverview.tsx` (NEW)

**Displays:**
- Project header with title, genre, format
- Project statistics:
  - Total documents/chapters count
  - Total word count
  - Total tokens (world-building elements)
  - Token breakdown by type (characters, locations, objects, etc.)
- Project description with edit capability
- Token preview cards (top 8 tokens sorted by type)
- Quick action buttons (Edit Project, Add Document, Add Token, Export)

**Props:**
```typescript
interface ProjectOverviewProps {
  projectId: Id<"projects">;
  onAddDocument?: () => void;
  onAddToken?: () => void;
  onEdit?: () => void;
}
```

---

### 2. **Backend Queries (Convex)**
**File:** `convex/projects.ts` (EXTEND)

#### Query: `getProjectOverview`
```typescript
// Gets comprehensive project data for overview
- Project details (title, genre, format, description)
- Document count and word count
- Token count and breakdown by type
- Recent tokens (for preview)
```

**Returns:**
```typescript
{
  project: Project,
  stats: {
    documentCount: number,
    wordCount: number,
    tokenCount: number,
    tokensByType: { [type: string]: number }
  },
  tokens: Token[]  // top 8 tokens
}
```

---

### 3. **Frontend State Management (Index.tsx)**
**Modifications:**

Currently, `selectedProjectId` exists but when selected, no overview is shown.

**Changes needed:**
- Already have `selectedProjectId` state ✅
- Need to use this to fetch and display `ProjectOverview` component
- Pass `selectedProjectId` to a new view that shows the overview

---

### 4. **UI Layout Architecture**
**Current structure:**
```
┌─ ActivityBar ─┬─ Sidebar (FileExplorer/Projects/etc) ─┬─ Main Content Area ─┐
│               │                                         │                     │
│               │                                         │ "Select a project   │
│               │                                         │  from sidebar"      │
└───────────────┴─────────────────────────────────────────┴─────────────────────┘
```

**New structure when project selected:**
```
┌─ ActivityBar ─┬─ ProjectManager Sidebar ─┬─ ProjectOverview Panel ─┐
│               │                           │                        │
│               │ Projects list             │ ├─ Project Header      │
│               │ - Project A  (selected)   │ ├─ Statistics Cards    │
│               │ - Project B               │ ├─ Description Section │
│               │ - Project C               │ ├─ Token Preview Grid  │
│               │                           │ └─ Action Buttons      │
└───────────────┴───────────────────────────┴────────────────────────┘
```

---

## 🗄️ Database Schema Updates

### Project Metadata Enhancement
The schema already supports this in `projects` table:
```typescript
metadata: {
  wordCount?: number,
  chapterCount?: number,
  description?: string  // NEW USAGE - for project description
}
```

**Note:** We need to ensure metadata is populated when:
1. Documents are created/updated (word count tracking)
2. Project is updated (manual description)

---

## 🔄 Data Flow

### 1. User clicks on project in ProjectManager
```
ProjectManager.tsx
  └─ onClick handler
      └─ calls onProjectSelect(projectId)
          └─ Index.tsx sets selectedProjectId
```

### 2. Index.tsx detects selectedProjectId change
```
useEffect(() => {
  if (selectedProjectId) {
    setActiveView("overview")  // or keep viewing as "projects"
  }
})
```

### 3. ProjectOverview component queries data
```
ProjectOverview.tsx
  └─ useQuery(api.projects.getProjectOverview, { projectId })
      └─ Renders stats, tokens, description
```

---

## 📝 Implementation Steps

### Phase 1: Backend Setup (2 tasks)
- [ ] **Task 1.1:** Create `getProjectOverview` query in `convex/projects.ts`
  - Fetch project with all metadata
  - Count documents
  - Calculate total word count
  - Get token counts by type
  - Return top 8 tokens for preview
  
- [ ] **Task 1.2:** Create helper mutation `updateProjectDescription` in `convex/projects.ts`
  - Update project metadata.description
  - Update updatedAt timestamp

### Phase 2: Component Development (3 tasks)
- [ ] **Task 2.1:** Create `ProjectOverview.tsx` component
  - Header section with project title/genre/format
  - Statistics cards layout
  - Description section with edit button
  - Token preview grid
  - Action buttons
  
- [ ] **Task 2.2:** Create `ProjectStatCard.tsx` sub-component (OPTIONAL)
  - Reusable card for displaying stats
  - Icon, label, value
  
- [ ] **Task 2.3:** Create `TokenPreviewCard.tsx` sub-component
  - Display token name, type, description
  - Hover effects

### Phase 3: Integration (2 tasks)
- [ ] **Task 3.1:** Update `ProjectManager.tsx`
  - Ensure proper onProjectSelect callback
  - Visual indication of selected project
  
- [ ] **Task 3.2:** Update `Index.tsx`
  - Render ProjectOverview when selectedProjectId is set
  - Replace empty state with overview panel
  - Handle view transitions

### Phase 4: Enhancement (2 tasks)
- [ ] **Task 4.1:** Add inline description editing
  - Show textarea when editing description
  - Save/cancel buttons
  - Real-time mutation on save
  
- [ ] **Task 4.2:** Add quick action handlers
  - "Add Document" button navigates to create document view
  - "Add Token" button opens token creation dialog
  - "Export" button opens export menu

---

## 🎨 UI/UX Specifications

### Color & Styling
- Use existing color scheme from root CSS variables
- Primary accent: `hsl(263 70% 62%)` (purple)
- Secondary: `hsl(210 100% 60%)` (cyan)
- Cards: `hsl(222 47% 14%)` background

### Responsive Design
- Desktop: Full overview with 3-column token grid
- Tablet: 2-column token grid
- Mobile: 1-column token grid (if applicable)

### States
1. **Loading:** Skeleton loaders for cards
2. **Empty:** Show empty states with helpful CTAs
3. **Loaded:** Full overview display
4. **Editing:** Description edit mode with save/cancel
5. **Error:** Error message with retry option

---

## 📦 New Files to Create

| File | Type | Purpose |
|------|------|---------|
| `src/components/ProjectOverview.tsx` | Component | Main overview panel |
| `src/components/ProjectStatCard.tsx` | Component | Stat display card (optional) |
| `src/components/TokenPreviewCard.tsx` | Component | Token preview card |
| `PROJECT_OVERVIEW_PLAN.md` | Documentation | This plan |

---

## 🔧 Files to Modify

| File | Changes |
|------|---------|
| `convex/projects.ts` | Add `getProjectOverview` query, `updateProjectDescription` mutation |
| `src/pages/Index.tsx` | Render ProjectOverview when project selected |
| `src/components/ProjectManager.tsx` | Ensure proper selection handling |

---

## 💾 Data Aggregation Logic

The `getProjectOverview` query needs to:

1. **Get project:** `ctx.db.get(projectId)`
2. **Count documents:** 
   ```typescript
   documents = ctx.db.query("documents")
     .withIndex("by_project", q => q.eq("projectId", projectId))
     .collect()
   documentCount = documents.length
   ```
3. **Calculate word count:** Sum all document content word counts
4. **Get tokens:**
   ```typescript
   tokens = ctx.db.query("tokens")
     .withIndex("by_project", q => q.eq("projectId", projectId))
     .collect()
   tokenCount = tokens.length
   tokensByType = group tokens by type and count
   ```

---

## ✅ Success Criteria

1. ✅ Project overview displays when project is selected
2. ✅ All statistics are accurate and real-time
3. ✅ Token preview shows relevant tokens for the project
4. ✅ Description is editable inline
5. ✅ UI is responsive and matches design system
6. ✅ Loading states prevent layout shift
7. ✅ Error states handled gracefully
8. ✅ Performance: Load overview in < 1 second

---

## 🚀 Future Enhancements

- [ ] Project activity timeline
- [ ] Collaboration info (if multi-user)
- [ ] Project tags/categories
- [ ] Advanced statistics (average chapter length, etc.)
- [ ] Project health score (completeness indicator)
- [ ] Recent edits activity log
- [ ] Project duplication
- [ ] Version history

