# Markdown Rendering Implementation Guide

## Overview
The chat system now supports full markdown rendering for AI-generated responses. This includes support for headings, code blocks, tables, lists, and more.

## Implementation Details

### Components Updated

#### 1. **MarkdownRenderer.tsx** (New Component)
- **Location**: `src/components/AIChat/MarkdownRenderer.tsx`
- **Purpose**: Handles rendering of markdown content with proper styling
- **Features**:
  - GitHub-flavored markdown support (via `remark-gfm`)
  - Syntax highlighting for code blocks (via `rehype-highlight`)
  - Full customization of markdown elements using Tailwind CSS

### 2. **AIChat.tsx** (Updated)
- **Changes**: 
  - Added import for `MarkdownRenderer` component
  - Updated `ChatMessage` component to render markdown for assistant messages
  - User messages continue to use plain text with `whitespace-pre-wrap`

## Supported Markdown Features

### Text Formatting
- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Bold + Italic**: `***text***`
- **Strikethrough**: `~~text~~`
- **Code**: Inline \`code\` and code blocks

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

### Lists
- Unordered lists with `-`, `*`, or `+`
- Ordered lists with `1.`, `2.`, etc.
- Nested lists supported

### Code Blocks
```markdown
\`\`\`javascript
const hello = "world";
\`\`\`
```
Supports syntax highlighting for: javascript, typescript, python, jsx, tsx, bash, shell, and more

### Tables (GitHub Flavored Markdown)
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](image-url.jpg)
```

### Horizontal Rules
```markdown
---
***
___
```

## Styling

All markdown elements are styled using Tailwind CSS classes to match the application's design system:

- **Headings**: Properly sized with appropriate margins
- **Code**: Inline code has muted background with accent text color
- **Code Blocks**: Dark background with border, support for syntax highlighting
- **Tables**: Bordered with hover effects
- **Links**: Accent color with underline on hover
- **Blockquotes**: Left border in accent color with italic styling

## Dependencies Added

```json
{
  "react-markdown": "Latest version",
  "remark-gfm": "Latest version (GitHub-flavored markdown)",
  "rehype-highlight": "Latest version (syntax highlighting)"
}
```

## Usage Example

When an AI assistant sends a response with markdown:

```markdown
# Screenplay Structure

## Act 1: Setup
- Introduce characters
- Establish conflict
- Set the scene

### Key Points
1. First point
2. Second point
3. Third point

Here's some code:
\`\`\`javascript
const screenplay = new Screenplay();
screenplay.addAct(1);
\`\`\`
```

The `MarkdownRenderer` component will automatically:
1. Parse the markdown
2. Apply syntax highlighting to code blocks
3. Style all elements with Tailwind classes
4. Maintain responsive layout

## Browser Compatibility

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- No additional polyfills needed

## Performance Considerations

- Markdown parsing happens client-side for faster rendering
- Large code blocks are still performant due to efficient parsing
- CSS classes are pre-compiled by Tailwind CSS build process

## Future Enhancements

Potential additions for markdown rendering:
- LaTeX math support (`$...$` inline math)
- Mermaid diagram support
- Custom emoji rendering
- Footnotes support
- Citation formatting
- Custom markdown extensions

## Troubleshooting

### Code blocks not showing colors
- Ensure `highlight.js` CSS is properly imported
- Check browser DevTools to verify CSS is loaded
- Verify syntax highlighting language is supported

### Markdown not rendering
- Check that content is properly formatted markdown
- Verify the `MarkdownRenderer` component is imported
- Check browser console for any parsing errors

### Performance issues with large responses
- Consider breaking responses into smaller chunks
- Use pagination for very long documents
- Enable browser caching for CSS and JS files
