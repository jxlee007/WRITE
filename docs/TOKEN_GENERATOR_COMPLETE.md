# Token Generator - Complete Implementation Guide

## Overview

The Token Generator is a unified interface that combines token creation with AI image generation. Users can now create world-building tokens (characters, locations, objects, etc.) with AI-generated images in a single, streamlined workflow.

## What Changed

### 1. Component Renamed
- **Old**: `AIGenerator.tsx` 
- **New**: `TokenGenerator.tsx`
- **Activity Bar**: "AI Generation" → "Token Generator"

### 2. Removed Edit Token Dialog
- The separate "Edit Token" dialog in TokenLibrary has been removed
- Tokens are now created complete with all metadata from the start
- Edit button removed from token cards (only Delete remains)

### 3. Unified Creation Flow
Users now fill in all token details before generating:
1. **Token Details** (name, type, description, AI prompt template)
2. **Image Generation** (prompt, style, quality, size)
3. Click "Generate Token" → Token created with AI-generated image attached

## Component Structure

### Token Generator (`src/components/TokenGenerator.tsx`)

#### Props
```typescript
interface TokenGeneratorProps {
  initialPrompt?: string;          // Optional pre-filled image prompt
  projectId?: Id<"projects"> | null; // Current project ID
  onRecentGenerationsToggle?: (open: boolean) => void; // Sidebar toggle
}
```

#### State Variables

**Token Fields:**
- `tokenName: string` - Token name (required)
- `tokenType: string` - Token type: character, location, object, creature, faction, event
- `tokenDescription: string` - Token description (optional)
- `tokenPromptTemplate: string` - AI prompt template for future use (optional)

**Image Generation Fields:**
- `imagePrompt: string` - AI image generation prompt (required)
- `additionalContext: string` - Style, mood, lighting details (optional)
- `imageQuality: string` - Quality preset (4k, 2k, 1080p, 720p, 480p)
- `imageSize: string` - Aspect ratio and dimensions
- `generating: boolean` - Generation in progress
- `generatedImages: Array<{url, tokenId}>` - Generation history

#### Key Functions

**`handleGenerate()`**
```typescript
// Validates inputs
// Generates image (mock or real API call)
// Creates token with api.tokens.createToken
// Includes all metadata: name, type, description, promptTemplate, fileUrl, source, settings
// Clears form for next token
// Shows success toast
```

**`buildEnhancedPrompt()`**
```typescript
// Combines imagePrompt + additionalContext
// Adds quality modifiers
// Returns enhanced prompt string
```

## UI Layout

### Left Panel (320px width)
**Token Details Section:**
- Name (Input, required, marked with *)
- Type (Select dropdown with 6 options)
- Description (Textarea, optional)
- AI Prompt Template (Textarea, optional)

**Separator**

**Image Generation Section:**
- Image Prompt (Textarea, required, marked with *)
- Style & Details (Textarea, optional)
- Quality (Select: 4K, 2K, 1080p, 720p, 480p)
- Size (Select: Square, Landscape, Portrait formats)

**Generate Button:**
- Shows "Creating Token..." when generating
- Disabled during generation
- Uses gradient AI styling with glow effect

### Right Panel (Flex-1)
**Empty State:**
- Sparkles icon
- "Generate a token to see results"
- "Fill in token details and image prompt"

**Generated Images:**
- Grid of generated images
- Hover overlay with Download button
- Shows "✓ Token Created" status
- Displays image prompt used

## Backend Integration

### API Call: `api.tokens.createToken`
```typescript
await createToken({
  projectId,                    // Current project
  type: tokenType,              // character, location, etc.
  name: tokenName,              // User-entered name
  description: tokenDescription,// User-entered description
  promptTemplate: tokenPromptTemplate, // Optional template
  fileUrl: mockImageUrl,        // Generated image URL
  primaryImageUrl: mockImageUrl,// Same as fileUrl (for compatibility)
  source: "ai-generated",       // Automatically set
  prompt: enhancedPrompt,       // Full image generation prompt
  modelUsed: "mock-model",      // Model identifier
  settings: {
    size: imageSize,            // Selected size
    quality: imageQuality,      // Selected quality
  },
  mimeType: "image/png",        // Image type
});
```

## Token Types

All tokens support the following types:
1. **Character** - People, heroes, NPCs
2. **Location** - Places, regions, buildings
3. **Object** - Items, artifacts, props
4. **Creature** - Monsters, animals, beings
5. **Faction** - Groups, organizations, teams
6. **Event** - Occasions, battles, ceremonies

## User Workflow

### Creating a Token with AI Image

1. **Open Token Generator** (Sparkles icon in Activity Bar)
2. **Fill Token Details:**
   - Enter name: "Dragon Knight"
   - Select type: "Character"
   - (Optional) Add description: "A noble warrior who rides a dragon"
   - (Optional) Add AI template: "A heroic dragon knight in medieval fantasy armor"
3. **Configure Image:**
   - Enter image prompt: "Epic fantasy dragon knight warrior, dragon flying in background"
   - (Optional) Add style: "dramatic lighting, cinematic, highly detailed"
   - Select quality: "1080p"
   - Select size: "Portrait 1080×1920"
4. **Click "Generate Token"**
5. **Result:**
   - Image generates and displays on right
   - Token created automatically in database
   - Shows "Token 'Dragon Knight' created successfully!"
   - Form clears for next token

### Benefits

**Before (Old Flow):**
1. Generate image in AI Generator
2. Save image to gallery
3. Open Token Library
4. Create new token
5. Manually link image or copy URL
6. Edit token to add details

**After (New Flow):**
1. Fill token details in Token Generator
2. Generate image
3. Done! Token created with image attached

**Time Saved:** 4-5 steps eliminated

## File Changes

### New Files
- `src/components/TokenGenerator.tsx` - Main component

### Modified Files
- `src/pages/Index.tsx` - Import and use TokenGenerator instead of AIGenerator
- `src/components/ActivityBar.tsx` - Updated label to "Token Generator"
- `src/components/TokenLibrary.tsx` - Removed Edit Token dialog and Edit button

### Deleted Features
- Edit Token dialog (TokenLibrary)
- Edit button on token cards
- `editingToken` state and `handleUpdateToken` function
- `updateToken` mutation usage in TokenLibrary

## Integration with Existing Features

### Token Library
- Still shows all tokens including those created via Token Generator
- Upload button still works for reference images
- Create Token dialog still works for non-image tokens
- Delete button remains functional
- Filtering and search unchanged

### Recent Generations Sidebar
- Still works with new system
- Shows recent AI-generated images from tokens
- Uses `api.tokens.getRecentAIImages()`

### Project Overview
- Token counts include tokens created via Token Generator
- No changes needed

## Validation

### Required Fields
- Token Name (cannot be empty)
- Image Prompt (cannot be empty)
- Project must be selected

### Optional Fields
- Description
- AI Prompt Template
- Additional Context/Style

### Error Handling
- "Please enter a token name" - if name is empty
- "Please enter an image prompt" - if prompt is empty
- "No project selected" - if projectId is null
- "Failed to generate token" - on API error

## Styling

### Visual Sections
- Sections separated by `<Separator />` components
- Section headers with decorative horizontal lines
- Required fields marked with red asterisk (*)

### Colors
- Required asterisk: `text-destructive`
- Section headers: `text-muted-foreground uppercase tracking-wider`
- Generate button: `bg-gradient-ai hover:shadow-glow`

### Responsive
- Left panel: Fixed 320px width
- Right panel: Flexible (flex-1)
- Scrollable content in both panels

## Future Enhancements

### Potential Features
1. **Batch Generation**: Generate multiple variations at once
2. **Image Editing**: Edit generated image before creating token
3. **Template Library**: Pre-made token templates with prompts
4. **Style Presets**: Save favorite style combinations
5. **Token Editing**: Re-enable editing if needed (via new modal)
6. **Image Re-generation**: Re-generate image for existing token
7. **Import from File**: Upload image instead of generating

### API Integration
- Currently uses mock image generation (`https://picsum.photos`)
- Ready for real AI API integration:
  - OpenAI DALL-E
  - Midjourney
  - Stable Diffusion
  - Lovable AI
  
Replace mock logic in `handleGenerate()` with actual API call.

## Testing Checklist

- [ ] Open Token Generator from Activity Bar
- [ ] Create token with all fields filled
- [ ] Create token with only required fields
- [ ] Verify validation for empty name
- [ ] Verify validation for empty image prompt
- [ ] Check token appears in Token Library
- [ ] Verify image is attached to token
- [ ] Test all token types (character, location, etc.)
- [ ] Test different image sizes and qualities
- [ ] Verify form clears after successful creation
- [ ] Check Recent Generations sidebar updates
- [ ] Verify Delete button still works in Token Library
- [ ] Confirm Edit button is removed from token cards
- [ ] Test with no project selected

## Troubleshooting

### Token not appearing in library
- Check that projectId is set
- Verify token type filter isn't hiding it
- Refresh the Token Library view

### Image not generating
- Check browser console for errors
- Verify API endpoints are configured
- Ensure proper authentication

### Form not clearing
- Check `setTokenName('')` etc. in handleGenerate
- Verify state updates are working

### Validation errors
- Ensure trim() is used on string inputs
- Check conditional logic in handleGenerate

## Summary

The Token Generator provides a streamlined, professional workflow for creating world-building tokens with AI-generated images. By combining token metadata and image generation in one interface, it reduces the number of steps and improves the user experience significantly. The implementation maintains backward compatibility with existing tokens while providing a modern, efficient creation process.
