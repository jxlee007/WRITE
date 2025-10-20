# Project Overview Feature - Architecture Diagram

## Component Tree

```
Index (State Manager)
├── selectedProjectId: Id<"projects"> | null
├── setSelectedProjectId: (id) => void
│
└─── RENDER LOGIC (based on activeView/selectedProjectId)
     │
     ├─ IF selectedProjectId === null
     │  └─ Show: "Select a project from the sidebar" (placeholder)
     │
     └─ IF selectedProjectId !== null
        └─ Render: <ProjectOverview projectId={selectedProjectId} />
            │
            ├─ useQuery(api.projects.getProjectOverview, { projectId })
            │
            └─ JSX Structure:
                ├─ ProjectHeader
                │  ├─ Title
                │  ├─ Genre + Format
                │  └─ Last Updated
                │
                ├─ StatisticsSection
                │  ├─ <ProjectStatCard label="Chapters" value={25} icon={BookOpen} />
                │  ├─ <ProjectStatCard label="Words" value={15240} icon={FileText} />
                │  └─ <ProjectStatCard label="Tokens" value={42} icon={Tag} />
                │
                ├─ TokenBreakdownSection
                │  ├─ Characters: 12
                │  ├─ Locations: 8
                │  ├─ Objects: 15
                │  └─ Events: 7
                │
                ├─ DescriptionSection
                │  ├─ IF editing === false
                │  │  ├─ Display description text
                │  │  └─ [✏️ Edit] button
                │  │
                │  └─ IF editing === true
                │     ├─ <textarea> with description
                │     ├─ [💾 Save] button
                │     └─ [❌ Cancel] button
                │
                ├─ TokenPreviewGrid (3 columns)
                │  ├─ <TokenPreviewCard token={tokens[0]} />
                │  ├─ <TokenPreviewCard token={tokens[1]} />
                │  ├─ <TokenPreviewCard token={tokens[2]} />
                │  ├─ <TokenPreviewCard token={tokens[3]} />
                │  ├─ <TokenPreviewCard token={tokens[4]} />
                │  ├─ <TokenPreviewCard token={tokens[5]} />
                │  ├─ <TokenPreviewCard token={tokens[6]} />
                │  └─ <TokenPreviewCard token={tokens[7]} />
                │
                └─ ActionButtonsSection
                   ├─ [+ Add Chapter] → onAddDocument()
                   ├─ [+ Add Token] → onAddToken()
                   ├─ [📤 Export] → onExport()
                   └─ [⚙️ Settings] → onEdit()
```

## Data Flow Diagram

```
USER INTERACTION
       ↓
ProjectManager.tsx
  {projects?.map(project =>
    <ProjectItem
      onClick={() => onProjectSelect(project._id)}
    />
  )}
       ↓
Index.tsx
  setSelectedProjectId(projectId)
       ↓
React Re-render (selectedProjectId changed)
       ↓
ProjectOverview Mounts
  projectId = props.projectId
       ↓
useQuery(api.projects.getProjectOverview, { projectId })
       ↓ (Convex Backend)
Backend Query Executes
  1. ctx.db.get(projectId) → Project object
  2. Query documents by project → Count + calculate word count
  3. Query tokens by project → Get all tokens
  4. Group tokens by type → TokensByType stats
  5. Sort tokens, take first 8 → For preview
       ↓
Returns: {
  project,
  stats: { documentCount, wordCount, tokenCount, tokensByType },
  tokens: Token[]
}
       ↓
Frontend Receives Data
       ↓
ProjectOverview Renders Components
       ↓
Display to User
```

## State Management Flow

```
Index.tsx (Main App State)
├─ activeView: string
├─ selectedProjectId: Id<"projects"> | null
├─ selectedDocumentId: Id<"documents"> | null
├─ isSidebarOpen: boolean
└─ ... other states

  ↓ Pass Down

ProjectManager (Left Sidebar)
├─ Receives: userId, onProjectSelect
├─ State: projects list
└─ Callbacks: onProjectSelect(projectId)

  ↓ Pass Down

ProjectOverview (Main Content)
├─ Receives: projectId
├─ Queries: getProjectOverview
├─ State: isEditing, description
└─ Callbacks: onSaveDescription, onAddDocument, etc.
```

## Backend Query Structure

```
convex/projects.ts

getProjectOverview(projectId)
  ├─ Input: { projectId }
  │
  ├─ Fetch Project
  │  └─ project = ctx.db.get(projectId)
  │
  ├─ Count Documents
  │  ├─ documents = query("documents")
  │  │              .withIndex("by_project")
  │  │              .collect()
  │  ├─ documentCount = documents.length
  │  └─ wordCount = sum(documents.map(d => countWords(d.content)))
  │
  ├─ Analyze Tokens
  │  ├─ tokens = query("tokens")
  │  │            .withIndex("by_project")
  │  │            .collect()
  │  ├─ tokenCount = tokens.length
  │  ├─ tokensByType = {
  │  │    "character": count,
  │  │    "location": count,
  │  │    ...
  │  │  }
  │  └─ topTokens = tokens.slice(0, 8)
  │
  └─ Return: {
      project: {...},
      stats: {
        documentCount,
        wordCount,
        tokenCount,
        tokensByType
      },
      tokens: topTokens[]
    }
```

## UI Rendering Conditions

```
Index.tsx Main Content Area Logic:

IF selectedProjectId === null
  RENDER: <EmptyState />
    └─ Display: "Select a project from the sidebar"
    └─ Icon: Folder icon
    └─ Helpful text

ELSE IF selectedProjectId !== null AND isLoading
  RENDER: <Skeleton />
    └─ Display: Loading skeletons for all cards
    └─ Pulse animation

ELSE IF selectedProjectId !== null AND error
  RENDER: <ErrorState />
    └─ Display: Error message
    └─ Button: Retry

ELSE IF selectedProjectId !== null AND data
  RENDER: <ProjectOverview data={data} />
    └─ Full overview panel with all sections
```

## Component Hierarchy

```
ProjectOverview.tsx (MAIN)
├── ProjectOverviewHeader
│   ├─ Title
│   ├─ Metadata (Genre, Format, Updated)
│   └─ Menu/Actions dropdown
│
├── ProjectStatisticsSection
│   ├─ ProjectStatCard (x3)
│   │  ├─ Icon
│   │  ├─ Label
│   │  └─ Value
│   │
│   └─ TokenTypeBreakdown
│      └─ Pills showing: Characters: 12, Locations: 8, etc.
│
├── ProjectDescriptionSection
│   ├─ IF !isEditing
│   │  ├─ Description text (limited to 3 lines)
│   │  └─ "Read more / Edit" button
│   │
│   └─ IF isEditing
│      ├─ Textarea
│      ├─ Character count
│      └─ Action buttons (Save/Cancel)
│
├── TokenPreviewSection
│   ├─ Section title: "Related Tokens (8 of X)"
│   └─ TokenGrid (3 columns, 8 items)
│      └─ TokenPreviewCard (x8)
│         ├─ Type icon
│         ├─ Name
│         ├─ Type label
│         └─ Hover: preview description
│
└── ActionButtonsSection
    ├─ Primary buttons in row
    ├─ [+ Add Chapter]
    ├─ [+ Add Token]
    ├─ [📤 Export]
    └─ [⚙️ Settings]
```

## Error Handling Flow

```
getProjectOverview Query

TRY
  ├─ Get project
  │  └─ IF not found → throw error "Project not found"
  │
  ├─ Get documents
  │  └─ Catch: continue with 0 documents
  │
  └─ Get tokens
     └─ Catch: continue with empty tokens

CATCH (error)
  ├─ Log error
  └─ Throw meaningful error message

Frontend Error Handling
  ├─ IF query.isLoading → show skeleton
  ├─ IF query.error → show error state
  └─ IF query.data → show data

User sees:
  ├─ Loading → "Loading project details..."
  ├─ Error → "Failed to load project. [Retry]"
  └─ Success → Full overview
```

## Summary of Interactions

```
USER CLICKS PROJECT
    ↓
onProjectSelect() callback
    ↓
setSelectedProjectId(projectId)
    ↓
Index re-renders
    ↓
ProjectOverview mounts
    ↓
useQuery fetches from backend
    ↓
Backend aggregates:
  - Project metadata
  - Document statistics
  - Token statistics
    ↓
Data returned to frontend
    ↓
ProjectOverview renders:
  - Header
  - Statistics cards
  - Description
  - Token preview grid
  - Action buttons
    ↓
USER SEES PROJECT OVERVIEW
    ↓
USER INTERACTIONS:
  - Click [Edit Description] → inline editor
  - Click [+ Add Chapter] → trigger document creation
  - Click [+ Add Token] → trigger token creation
  - Hover token card → show full description
```

