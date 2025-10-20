# 🗂️ Project Overview - Data & Schema Reference

## Database Schema Map

```
┌─────────────────────────────────────────────────────────────────┐
│                      PROJECTS TABLE                             │
├─────────────────────────────────────────────────────────────────┤
│ _id: Id<"projects">                                             │
│ userId: string                                                  │
│ title: string          ← ← ← Displayed in header               │
│ genre: string          ← ← ← Displayed in header               │
│ format: string         ← ← ← Displayed in header (novel/etc)   │
│ createdAt: number                                               │
│ updatedAt: number      ← ← ← Show "Updated: X ago"             │
│ metadata: {                                                     │
│   wordCount?: number   ← ← ← Display in stat card              │
│   chapterCount?: number                                         │
│   description?: string ← ← ← Display in description section    │
│ }                                                               │
└─────────────────────────────────────────────────────────────────┘
         │                          │                    │
         │ (one-to-many)            │                    │
         │                          ▼                    │
         │                  ┌──────────────────┐        │
         │                  │  DOCUMENTS       │        │
         │                  │  TABLE           │        │
         │                  ├──────────────────┤        │
         │                  │ projectId (FK)───┼────────┼── Links back
         │                  │ content: string  │        │
         │                  │ (rich text)      │        │
         │                  └──────────────────┘        │
         │                  Count: documentCount        │
         │                  WordCount: sum of words     │
         │                                              │
         │ (one-to-many)                                │
         └──────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   TOKENS         │
                    │   TABLE          │
                    ├──────────────────┤
                    │ projectId (FK)───┼── Links to project
                    │ type: string     │
                    │ (character,      │
                    │  location,       │
                    │  object, etc)    │
                    │ name: string     │
                    │ description: str │
                    └──────────────────┘
                    Count: tokenCount
                    GroupBy: type
```

## Data Flow: User Click → Display

```
STEP 1: USER ACTION
┌─────────────────────┐
│ User clicks project │
│ in ProjectManager   │
└────────────┬────────┘
             │
             ▼
┌──────────────────────────────────────┐
│ onProjectSelect(projectId) triggered │
│ → setSelectedProjectId(projectId)    │
└────────────┬───────────────────────────┘
             │
             ▼
STEP 2: COMPONENT RENDER
┌──────────────────────────────────────┐
│ Index.tsx detects selectedProjectId  │
│ → Renders <ProjectOverview />        │
└────────────┬───────────────────────────┘
             │
             ▼
STEP 3: DATA FETCH
┌──────────────────────────────────────────────────┐
│ useQuery(api.projects.getProjectOverview, ...)   │
│ Sends: { projectId: "..." }                      │
└────────────┬─────────────────────────────────────┘
             │
             ▼
STEP 4: BACKEND AGGREGATION
┌─────────────────────────────────────────────────┐
│ Convex Query Handler (getProjectOverview)       │
│                                                 │
│ 1. Get project by ID                           │
│    → ctx.db.get(projectId)                     │
│                                                 │
│ 2. Count documents                             │
│    → query("documents").filter(...).collect()  │
│    → documentCount = length                    │
│    → wordCount = sum(words in each doc)        │
│                                                 │
│ 3. Get tokens                                  │
│    → query("tokens").filter(...).collect()     │
│    → tokenCount = length                       │
│    → Group by type: {character: 12, ...}       │
│                                                 │
│ 4. Assemble response                           │
│    → {                                         │
│         project: {...},                        │
│         stats: {docCount, wordCount, ...},     │
│         tokens: [...8 tokens]                  │
│       }                                        │
└────────────┬─────────────────────────────────────┘
             │
             ▼
STEP 5: FRONTEND RENDER
┌──────────────────────────────────────────┐
│ ProjectOverview receives data from query │
│                                          │
│ Renders:                                │
│ ├─ ProjectHeader                        │
│ │  ├─ title                            │
│ │  ├─ genre                            │
│ │  └─ format                           │
│ │                                      │
│ ├─ ProjectStatCard                     │
│ │  ├─ documentCount                    │
│ │  ├─ wordCount                        │
│ │  └─ tokenCount                       │
│ │                                      │
│ ├─ TokenTypeBreakdown                  │
│ │  ├─ Characters: 12                   │
│ │  ├─ Locations: 8                     │
│ │  └─ ...                              │
│ │                                      │
│ ├─ DescriptionSection                  │
│ │  └─ metadata.description text        │
│ │                                      │
│ ├─ TokenPreviewGrid                    │
│ │  └─ 8 TokenPreviewCards              │
│ │                                      │
│ └─ ActionButtons                       │
│    ├─ Add Document                     │
│    ├─ Add Token                        │
│    ├─ Export                           │
│    └─ Settings                         │
└──────────────────────────────────────────┘
             │
             ▼
STEP 6: USER SEES
┌───────────────────────────────────────┐
│  🎉 BEAUTIFUL PROJECT OVERVIEW! 🎉    │
│                                       │
│  ✅ All data displayed correctly      │
│  ✅ Real-time statistics              │
│  ✅ Token preview visible             │
│  ✅ Ready for user interactions       │
└───────────────────────────────────────┘
```

## Mutation Flow: Edit Description

```
USER ACTION
┌──────────────────────────────┐
│ User clicks [✏️ Edit] button  │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ setIsEditingDescription(true)     │
│ setEditedDescription(current)     │
│ Show textarea                     │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ User types new description       │
│ updateEditedDescription()         │
│ [Save] button enabled             │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ User clicks [💾 Save]                │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ handleSaveDescription()                      │
│ Call: updateProjectDescription({             │
│   projectId,                                 │
│   description: editedDescription             │
│ })                                           │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ BACKEND MUTATION EXECUTES                    │
│                                              │
│ 1. Get current project                      │
│    const project = ctx.db.get(projectId)    │
│                                              │
│ 2. Patch metadata                           │
│    ctx.db.patch(projectId, {                │
│      metadata: {                            │
│        wordCount: existing,                 │
│        chapterCount: existing,              │
│        description: NEW_DESCRIPTION  ← ✏️  │
│      },                                     │
│      updatedAt: Date.now()                  │
│    })                                       │
│                                              │
│ 3. Return updated project                   │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ FRONTEND RESPONSE HANDLING                   │
│                                              │
│ ✅ On Success:                               │
│    ├─ Close edit mode                       │
│    ├─ Update display with new description   │
│    ├─ Show success toast                    │
│    └─ Re-fetch overview query (auto)        │
│                                              │
│ ❌ On Error:                                 │
│    ├─ Show error message                    │
│    ├─ Keep edit mode open                   │
│    └─ Allow user to retry                   │
└──────────────────────────────────────────────┘
```

## Data Aggregation: Word Count Calculation

```
DOCUMENTS WITH CONTENT:

Doc 1: "The hero began..." (142 words)
Doc 2: "Chapter two continued..." (287 words)
Doc 3: "The final battle..." (156 words)
...
Doc 25: "The End." (2 words)

CALCULATION:
┌─────────────────────────────────────────────────┐
│ Total Word Count = Sum of all document words    │
│                                                 │
│ documents.forEach(doc => {                      │
│   wordCount += doc.content.split(/\s+/).length  │
│ })                                              │
│                                                 │
│ Example:                                        │
│   142 + 287 + 156 + ... + 2 = 15,240           │
│                                                 │
│ Display: "15,240 Words"                         │
└─────────────────────────────────────────────────┘
```

## Data Aggregation: Token Type Breakdown

```
TOKENS IN DATABASE:

Character: Aragorn
Character: Legolas
Character: Gimli
... (12 total)

Location: Rivendell
Location: Mordor
Location: Moria
... (8 total)

Object: Excalibur
Object: Shield
... (15 total)

Event: Council of Elrond
Event: Fall of Sauron
... (7 total)

AGGREGATION:
┌──────────────────────────────────────────────┐
│ tokens.forEach(token => {                    │
│   if (tokensByType[token.type]) {            │
│     tokensByType[token.type]++               │
│   } else {                                   │
│     tokensByType[token.type] = 1             │
│   }                                          │
│ })                                           │
│                                              │
│ Result: {                                    │
│   "character": 12,      ← ← Displayed as    │
│   "location": 8,        ← ← Characters: 12  │
│   "object": 15,         ← ← Locations: 8    │
│   "event": 7            ← ← Objects: 15     │
│ }                                            │
└──────────────────────────────────────────────┘
```

## Component Data Dependencies

```
ProjectOverview
├─ Depends on: overviewData.project
│  └─ Used in: ProjectHeader (title, genre, format)
│
├─ Depends on: overviewData.stats.documentCount
│  └─ Used in: ProjectStatCard (display "25")
│
├─ Depends on: overviewData.stats.wordCount
│  └─ Used in: ProjectStatCard (display "15,240")
│
├─ Depends on: overviewData.stats.tokenCount
│  └─ Used in: ProjectStatCard (display "42")
│
├─ Depends on: overviewData.stats.tokensByType
│  └─ Used in: TokenTypeBreakdown (display "Characters: 12, ...")
│
├─ Depends on: overviewData.project.metadata.description
│  └─ Used in: DescriptionSection (display description)
│
└─ Depends on: overviewData.tokens (array of 8 tokens)
   └─ Used in: TokenPreviewGrid
      └─ maps to: TokenPreviewCard (x8)
         └─ Each displays: token.type, token.name, token.description
```

## State Management: Description Editing

```
ProjectOverview Component State:

┌─────────────────────────────────────┐
│ State Variables                     │
├─────────────────────────────────────┤
│                                     │
│ isEditingDescription: boolean       │
│ └─ Controls when to show editor     │
│                                     │
│ editedDescription: string           │
│ └─ Holds temporary edited text      │
│                                     │
│ originalDescription: string         │
│ └─ Used for cancel action           │
│                                     │
│ isLoading: boolean                  │
│ └─ Mutation loading state           │
│                                     │
│ error: Error | null                 │
│ └─ Mutation error state             │
│                                     │
└─────────────────────────────────────┘

STATE TRANSITIONS:

Normal View
├─ isEditingDescription = false
├─ Show description text
├─ [✏️ Edit] button visible
└─ Read-only display

        ↓ [Edit] clicked

Edit Mode
├─ isEditingDescription = true
├─ Show textarea with text
├─ [💾 Save] button visible
├─ [❌ Cancel] button visible
└─ User can type

        ↓ [Save] clicked

Saving
├─ isEditingDescription = true (still)
├─ isLoading = true
├─ Buttons disabled
└─ Show spinner

        ↓ Save completes

Back to Normal
├─ isEditingDescription = false
├─ Show NEW description
├─ isLoading = false
└─ [✏️ Edit] button visible again

OR if [Cancel] clicked:

Back to Normal (unchanged)
├─ isEditingDescription = false
├─ Description reverts to original
├─ editedDescription cleared
└─ No database changes
```

## Query Performance Optimization

```
PROBLEM: How to efficiently fetch all project data?

SOLUTION: Single aggregating query

BENEFITS:
├─ 1 round trip to backend (not 5+)
├─ All data fetched in parallel
├─ Calculated on backend (faster)
├─ Optimized database queries with indexes
└─ Real-time data consistency

QUERY EXECUTION:

ctx.db.get(projectId)           → O(1) indexed lookup
    ↓
ctx.db.query("documents")
   .withIndex("by_project", q => q.eq("projectId", projectId))
   .collect()                    → O(n) indexed scan
    ↓
Word count calculation           → O(n) (where n = words)
    ↓
ctx.db.query("tokens")
   .withIndex("by_project", q => q.eq("projectId", projectId))
   .collect()                    → O(m) indexed scan
    ↓
Token grouping                   → O(m) grouping
    ↓
Return all data to client        → Single response
```

## Error Handling: State Diagram

```
QUERY STATE TRANSITIONS:

Initial
├─ isLoading = true
├─ data = null
├─ error = null
└─ Show: Loading skeleton

        ↓

Success (data received)
├─ isLoading = false
├─ data = {...}
├─ error = null
└─ Show: Full overview

        ↓ or

Error (query failed)
├─ isLoading = false
├─ data = null
├─ error = Error object
└─ Show: Error state with retry

        ↓ [Retry clicked]

Back to Initial (retry)
└─ Process repeats...

MUTATION STATE TRANSITIONS (for description update):

Idle
├─ isPending = false
├─ error = null
└─ [Save] button clickable

        ↓ [Save] clicked

Pending
├─ isPending = true
├─ error = null
└─ [Save] button disabled, show spinner

        ↓

Success
├─ isPending = false
├─ error = null
├─ Show success toast
└─ Close editor

        ↓ or

Error
├─ isPending = false
├─ error = Error object
├─ Show error message
└─ Keep editor open for retry
```

## Summary: Data Properties Reference

```
PROJECT OVERVIEW DATA STRUCTURE:

{
  // Project Info
  project: {
    _id: string (projectId)
    title: string ("My Epic Novel")
    genre: string ("Fantasy")
    format: string ("novel")
    createdAt: number (timestamp)
    updatedAt: number (timestamp)
    metadata: {
      wordCount: number (15240)
      chapterCount: number (25)
      description: string ("Long story...")
    }
  },
  
  // Calculated Statistics
  stats: {
    documentCount: number (25)
    wordCount: number (15240)
    tokenCount: number (42)
    tokensByType: {
      character: number (12)
      location: number (8)
      object: number (15)
      event: number (7)
    }
  },
  
  // Token Preview
  tokens: [
    {
      _id: string
      name: string ("Aragorn")
      type: string ("character")
      description: string ("The ranger...")
      projectId: string
      createdAt: number
      updatedAt: number
      ...other fields
    },
    ...more tokens (up to 8)
  ]
}
```

