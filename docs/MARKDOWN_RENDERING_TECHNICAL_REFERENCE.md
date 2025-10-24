# Markdown Rendering - Technical Reference

## Component Architecture

### MarkdownRenderer Component

**Location**: `src/components/AIChat/MarkdownRenderer.tsx`

**Props**:
```typescript
interface MarkdownRendererProps {
  content: string;           // Markdown content to render
  isUser?: boolean;          // Optional flag (unused, for future)
}
```

**Dependencies**:
```typescript
import ReactMarkdown from 'react-markdown';        // Core renderer
import remarkGfm from 'remark-gfm';               // GFM plugin
import rehypeHighlight from 'rehype-highlight';   // Highlighting plugin
import 'highlight.js/styles/atom-one-dark.css';   // Theme CSS
```

**Supported Markdown Elements**:

```typescript
// Headings
h1, h2, h3, h4, h5, h6        // With proper sizing and margins

// Text Formatting
strong, em                      // Bold and italic
code (inline)                   // Inline code spans
del/strikethrough               // Via GFM

// Blocks
p (paragraph)                   // With proper spacing
pre (code block)                // With background and border
blockquote                      // With left border
hr (horizontal rule)            // Styled separator

// Lists
ul (unordered)                  // Bullet points
ol (ordered)                    // Numbered list
li (list items)                 // Individual items

// Tables (GFM)
table, thead, tbody              // Full table support
tr (row)                         // With hover effects
th (header cell)                 // Bold with background
td (data cell)                   // Aligned text

// Media
a (links)                        // External links
img (images)                     // Responsive images
```

### Integration in AIChat

**Location**: `src/components/AIChat/AIChat.tsx`

**Usage in ChatMessage**:
```typescript
{isAssistant ? (
  <MarkdownRenderer content={message.content} isUser={isUser} />
) : (
  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
)}
```

**Message Flow**:
```
User Message → API → AI Response (Markdown) → ChatMessage → MarkdownRenderer → Styled Output
```

---

## Styling System

### Tailwind CSS Classes Used

**Headings**:
```css
h1: text-lg font-bold mt-4 mb-2 text-foreground
h2: text-base font-bold mt-3 mb-2 text-foreground
h3: text-sm font-bold mt-2 mb-1 text-foreground
h4: text-sm font-semibold mt-2 mb-1 text-foreground
h5: text-xs font-semibold mt-1 mb-1 text-foreground
h6: text-xs font-semibold mt-1 mb-1 text-muted-foreground
```

**Text & Links**:
```css
p: mb-2 text-sm leading-relaxed text-foreground
a: text-accent hover:underline break-words
strong: font-semibold text-foreground
em: italic text-foreground
```

**Code**:
```css
code (inline): bg-muted/50 rounded px-1.5 py-0.5 text-xs font-mono text-accent
pre: bg-muted/70 rounded-lg p-3 mb-2 overflow-x-auto text-xs border border-border/30
```

**Lists**:
```css
ul: list-disc list-inside mb-2 ml-2 space-y-1 text-sm
ol: list-decimal list-inside mb-2 ml-2 space-y-1 text-sm
li: text-sm text-foreground
```

**Tables**:
```css
table: w-full text-sm border-collapse border border-border/30
thead: bg-muted/50 border-b border-border/30
tr: border-b border-border/30 hover:bg-muted/20
th: px-3 py-2 text-left font-semibold text-foreground
td: px-3 py-2 text-foreground
```

**Blockquotes**:
```css
blockquote: border-l-4 border-accent/50 pl-3 my-2 py-1 text-sm text-muted-foreground italic
```

---

## Plugin Configuration

### remark-gfm
Enables GitHub-flavored markdown:
- Tables with pipes and dashes
- Strikethrough with `~~text~~`
- Autolinks `http://example.com`
- Task lists with checkboxes
- Footnotes (if enabled)

### rehype-highlight
Syntax highlighting for code blocks:
- **Theme**: Atom One Dark (`highlight.js/styles/atom-one-dark.css`)
- **Languages**: 190+ supported languages
- **Auto-detection**: Detects language from code fence
- **Custom colors**: Maps to theme variables

**Supported Languages**:
```
javascript, typescript, tsx, jsx, python, java, c, cpp,
csharp, php, ruby, go, rust, swift, kotlin, scala,
bash, shell, sql, html, css, xml, json, yaml, markdown,
and 160+ more...
```

---

## Data Flow

### Message Creation

```typescript
// AI returns markdown string
const aiResponse = `
# Title
Some **bold** text
\`\`\`javascript
code here
\`\`\`
`;

// Message object
const message: Message = {
  id: "msg-123",
  role: "assistant",
  content: aiResponse,  // Raw markdown
  timestamp: new Date(),
  feedback: null
};
```

### Rendering Process

```
1. Message arrives from API
2. ChatMessage component receives it
3. isAssistant check performed
4. If assistant:
   a. MarkdownRenderer receives content string
   b. ReactMarkdown parses markdown
   c. Plugins (remark-gfm, rehype-highlight) process
   d. Components (custom Tailwind styled elements) render
   e. User sees formatted output
5. If user:
   a. Plain text wrapped in pre-wrap div
   b. Line breaks preserved
```

---

## Markdown Syntax Reference

### Headers
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Emphasis
```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~strikethrough~~
```

### Lists
```markdown
- Unordered item 1
- Unordered item 2
  - Nested item

1. Ordered item 1
2. Ordered item 2
   1. Nested ordered
```

### Code
```markdown
Inline `code` here

\`\`\`javascript
const code = "block";
\`\`\`
```

### Tables (GFM)
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Blockquotes
```markdown
> Single line quote

> Multi-line
> quote here
```

### Links & Images
```markdown
[Link text](https://example.com)
![Alt text](image-url.jpg)
```

### Horizontal Rule
```markdown
---
***
___
```

---

## Performance Considerations

### Client-Side Parsing
- **Advantage**: No server roundtrip needed
- **Advantage**: Instant rendering
- **Trade-off**: Small JS bundle size increase
- **Solution**: Tree-shaking and code splitting handle this

### Rendering Pipeline
```
String → Parse → Transform → Highlight → Render → Display
  Fast   Medium   Medium      Fast       Fast     Instant
```

### Optimization Tips

1. **Large Code Blocks**: Use language-specific syntax
2. **Many Tables**: Consider pagination for long tables
3. **Deep Nesting**: Avoid deeply nested lists (3+ levels)
4. **Long Content**: Split into multiple messages

---

## Browser API Usage

### highlight.js
```typescript
import rehypeHighlight from 'rehype-highlight';

// Automatically adds:
// - hljs classes to code blocks
// - Language detection
// - Syntax coloring via CSS
```

### ReactMarkdown
```typescript
import ReactMarkdown from 'react-markdown';

// Provides:
// - Markdown parsing
// - Component rendering
// - Custom element handlers
// - Plugin support
```

---

## Debugging

### Console Logging
```typescript
// Add to MarkdownRenderer if needed
console.log('Rendering markdown:', content);
console.log('Content length:', content.length);
```

### Browser DevTools
1. **Elements Tab**: Inspect rendered HTML
2. **Console Tab**: Check for errors
3. **Performance Tab**: Monitor rendering speed
4. **Network Tab**: Verify CSS/JS loaded

### Common Issues

**Issue**: Syntax highlighting not working
```
Check:
1. CSS file imported: highlight.js/styles/atom-one-dark.css
2. rehypeHighlight plugin enabled
3. Language specified in code fence
```

**Issue**: Markdown not rendering
```
Check:
1. Content is valid markdown
2. MarkdownRenderer component mounted
3. content prop passed correctly
4. No console errors
```

---

## Testing

### Unit Test Example
```typescript
describe('MarkdownRenderer', () => {
  it('should render bold text', () => {
    const { container } = render(
      <MarkdownRenderer content="**bold**" />
    );
    expect(container.querySelector('strong')).toBeInTheDocument();
  });

  it('should highlight code blocks', () => {
    const { container } = render(
      <MarkdownRenderer content="\`\`\`js\nconst x = 1;\n\`\`\`" />
    );
    expect(container.querySelector('pre')).toBeInTheDocument();
  });
});
```

### Integration Test Example
```typescript
describe('Chat with Markdown', () => {
  it('should display markdown in assistant messages', async () => {
    // Simulate AI response with markdown
    const message = {
      role: 'assistant',
      content: '# Hello\n**Bold text**'
    };
    
    // Verify rendering
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Bold text')).toBeInTheDocument();
  });
});
```

---

## Migration Guide

### From Plain Text to Markdown

**Before**:
```typescript
<div className="whitespace-pre-wrap text-sm">{message.content}</div>
```

**After**:
```typescript
{isAssistant ? (
  <MarkdownRenderer content={message.content} isUser={isUser} />
) : (
  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
)}
```

### Data Compatibility
- ✅ Existing plain text messages still work
- ✅ New markdown messages render properly
- ✅ Mixed format history compatible
- ✅ No data migration required

---

## Maintenance

### Updating Dependencies
```bash
# Check for updates
npm outdated react-markdown remark-gfm rehype-highlight

# Update specific package
npm update react-markdown

# Update all
npm update
```

### Monitoring
- Track bundle size changes
- Monitor rendering performance
- Collect user feedback
- Track error rates

---

## API Reference

### MarkdownRenderer Props
```typescript
interface MarkdownRendererProps {
  content: string;      // Required: Markdown content
  isUser?: boolean;     // Optional: User message flag (unused)
}
```

### Exported Elements
```typescript
export const MarkdownRenderer: React.FC<MarkdownRendererProps>
```

---

**Version**: 1.0.0  
**Last Updated**: October 24, 2025  
**Status**: Production Ready
