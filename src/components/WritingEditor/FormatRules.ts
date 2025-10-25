import { Editor } from '@tiptap/react';

// Format-specific auto-formatting rules

export function applyScreenplayFormatting(editor: Editor, event: KeyboardEvent): boolean {
  if (!editor) return false;

  const { state } = editor;
  const { selection } = state;
  const { $from } = selection;
  const currentLineText = $from.parent.textContent;

  // Tab key cycles through screenplay elements
  if (event.key === 'Tab') {
    event.preventDefault();
    
    // Detect current format and cycle to next
    if (currentLineText.match(/^(INT\.|EXT\.)/i)) {
      // Scene heading -> Action
      editor.commands.setTextAlign('left');
    } else if (currentLineText.match(/^[A-Z\s]+$/)) {
      // Character name -> Dialogue
      editor.commands.setTextAlign('left');
    }
    
    return true;
  }

  // Auto-capitalize scene headings
  if (event.key === 'Enter') {
    setTimeout(() => {
      const text = editor.state.selection.$from.parent.textContent;
      if (text.match(/^(int\.|ext\.)/i)) {
        const uppercased = text.toUpperCase();
        editor.commands.insertContentAt(
          {
            from: editor.state.selection.from - text.length,
            to: editor.state.selection.from,
          },
          uppercased
        );
      }
    }, 0);
  }

  // Keyboard shortcuts
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case '1': // Scene heading
        event.preventDefault();
        editor.commands.setTextAlign('left');
        return true;
      case '2': // Action
        event.preventDefault();
        editor.commands.setTextAlign('left');
        return true;
      case '3': // Character
        event.preventDefault();
        editor.commands.setTextAlign('center');
        return true;
      case '4': // Dialogue
        event.preventDefault();
        editor.commands.setTextAlign('left');
        return true;
    }
  }

  return false;
}

export function applyComicScriptFormatting(editor: Editor, event: KeyboardEvent): boolean {
  if (!editor) return false;

  const { state } = editor;
  const { selection } = state;
  const { $from } = selection;
  const currentLineText = $from.parent.textContent;

  // Auto-format PAGE headers
  if (event.key === 'Enter') {
    setTimeout(() => {
      const text = editor.state.selection.$from.parent.textContent;
      if (text.match(/^page\s+\d+/i)) {
        editor.chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run();
      } else if (text.match(/^panel\s+\d+:/i)) {
        editor.chain()
          .focus()
          .toggleBold()
          .run();
      }
    }, 0);
  }

  return false;
}

export function applyStagePlayFormatting(editor: Editor, event: KeyboardEvent): boolean {
  if (!editor) return false;

  const { state } = editor;
  const { selection } = state;
  const { $from } = selection;
  const currentLineText = $from.parent.textContent;

  // Auto-format ACT and SCENE headers
  if (event.key === 'Enter') {
    setTimeout(() => {
      const text = editor.state.selection.$from.parent.textContent;
      if (text.match(/^(act|scene)\s+/i)) {
        editor.chain()
          .focus()
          .toggleHeading({ level: text.match(/^act/i) ? 1 : 2 })
          .setTextAlign('center')
          .run();
      }
    }, 0);
  }

  // Auto-italicize stage directions in brackets/parentheses
  if (event.key === ')' || event.key === ']') {
    setTimeout(() => {
      const { state } = editor;
      const { selection } = state;
      const beforeCursor = state.doc.textBetween(
        Math.max(0, selection.from - 100),
        selection.from
      );
      
      const match = beforeCursor.match(/[\[\(][^\]\)]+$/);
      if (match) {
        const from = selection.from - match[0].length;
        editor.chain()
          .setTextSelection({ from, to: selection.from })
          .toggleItalic()
          .run();
      }
    }, 0);
  }

  return false;
}

export function applyNovelFormatting(editor: Editor, event: KeyboardEvent): boolean {
  if (!editor) return false;

  // Auto-format chapter headings
  if (event.key === 'Enter') {
    setTimeout(() => {
      const text = editor.state.selection.$from.parent.textContent;
      if (text.match(/^chapter\s+/i)) {
        editor.chain()
          .focus()
          .toggleHeading({ level: 1 })
          .setTextAlign('center')
          .run();
      }
    }, 0);
  }

  return false;
}

// Apply format rules based on current format
export function applyFormatRules(editor: Editor, format: string, event: KeyboardEvent): boolean {
  switch (format) {
    case 'screenplay':
      return applyScreenplayFormatting(editor, event);
    case 'comic_script':
      return applyComicScriptFormatting(editor, event);
    case 'stage_play':
      return applyStagePlayFormatting(editor, event);
    case 'novel':
      return applyNovelFormatting(editor, event);
    default:
      return false;
  }
}
