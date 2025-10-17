# @Mention Token Tagging Feature

## Overview
Implemented a complete @mention system in the WritingEditor that allows writers to tag tokens (characters, locations, objects, etc.) inline while writing. When a user types "@", an autocomplete dropdown appears showing matching tokens from the current project.

## Features Implemented

### 1. Token Autocomplete Dropdown
- **Trigger**: Type "@" anywhere in the editor
- **Filtering**: Real-time filtering as you type (e.g., "@John" shows all tokens starting with "John")
- **Display**: Shows token icon (emoji), name, and type badge
- **Limit**: Shows up to 5 matching results
- **Selection**: Click on a token or use keyboard to select

### 2. Visual Token Mentions
- **Styling**: Purple-themed badges matching the app's AI accent color
- **Hover Effect**: Mentions have hover effects (brighter background on hover)
- **Format**: Displays as `@TokenName` in the editor
- **Types**: Each token type has its own emoji icon:
  - 👤 Character
  - 📍 Location
  - 📦 Object
  - 🐉 Creature
  - 🛡️ Faction
  - 📅 Event

### 3. Token Usage Tracking
- **Auto-tracking**: When you mention a token, it's automatically tracked in the database
- **Context Preservation**: Last 100 characters before the mention are saved as context
- **Position Tracking**: Each mention's position in the document is recorded
- **Real-time Updates**: Token usage updates as you edit

### 4. Database Integration
Created `convex/tokenUsage.ts` with three functions:
- `trackTokenUsage`: Records when a token is mentioned
- `removeTokenUsage`: Removes token usage records
- `getDocumentTokens`: Retrieves all tokens used in a document

## Technical Implementation

### Files Modified

#### 1. `src/components/WritingEditor.tsx`
- Added TipTap Mention extension configuration
- Implemented custom suggestion renderer with dropdown UI
- Added token query using Convex hooks
- Integrated token usage tracking mutation
- Created helper functions: `getTokenIcon()` and `extractMentions()`

#### 2. `convex/tokenUsage.ts` (NEW)
- Created mutations for tracking and removing token usage
- Created query to get all tokens used in a document
- Handles duplicate prevention and context updates

#### 3. `src/App.css`
- Added `.mention-suggestions` styles for dropdown
- Added `.mention-item` styles for dropdown items
- Added `.mention` styles for inline token badges

#### 4. `src/pages/Index.tsx`
- Updated state types to use proper Convex Id types
- Passed `projectId` prop to WritingEditor
- Updated `handleProjectSelect` to use typed Id

#### 5. `src/components/ProjectManager.tsx`
- Updated interface to use typed Id for callback

### Key Dependencies
- `@tiptap/extension-mention`: Core mention functionality
- `convex/react`: Real-time database queries and mutations
- TipTap extensions: StarterKit, Placeholder, CharacterCount

## Usage Instructions

### For Writers
1. **Create tokens first** in the Token Library view (characters, locations, etc.)
2. **Switch to Writing view** and select your project
3. **Type "@"** anywhere in your document
4. **Start typing** the token name to filter results
5. **Click or press Enter** to insert the token mention
6. The token appears as a **purple badge** in your text

### Example Workflow
```
You're writing: "The hero entered the ancient temple..."

1. After typing "The hero", type "@"
2. Autocomplete shows your character tokens
3. Select "John Smith" from the dropdown
4. Continue writing: "@John Smith entered the ancient temple..."
5. Type "@" again to mention the location
6. Select "Ancient Temple of Osiris"
7. Final text: "@John Smith entered the @Ancient Temple of Osiris..."
```

## Benefits

### For Writers
- **Quick Reference**: Tag important story elements without breaking flow
- **Consistency**: Ensures correct spelling of character/place names
- **Context Awareness**: Editor knows which tokens are used where
- **Future Features Ready**: Enables "Find All Uses", "Generate Token Images", etc.

### For AI Generation
- **Context Building**: AI knows which tokens are used together
- **Relationship Mapping**: Can track character-location associations
- **Prompt Enhancement**: Can auto-include token details in prompts

## Future Enhancements (Not Yet Implemented)

### 1. Context Menu on Mentions
Right-click on a mention to:
- **View Token**: Open token details in sidebar
- **Generate Image**: Launch AI generator with token context
- **Edit Token**: Quick edit token properties
- **Find All Uses**: Show all places this token is mentioned

### 2. Token Relationship Visualization
- Show a graph of token relationships based on co-occurrence
- Track which characters appear in which locations
- Visualize faction memberships and event participants

### 3. Smart Suggestions
- Suggest tokens based on document context
- "You're writing about combat, mention a weapon token?"
- Auto-suggest character tokens when writing dialogue

### 4. Batch Operations
- Update all mentions when a token is renamed
- Bulk find-and-replace token mentions
- Export list of all mentioned tokens per document

## Testing Checklist

- [x] Mention extension configured correctly
- [x] Autocomplete dropdown appears on "@"
- [x] Token filtering works as expected
- [x] Selected tokens insert correctly
- [x] Mention styling displays properly
- [x] Token usage tracked in database
- [x] No TypeScript errors
- [x] Props passed correctly from Index.tsx
- [ ] Test with multiple documents (need document creation UI)
- [ ] Test mention persistence across sessions
- [ ] Test with large token lists (50+ tokens)

## Known Limitations

1. **No Document Creation UI**: Currently need to manually create documents in database
2. **No Document List**: Can't switch between multiple documents yet
3. **Context Menu Not Implemented**: Right-click on mentions doesn't do anything yet
4. **No Tooltip on Hover**: Would be nice to show token details on hover
5. **Single Line Context**: Context is limited to last 100 chars, doesn't preserve structure

## Next Steps

To complete the Creative Writing Studio:
1. **Document Tree Navigation**: Add sidebar to create/manage multiple chapters
2. **Context Menu**: Implement right-click menu on mentions
3. **Token Hover Tooltip**: Show token details on hover
4. **Find All Uses**: Search across all documents for token mentions
5. **Mention Analytics**: Show which tokens are most frequently used
