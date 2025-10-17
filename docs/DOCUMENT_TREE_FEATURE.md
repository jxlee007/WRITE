# Document Tree Navigation Feature

## Overview
Implemented a complete document tree navigation sidebar for the Creative Writing Studio. Writers can now create, organize, and navigate between multiple chapters/scenes within a project. The sidebar provides a hierarchical view of all documents with drag-and-drop reordering, CRUD operations, and real-time word count tracking.

## Features Implemented

### 1. Document Tree Sidebar
- **Location**: Appears on the left side when "Writing" view is active
- **Width**: 264px fixed width with border separation
- **Structure**: Collapsible "Chapters" folder containing all documents
- **Empty State**: Helpful message when no documents exist with create prompt

### 2. Document CRUD Operations

#### Create Document
- **Trigger**: Click "+" button in sidebar header
- **Dialog**: Modal with title input field
- **Auto-naming**: Suggests format like "Chapter 1: The Beginning"
- **Auto-selection**: Newly created document is automatically selected
- **Order**: New documents are added at the end of the list

#### Rename Document
- **Trigger**: Click edit icon (pencil) on document hover
- **Dialog**: Modal with pre-filled current title
- **Validation**: Prevents empty titles
- **Real-time Update**: Document list updates immediately

#### Delete Document
- **Trigger**: Click delete icon (trash) on document hover
- **Confirmation**: Alert dialog with warning about permanent deletion
- **Cascade**: Automatically deletes all token usages within the document
- **Smart Selection**: If deleted doc was selected, auto-selects next available document
- **Project Update**: Decrements project's chapter count

### 3. Drag-and-Drop Reordering
- **Visual Feedback**: Drag handle icon appears on hover
- **Ghost Effect**: Dragged document becomes semi-transparent
- **Drop Target**: Any other document in the list
- **Persistence**: Order saved to database immediately
- **Field**: Uses `documentOrder` number field for sorting

### 4. Document Selection
- **Visual State**: Selected document has highlighted background (#37373d)
- **Auto-load**: Document content loads in WritingEditor when selected
- **Persistence**: Selection state maintained across view changes
- **Click Handling**: Entire document card is clickable

### 5. Document Metadata Display
- **Word Count**: Real-time word count shown under each document title
- **Format**: "XXX words" in muted text
- **Calculation**: Strips HTML tags and counts actual words
- **Update**: Recalculates when document content changes

### 6. Collapsible Folder
- **Default State**: Expanded to show all documents
- **Toggle**: Click folder header to collapse/expand
- **Icons**: Chevron-down when expanded, chevron-right when collapsed
- **Count Badge**: Shows total number of documents in folder

## Technical Implementation

### Files Created

#### `src/components/DocumentTree.tsx` (NEW)
Complete sidebar component with:
- Document list rendering with sort by `documentOrder`
- Create/Rename/Delete dialogs with validation
- Drag-and-drop event handlers
- Word count calculation from HTML content
- Folder collapse/expand state management
- Empty state and loading states

### Files Modified

#### `src/pages/Index.tsx`
- Added `DocumentTree` import
- Added `useQuery` for current document loading
- Added `useMutation` for document updates
- Added `handleDocumentSelect` callback
- Updated `handleSaveDocument` to use Convex mutation
- Conditional rendering: show DocumentTree when writing view active
- Document content loading with loading state

#### `convex/documents.ts`
Already had all needed mutations:
- `getDocuments`: Fetch all documents for a project (sorted by order)
- `getDocument`: Fetch single document by ID
- `createDocument`: Create new document with auto-incrementing order
- `updateDocument`: Update title, content, or order
- `deleteDocument`: Delete document with cascade to token usages

### Key Dependencies
- **Convex React**: `useQuery`, `useMutation` for real-time data
- **Lucide Icons**: FileText, Plus, Trash2, Edit2, GripVertical, ChevronRight, ChevronDown
- **shadcn/ui**: Dialog, AlertDialog, ScrollArea, Button, Input, Label
- **HTML5 Drag-and-Drop API**: Native browser DnD events

## User Workflow

### Creating Your First Document
1. Select a project from Projects view
2. System switches to Writing view automatically
3. DocumentTree sidebar appears (empty)
4. Click "+" button in sidebar header
5. Enter document title (e.g., "Chapter 1")
6. Press Enter or click Create
7. Document appears in tree and opens in editor

### Writing Workflow
```
1. Create multiple documents (chapters/scenes)
2. Click any document to switch between them
3. Content auto-saves every 30 seconds
4. Word count updates in real-time in sidebar
5. Drag documents to reorder chapters
6. Rename documents as story evolves
7. Delete unused documents
```

### Multi-Document Project Example
```
Documents Sidebar:
📂 Chapters (5)
  ├─ 📄 Prologue (234 words)
  ├─ 📄 Chapter 1: The Awakening (1,247 words) ← Selected
  ├─ 📄 Chapter 2: First Steps (892 words)
  ├─ 📄 Chapter 3: The Discovery (0 words)
  └─ 📄 Epilogue (156 words)
```

## Integration with Other Features

### Token Mentions
- When you mention a token in a document (e.g., `@John Smith`)
- System tracks which tokens are used in which documents
- DocumentTree provides navigation context for token usage tracking

### AI Generator
- Can generate images for specific scenes/chapters
- Document context helps AI understand story progression
- Token usage in documents provides relationship data

### Project Manager
- Project's `chapterCount` metadata auto-updates
- Document count shown in project cards
- Chapter count used for project statistics

## UI/UX Details

### Hover Interactions
- **Document Cards**: Background changes to #2a2d2e
- **Edit/Delete Buttons**: Opacity transitions from 0 to 100%
- **Drag Handle**: GripVertical icon fades in on hover

### Visual Hierarchy
```
Header Bar: #252526 background
├─ "Documents" title (white, semibold)
└─ "+" button (ghost variant)

Document List: Scrollable area
├─ Folder Header: Collapsible
│   ├─ Chevron icon (expand/collapse)
│   ├─ FileText icon
│   ├─ "Chapters" label
│   └─ Count badge
└─ Document Items: Draggable cards
    ├─ Drag handle (hover only)
    ├─ FileText icon
    ├─ Title + word count
    └─ Edit/Delete buttons (hover only)
```

### Color Scheme
- **Background**: #252526 (VS Code sidebar dark)
- **Selected**: #37373d (VS Code selection)
- **Hover**: #2a2d2e (VS Code hover)
- **Border**: border-border (subtle separation)
- **Text**: white for active, muted-foreground for inactive

## Database Schema Usage

### Documents Table
```typescript
{
  _id: Id<"documents">,
  projectId: Id<"projects">,
  title: string,              // "Chapter 1: The Beginning"
  content: string,            // TipTap JSON HTML
  documentOrder: number,      // 0, 1, 2, ... for sorting
  createdAt: number,          // timestamp
  updatedAt: number,          // timestamp
}
```

### Indexes Used
- `by_project`: Find all documents for a project
- `by_project_order`: Sort documents by order within project

### Cascade Deletions
When document is deleted:
1. Query `tokenUsage` table with `by_document` index
2. Delete all token usage records
3. Delete the document
4. Update project's `chapterCount` metadata

## Performance Considerations

### Optimizations
- **Real-time Queries**: Convex automatically subscribes to document changes
- **Efficient Rendering**: Only render visible documents (ScrollArea)
- **Debounced Updates**: Word count calculated on content change, not keystroke
- **Lazy Loading**: Document content only loaded when selected

### Limitations
- **Large Projects**: May slow with 100+ documents (consider pagination)
- **Drag-and-Drop**: Sequential updates (not batched) for reordering
- **Word Count**: HTML parsing can be slow for very long documents (10k+ words)

## Future Enhancements

### 1. Nested Folders
- Support for "Parts" containing multiple "Chapters"
- Drag documents between folders
- Hierarchical numbering (Part 1 → Chapter 1.1, 1.2)

### 2. Document Templates
- Quick create from templates: "New Chapter", "New Scene", "New Act"
- Format-specific templates (Novel vs Screenplay)
- Custom user-defined templates

### 3. Advanced Sorting
- Sort by: Title, Created Date, Updated Date, Word Count
- Filter by: Has tokens, Empty, Completed
- Search: Find documents by title or content

### 4. Batch Operations
- Multi-select documents
- Bulk delete, move, or tag
- Merge documents
- Split document into multiple

### 5. Version History
- Track document versions over time
- Compare different versions
- Restore previous versions
- Branch for alternate storylines

### 6. Document Stats Panel
- Show detailed stats when document selected
- Character count, paragraph count, token usage
- Reading time estimate
- Last edited date/time

### 7. Keyboard Shortcuts
- `Ctrl+N`: New document
- `Ctrl+R`: Rename document
- `Delete`: Delete document
- `↑/↓`: Navigate between documents
- `Ctrl+↑/↓`: Reorder documents

## Testing Checklist

- [x] Document tree displays when writing view active
- [x] Create document dialog opens and works
- [x] Document appears in tree after creation
- [x] Click document to select and load in editor
- [x] Selected document has highlighted style
- [x] Edit button opens rename dialog
- [x] Rename updates document title
- [x] Delete button opens confirmation dialog
- [x] Delete removes document and updates list
- [x] Drag-and-drop reorders documents
- [x] Word count displays correctly
- [x] Folder collapse/expand works
- [x] Empty state shows when no documents
- [x] Document content loads in WritingEditor
- [x] Save document updates database
- [ ] Test with 20+ documents (scroll behavior)
- [ ] Test rapid create/delete operations
- [ ] Test concurrent editing (multiple tabs)

## Known Issues

1. **No Keyboard Navigation**: Can't use arrow keys to navigate documents yet
2. **No Multi-select**: Can't select multiple documents for batch operations
3. **Slow Reordering**: Drag-and-drop makes sequential API calls (not batched)
4. **No Undo**: Deleted documents can't be recovered
5. **No Search**: Can't search for documents by title

## Success Metrics

When this feature is working perfectly, users should be able to:
- ✅ Create a new document in under 3 seconds
- ✅ Switch between documents instantly (< 500ms load time)
- ✅ Reorder 10 documents in under 10 seconds
- ✅ See real-time word count updates
- ✅ Navigate their entire novel structure at a glance

## Next Steps

The Creative Writing Studio now has three major features complete:
1. ✅ **Token System** - World-building element management
2. ✅ **@Mention System** - Inline token tagging in documents
3. ✅ **Document Tree** - Multi-document navigation and management

Remaining major features to implement:
1. **Authentication System** - Replace "demo-user" with real auth
2. **AI Image Generation** - Connect to actual image generation API
3. **Context Menu on Mentions** - Right-click actions on token mentions
4. **Export System** - Export to PDF, DOCX, Final Draft format
5. **Collaboration** - Real-time multi-user editing
