# Export Feature Documentation

## Overview
Implemented a comprehensive document export system that allows writers to export their work in three popular formats: TXT (plain text), PDF (formatted document), and DOCX (Microsoft Word). The export system intelligently preserves formatting, handles headings and paragraphs, and generates professional-looking documents.

## Features Implemented

### 1. Export Menu Component
- **Location**: Toolbar in WritingEditor, right side next to Save button
- **UI**: Dropdown menu with three export options
- **Visual Feedback**: Shows "Exporting..." state during processing
- **Format Indicator**: Shows current document format at bottom of menu

### 2. Export Formats

#### TXT (Plain Text)
- **Library**: html-to-text
- **Features**:
  - Strips all HTML tags
  - Preserves text structure (paragraphs, line breaks)
  - Converts headings to uppercase for H1
  - Maintains ordered and unordered lists
  - Clean, readable plain text output
- **Use Case**: Maximum compatibility, simple text editors, mobile devices

#### PDF (Portable Document Format)
- **Library**: jsPDF
- **Features**:
  - Professional formatting with margins (20pt all sides)
  - Automatic page breaks when content exceeds page height
  - Font hierarchy:
    - Title: 24pt bold
    - H1: 20pt bold
    - H2: 16pt bold
    - H3: 14pt bold
    - Body: 12pt regular
  - Proper spacing between elements
  - Text wrapping to fit page width
- **Use Case**: Professional distribution, printing, archival

#### DOCX (Microsoft Word)
- **Library**: docx
- **Features**:
  - Native Word format with full formatting
  - Heading styles (TITLE, HEADING_1, HEADING_2, HEADING_3)
  - Inline formatting preserved (bold, italic)
  - Proper spacing (before/after paragraphs)
  - Editable in Microsoft Word, Google Docs, LibreOffice
- **Use Case**: Further editing, collaboration, submissions

## Technical Implementation

### Files Created

#### `src/components/ExportMenu.tsx` (NEW)
Complete export menu component with:

**Dependencies:**
```typescript
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { convert } from 'html-to-text';
```

**Key Functions:**

1. **htmlToPlainText(html: string): string**
   - Converts HTML to plain text using html-to-text library
   - Configures selectors for proper formatting
   - Preserves document structure

2. **exportAsTXT()**
   - Converts editor HTML to plain text
   - Creates Blob with text/plain MIME type
   - Triggers download with document title
   - Shows success/error toast notifications

3. **exportAsPDF()**
   - Initializes jsPDF document
   - Parses HTML content into DOM nodes
   - Processes each node type (H1, H2, H3, P, text)
   - Handles page breaks automatically
   - Applies proper font sizes and spacing
   - Generates and downloads PDF file

4. **exportAsDOCX()**
   - Creates Document instance with docx library
   - Parses HTML and builds Paragraph array
   - Maps HTML tags to Word heading levels
   - Preserves inline formatting (bold, italic)
   - Packs document to Blob
   - Triggers download

**Component Structure:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger> {/* Export button */}
  <DropdownMenuContent>
    <DropdownMenuItem> {/* TXT */}
    <DropdownMenuItem> {/* PDF */}
    <DropdownMenuItem> {/* DOCX */}
    <DropdownMenuSeparator />
    <DropdownMenuItem> {/* Format indicator */}
```

### Files Modified

#### `src/components/WritingEditor.tsx`
**Changes:**
1. Added `documentTitle` prop to interface
2. Imported `ExportMenu` component
3. Removed old `handleExport` function (simple TXT export)
4. Removed `FileDown` import (no longer needed)
5. Replaced export button with `<ExportMenu>` component
6. Passed `content`, `title`, and `format` props to ExportMenu

**Before:**
```tsx
<Button size="sm" variant="ghost" onClick={handleExport}>
  <FileDown className="h-4 w-4 mr-2" />
  Export
</Button>
```

**After:**
```tsx
<ExportMenu 
  content={editor.getHTML()}
  title={documentTitle}
  format={currentFormat}
/>
```

#### `src/pages/Index.tsx`
**Changes:**
1. Added `documentTitle={currentDocument.title}` prop when rendering WritingEditor
2. Passes document title from Convex query to editor

## User Workflow

### Exporting a Document
```
1. Write or edit document in WritingEditor
2. Click "Export" dropdown in toolbar
3. Select format:
   - TXT: Plain text, universal compatibility
   - PDF: Formatted document for distribution
   - DOCX: Editable Word document
4. File downloads automatically with document title
5. Success toast confirms export
```

### Export File Naming
- **Pattern**: `{documentTitle}.{extension}`
- **Examples**:
  - "Chapter 1: The Beginning.txt"
  - "Act 1 Scene 2.pdf"
  - "Prologue.docx"

## Format Comparison

| Feature | TXT | PDF | DOCX |
|---------|-----|-----|------|
| File Size | Smallest | Medium | Largest |
| Formatting | None | Fixed | Editable |
| Compatibility | Universal | High | Medium |
| Editing | Any editor | Not editable | Word/Docs |
| Professional | No | Yes | Yes |
| Mobile-friendly | Yes | Yes | Depends |
| Print-ready | No | Yes | Yes |
| Accessibility | High | Medium | High |

## Format-Specific Details

### TXT Export
**html-to-text Configuration:**
```typescript
{
  wordwrap: false,              // No line wrapping
  preserveNewlines: true,       // Keep paragraph breaks
  selectors: [
    { selector: 'h1', format: 'heading', options: { uppercase: true } },
    { selector: 'h2', format: 'heading' },
    { selector: 'p', format: 'block' },
    { selector: 'strong', format: 'inline' },
    { selector: 'em', format: 'inline' },
    { selector: 'ul', format: 'unorderedList' },
    { selector: 'ol', format: 'orderedList' },
  ]
}
```

**Output Example:**
```
CHAPTER 1: THE BEGINNING

The sun was setting over the distant mountains...

* First item
* Second item
```

### PDF Export
**Page Settings:**
- Page size: Letter (8.5" x 11")
- Margins: 20pt all sides
- Max line width: pageWidth - 40pt
- Line height: 7pt for body text

**Font Hierarchy:**
- Title: 24pt bold → 20pt spacing after
- H1: 20pt bold → 15pt spacing after
- H2: 16pt bold → 12pt spacing after
- H3: 14pt bold → 10pt spacing after
- Body: 12pt regular → 7pt line height, 5pt paragraph spacing

**Page Break Logic:**
```typescript
if (yPosition + lineHeight > pageHeight - bottomMargin) {
  doc.addPage();
  yPosition = topMargin;
}
```

### DOCX Export
**Document Structure:**
```typescript
Document({
  sections: [{
    properties: {},
    children: [
      Paragraph({ text: title, heading: HeadingLevel.TITLE }),
      Paragraph({ text: content, heading: HeadingLevel.HEADING_1 }),
      Paragraph({ children: [TextRun({ text: body })] }),
    ]
  }]
})
```

**Spacing Units (DXA - Twentieths of a point):**
- TITLE: after 240 (12pt)
- HEADING_1: before 240, after 120 (12pt, 6pt)
- HEADING_2: before 200, after 100 (10pt, 5pt)
- HEADING_3: before 160, after 80 (8pt, 4pt)
- Body: before 120, after 120 (6pt, 6pt)

**Inline Formatting:**
```typescript
TextRun({
  text: content,
  bold: true,      // <strong> tags
  italics: true,   // <em> tags
})
```

## Error Handling

### Toast Notifications
- **Success**: "Document exported as {FORMAT}"
- **Error**: "Failed to export as {FORMAT}"
- **Console**: Full error object logged for debugging

### Export States
- **isExporting**: Boolean flag prevents multiple simultaneous exports
- **Button State**: Shows "Exporting..." during processing
- **Disabled State**: Button disabled while exporting

## Performance Considerations

### File Sizes (Approximate)
- **TXT**: 1-5 KB per 1000 words
- **PDF**: 50-100 KB per 1000 words (font embedding)
- **DOCX**: 20-50 KB per 1000 words (compressed XML)

### Processing Time
- **TXT**: < 100ms (instant)
- **PDF**: 500ms - 2s (depends on length and complexity)
- **DOCX**: 200ms - 1s (XML generation)

### Memory Usage
- **TXT**: Minimal (string conversion)
- **PDF**: Moderate (canvas operations)
- **DOCX**: Moderate (XML tree construction)

### Limitations
1. **Large Documents**: PDF export may be slow for 50k+ word documents
2. **Complex Formatting**: Some TipTap extensions may not export properly
3. **Images**: Currently not exported (would need base64 embedding)
4. **Tables**: Not yet implemented in export logic
5. **Custom Styles**: Only basic formatting preserved

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Required Features
- Blob API (for file creation)
- URL.createObjectURL (for download)
- File download via anchor element
- ArrayBuffer support (for DOCX)

## Future Enhancements

### 1. Format-Specific Options
**TXT Options:**
- Line width (40, 60, 80 characters)
- Include/exclude page numbers
- Markdown formatting

**PDF Options:**
- Page size (Letter, A4, Legal)
- Font family (Times, Arial, Courier)
- Custom margins
- Header/footer with page numbers
- Table of contents

**DOCX Options:**
- Theme selection
- Custom styles
- Include metadata (author, date)
- Track changes enabled

### 2. Screenplay Formatting
- **Industry Standard**: Courier 12pt font
- **Proper Margins**: 1.5" left, 1" right
- **Element Spacing**: Scene headers, action, dialogue
- **Page Numbers**: Top right, no number on page 1
- **Export to FDX**: Final Draft format

### 3. Batch Export
- Export all documents in project
- Create ZIP archive with all chapters
- Export entire project as single document
- Generate combined PDF with table of contents

### 4. Cloud Export
- Export to Google Drive
- Export to Dropbox
- Email document as attachment
- Share via link

### 5. Advanced Features
- **Custom Templates**: User-defined export styles
- **Image Embedding**: Export with generated AI images
- **Token Glossary**: Auto-generate character/location appendix
- **Version Comparison**: Export diff between versions
- **Annotations**: Include editor notes and comments

### 6. Format Conversion
- Convert between formats (DOCX → PDF)
- Import from DOCX/PDF/TXT
- Auto-detect and preserve formatting
- Smart format migration

## Testing Checklist

- [x] TXT export generates valid plain text file
- [x] PDF export creates readable PDF with formatting
- [x] DOCX export opens correctly in Microsoft Word
- [x] File downloads with correct filename
- [x] Success toast appears after export
- [x] Error toast appears on failure
- [x] Export button disables during processing
- [x] Multiple formats can be exported sequentially
- [ ] Test with very long documents (10k+ words)
- [ ] Test with heavy formatting (many headings)
- [ ] Test with token mentions (@mentions)
- [ ] Test with special characters
- [ ] Test in different browsers
- [ ] Test on mobile devices

## Known Issues

1. **Token Mentions**: `@mentions` export as plain text, not styled
2. **Images**: Not included in exports (future enhancement)
3. **Tables**: Not yet supported in export logic
4. **Custom TipTap Extensions**: May not export properly
5. **Right-to-Left Text**: Not tested for RTL languages
6. **Very Long Documents**: PDF export may freeze browser temporarily

## Dependencies Added

```json
{
  "jspdf": "^2.5.1",           // PDF generation
  "docx": "^8.5.0",            // DOCX creation
  "html-to-text": "^9.0.5"    // HTML to plain text
}
```

### Why These Libraries?

**jsPDF:**
- Most popular PDF generator for JavaScript
- Client-side generation (no server needed)
- Active development and maintenance
- Extensive documentation

**docx:**
- Official library for creating DOCX files
- Generates valid Office Open XML format
- Full TypeScript support
- No dependencies on external tools

**html-to-text:**
- Best HTML to plain text converter
- Configurable selectors
- Preserves document structure
- Handles complex HTML

## Success Metrics

When working perfectly, users should be able to:
- ✅ Export any document in under 3 seconds
- ✅ Open exported files in standard applications
- ✅ Preserve all basic formatting (headings, paragraphs)
- ✅ Export multiple times without issues
- ✅ Share exported files with others

## Next Steps

The Creative Writing Studio now has **9/10 major features** complete:

✅ Convex Backend  
✅ TipTap Rich Text Editor  
✅ Project Management  
✅ Token Library  
✅ AI Generator (Token Integration)  
✅ @Mention System  
✅ Document Tree Navigation  
✅ GitHub Prompt Templates  
✅ Export System (TXT, PDF, DOCX)  

❌ Authentication System  

Remaining work:
1. **Authentication** - Replace "demo-user" with Clerk/Supabase Auth
2. **Real AI API** - Connect to Stable Diffusion/DALL-E/Replicate
3. **Context Menu on Mentions** - Right-click actions on @tokens
4. **Collaboration** - Real-time multi-user editing
5. **Version Control** - Track document history and changes
