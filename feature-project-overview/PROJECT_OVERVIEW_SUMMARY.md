# 🎯 Project Overview Feature - Complete Plan Summary

## Executive Summary

This feature transforms the empty "Select a project from the sidebar" placeholder into a **rich project overview dashboard** that appears when users select a project.

### What Users Will See
When clicking a project, users get a beautiful overview showing:
- Project details (title, genre, format)
- Key statistics (chapters, words, total tokens)
- Token distribution breakdown
- Project description (editable)
- Preview grid of related tokens
- Quick action buttons

---

## 📋 Table of Contents
1. [Current State](#current-state)
2. [Desired State](#desired-state)
3. [Implementation Plan](#implementation-plan)
4. [Technical Details](#technical-details)
5. [Development Timeline](#development-timeline)
6. [Success Criteria](#success-criteria)

---

## Current State

### What Exists Now ✅
- **ProjectManager.tsx**: Lists all projects, handles creation/deletion
- **Project Selection**: `selectedProjectId` state exists in Index.tsx
- **Projects Backend**: Basic CRUD operations in convex/projects.ts
- **Database Schema**: Supports metadata, documents, tokens

### What's Missing ❌
- **Project Overview Display**: No UI when project is selected
- **Statistics Query**: No backend aggregation of project data
- **Component**: No ProjectOverview component
- **Visual Feedback**: User sees placeholder text instead of overview

### Current Empty State
```
User clicks project
        ↓
selectedProjectId is set
        ↓
... nothing visible changes ...
        ↓
User sees: "Select a project from the sidebar"
```

---

## Desired State

### User Flow
```
User clicks project in sidebar
        ↓
Project overview appears immediately
        ↓
User sees:
  ├─ Project name, genre, format
  ├─ Statistics (chapters, words, tokens)
  ├─ Token distribution
  ├─ Project description
  ├─ Token preview grid
  └─ Quick action buttons
```

### Visual Hierarchy
```
┌─────────────────────────────────────────────────────┐
│ 📁 Project Title    │ Genre: Fantasy | Novel        │
├─────────────────────────────────────────────────────┤
│ 📊 Stats: 25 Chapters | 15,240 Words | 42 Tokens   │
├─────────────────────────────────────────────────────┤
│ 🏷️  Tokens: Chars(12) Locs(8) Objects(15) Events(7)│
├─────────────────────────────────────────────────────┤
│ ✍️  Description: [Edit]                             │
│    "This is an epic story about..."                 │
├─────────────────────────────────────────────────────┤
│ 🔤 Related Tokens (8 previews)                      │
│    [Card] [Card] [Card]                             │
│    [Card] [Card] [Card]                             │
│    [Card] [Card]                                    │
├─────────────────────────────────────────────────────┤
│ [+ Chapter] [+ Token] [Export] [Settings]           │
└─────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Phase 1: Backend Development (30 mins)

#### 1.1 Add Query: `getProjectOverview`

**Location:** `convex/projects.ts`

**Purpose:** Fetch all project data for the overview in a single, optimized query.

**Implementation:**
```typescript
export const getProjectOverview = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    // 1. Get project
    const project = await ctx.db.get(args.projectId);
    
    // 2. Count documents & calculate words
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_project", q => q.eq("projectId", args.projectId))
      .collect();
    
    const documentCount = documents.length;
    const wordCount = documents.reduce((sum, doc) => {
      return sum + (doc.content?.split(/\s+/).length || 0);
    }, 0);
    
    // 3. Get tokens & analyze
    const tokens = await ctx.db
      .query("tokens")
      .withIndex("by_project", q => q.eq("projectId", args.projectId))
      .collect();
    
    const tokenCount = tokens.length;
    const tokensByType = {};
    tokens.forEach(token => {
      tokensByType[token.type] = (tokensByType[token.type] || 0) + 1;
    });
    
    // 4. Get top 8 tokens for preview
    const previewTokens = tokens.slice(0, 8);
    
    return {
      project,
      stats: {
        documentCount,
        wordCount,
        tokenCount,
        tokensByType
      },
      tokens: previewTokens
    };
  }
});
```

#### 1.2 Add Mutation: `updateProjectDescription`

**Location:** `convex/projects.ts`

**Purpose:** Update project description when user saves edits.

**Implementation:**
```typescript
export const updateProjectDescription = mutation({
  args: {
    projectId: v.id("projects"),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.projectId, {
      metadata: {
        wordCount: (await ctx.db.get(args.projectId)).metadata?.wordCount,
        chapterCount: (await ctx.db.get(args.projectId)).metadata?.chapterCount,
        description: args.description,
      },
      updatedAt: Date.now(),
    });
  },
});
```

---

### Phase 2: Component Development (60 mins)

#### 2.1 Create `ProjectOverview.tsx` (Main Component)

**Location:** `src/components/ProjectOverview.tsx`

**Structure:**
```typescript
interface ProjectOverviewProps {
  projectId: Id<"projects">;
  onAddDocument?: () => void;
  onAddToken?: () => void;
  onEdit?: () => void;
}

export function ProjectOverview({ projectId, onAddDocument, onAddToken, onEdit }: ProjectOverviewProps) {
  // Queries
  const overviewData = useQuery(api.projects.getProjectOverview, { projectId });
  
  // State
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  
  // Mutations
  const updateDescription = useMutation(api.projects.updateProjectDescription);
  
  // Handlers
  const handleSaveDescription = async () => { /* ... */ };
  const handleCancelEdit = () => { /* ... */ };
  
  // Loading
  if (overviewData.isLoading) return <ProjectOverviewSkeleton />;
  
  // Error
  if (overviewData.error) return <ErrorState />;
  
  // Render
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      {/* Statistics */}
      {/* Description */}
      {/* Token Preview */}
      {/* Actions */}
    </div>
  );
}
```

#### 2.2 Create `ProjectStatCard.tsx` (Optional Sub-component)

**Location:** `src/components/ProjectStatCard.tsx`

**Purpose:** Reusable stat display component.

```typescript
interface ProjectStatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

export function ProjectStatCard({ label, value, icon }: ProjectStatCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
```

#### 2.3 Create `TokenPreviewCard.tsx` (Token Display)

**Location:** `src/components/TokenPreviewCard.tsx`

**Purpose:** Display individual token preview.

```typescript
interface TokenPreviewCardProps {
  token: Token;
}

export function TokenPreviewCard({ token }: TokenPreviewCardProps) {
  const getTypeIcon = (type: string) => { /* ... */ };
  
  return (
    <div className="bg-card rounded-lg p-3 space-y-2 hover:bg-card/80 cursor-pointer transition">
      <div className="flex items-center gap-2">
        {getTypeIcon(token.type)}
        <span className="text-xs text-muted-foreground uppercase">{token.type}</span>
      </div>
      <div className="font-medium text-sm truncate">{token.name}</div>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {token.description}
      </p>
    </div>
  );
}
```

---

### Phase 3: Integration (30 mins)

#### 3.1 Update `Index.tsx`

**Changes:**
1. Render `ProjectOverview` when `selectedProjectId` is set
2. Remove "Select a project" placeholder
3. Pass callbacks to ProjectOverview

**Before:**
```tsx
const activeView === "projects" && (
  <div className="flex items-center justify-center h-full">
    <p>Select a project from the sidebar</p>
  </div>
)
```

**After:**
```tsx
selectedProjectId && (
  <ProjectOverview 
    projectId={selectedProjectId}
    onAddDocument={() => { /* handle add doc */ }}
    onAddToken={() => { /* handle add token */ }}
    onEdit={() => { /* handle edit */ }}
  />
)

!selectedProjectId && (
  <div className="flex items-center justify-center h-full">
    <p>Select a project from the sidebar</p>
  </div>
)
```

#### 3.2 Verify `ProjectManager.tsx`

**Check:**
- Ensure `onProjectSelect` callback is properly called
- Add visual indication of selected project
- Test project selection flow

---

### Phase 4: Enhancements (30 mins)

#### 4.1 Inline Description Editing

**Features:**
- Click [Edit] button to enter edit mode
- Show textarea with character count
- Save/Cancel buttons
- Auto-save or manual save option

#### 4.2 Action Button Handlers

**Features:**
- [+ Add Chapter] → Open document creation dialog
- [+ Add Token] → Open token creation dialog
- [Export] → Open export menu
- [Settings] → Open project settings

---

## Technical Details

### Data Structure

**Backend Return:**
```typescript
{
  project: {
    _id: Id<"projects">,
    userId: string,
    title: string,
    genre: string,
    format: string,
    createdAt: number,
    updatedAt: number,
    metadata: {
      wordCount: number,
      chapterCount: number,
      description: string,
    }
  },
  stats: {
    documentCount: number,
    wordCount: number,
    tokenCount: number,
    tokensByType: {
      character: 12,
      location: 8,
      object: 15,
      event: 7,
      ...
    }
  },
  tokens: Token[] // array of up to 8 tokens
}
```

### Component Props

**ProjectOverview:**
```typescript
interface ProjectOverviewProps {
  projectId: Id<"projects">;
  onAddDocument?: () => void;
  onAddToken?: () => void;
  onEdit?: () => void;
}
```

**ProjectStatCard:**
```typescript
interface ProjectStatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}
```

**TokenPreviewCard:**
```typescript
interface TokenPreviewCardProps {
  token: Token;
}
```

---

## Development Timeline

| Phase | Task | Duration | Cumulative |
|-------|------|----------|-----------|
| 1 | Backend: getProjectOverview | 15 min | 15 min |
| 1 | Backend: updateProjectDescription | 15 min | 30 min |
| 2 | Component: ProjectOverview | 30 min | 60 min |
| 2 | Component: ProjectStatCard | 15 min | 75 min |
| 2 | Component: TokenPreviewCard | 15 min | 90 min |
| 3 | Integration: Index.tsx | 15 min | 105 min |
| 3 | Integration: ProjectManager.tsx | 15 min | 120 min |
| 4 | Enhancement: Description editing | 20 min | 140 min |
| 4 | Enhancement: Action handlers | 10 min | 150 min |
| - | Testing & Polish | 30 min | 180 min |

**Total Estimated Time: ~3 hours (180 minutes)**

---

## Success Criteria

### Functional Requirements ✅
- [ ] Project overview displays when project is selected
- [ ] Statistics are accurate (doc count, word count, token count)
- [ ] Token distribution breakdown shows all token types
- [ ] Description is displayed and editable
- [ ] Token preview grid shows 8 tokens (or fewer if less exist)
- [ ] All action buttons are clickable and trigger callbacks

### Non-Functional Requirements ✅
- [ ] Load time < 1 second for average project
- [ ] No layout shift during data loading (skeleton loaders used)
- [ ] Smooth transitions between loading/loaded states
- [ ] Error states handled gracefully
- [ ] Responsive design (desktop first)

### UI/UX Requirements ✅
- [ ] Follows existing design system colors and spacing
- [ ] Icons are consistent with codebase
- [ ] Typography matches design system
- [ ] Hover states work on interactive elements
- [ ] Empty states show helpful messages
- [ ] Loading states show appropriate skeletons

### Code Quality ✅
- [ ] TypeScript types are correct
- [ ] Components are reusable and modular
- [ ] Code follows project conventions
- [ ] No console errors or warnings
- [ ] Comments explain complex logic

---

## Files to Create

| File | Type | Purpose |
|------|------|---------|
| `src/components/ProjectOverview.tsx` | Component | Main overview panel |
| `src/components/ProjectStatCard.tsx` | Component | Stat display card |
| `src/components/TokenPreviewCard.tsx` | Component | Token preview card |

**Total New Files: 3**

---

## Files to Modify

| File | Type | Changes |
|------|------|---------|
| `convex/projects.ts` | Backend | Add 2 functions |
| `src/pages/Index.tsx` | Frontend | Update rendering logic |
| `src/components/ProjectManager.tsx` | Frontend | Minor tweaks (optional) |

**Total Modified Files: 2-3**

---

## Dependencies

- React hooks (useState, useQuery, useMutation)
- Convex API client
- Lucide React icons
- Shadcn UI components (already present)
- Tailwind CSS (already configured)

**No new dependencies needed! ✅**

---

## Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Large projects slow to load | Low | Medium | Implement pagination, lazy loading for tokens |
| Word count calculation incorrect | Medium | Low | Add tests, verify calculation logic |
| UI doesn't match design system | Low | Medium | Use existing components, follow color vars |
| Performance issues with queries | Low | Medium | Add indexes to database, optimize queries |

---

## Next Steps

### Ready to Build?

1. **Start with Phase 1** → Create backend queries
2. **Then Phase 2** → Build React components
3. **Then Phase 3** → Integrate everything
4. **Then Phase 4** → Polish and enhance

### Questions Before Starting?

- Should description be auto-saved or manually saved?
- Should token preview be clickable to view full details?
- Should statistics update in real-time?
- Any additional stats to display?

---

## Document References

- **Full Plan:** `PROJECT_OVERVIEW_PLAN.md`
- **Quick Reference:** `PROJECT_OVERVIEW_QUICK_REF.md`
- **Architecture:** `PROJECT_OVERVIEW_ARCHITECTURE.md`
- **This Summary:** `PROJECT_OVERVIEW_SUMMARY.md`

