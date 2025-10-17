import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Mention from '@tiptap/extension-mention';
import { useEffect, useState } from 'react';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { ExportMenu } from './ExportMenu';

interface WritingEditorProps {
  documentId?: Id<"documents">;
  projectId?: Id<"projects">;
  documentTitle?: string;
  initialContent?: string;
  format?: 'novel' | 'screenplay' | 'stage_play' | 'comic_script';
  onSave?: (content: string) => void;
  onContentChange?: (content: string) => void;
}

export function WritingEditor({
  documentId,
  projectId,
  documentTitle = 'Document',
  initialContent = '',
  format = 'novel',
  onSave,
  onContentChange,
}: WritingEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentFormat, setCurrentFormat] = useState(format);

  // Fetch tokens for mention suggestions
  const tokens = useQuery(api.tokens.getTokens, projectId ? { projectId } : "skip");
  const trackTokenUsage = useMutation(api.tokenUsage.trackTokenUsage);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: getPlaceholderText(currentFormat),
      }),
      CharacterCount,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          items: ({ query }) => {
            if (!tokens) return [];
            return tokens
              .filter((token) =>
                token.name.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 5)
              .map((token) => ({
                id: token._id,
                label: token.name,
                type: token.type,
              }));
          },
          render: () => {
            let component: any;
            let popup: any;

            return {
              onStart: (props: any) => {
                component = document.createElement('div');
                component.className = 'mention-suggestions';
                
                if (props.items.length === 0) {
                  component.innerHTML = '<div class="mention-item">No tokens found</div>';
                } else {
                  props.items.forEach((item: any) => {
                    const div = document.createElement('div');
                    div.className = 'mention-item';
                    div.innerHTML = `
                      <span class="mention-icon">${getTokenIcon(item.type)}</span>
                      <span class="mention-label">${item.label}</span>
                      <span class="mention-type">${item.type}</span>
                    `;
                    div.addEventListener('click', () => props.command(item));
                    component.appendChild(div);
                  });
                }

                document.body.appendChild(component);
                
                // Position the popup
                const { left, top, height } = props.clientRect();
                component.style.position = 'absolute';
                component.style.left = `${left}px`;
                component.style.top = `${top + height}px`;
              },
              onUpdate: (props: any) => {
                if (!component) return;
                component.innerHTML = '';
                
                if (props.items.length === 0) {
                  component.innerHTML = '<div class="mention-item">No tokens found</div>';
                } else {
                  props.items.forEach((item: any) => {
                    const div = document.createElement('div');
                    div.className = 'mention-item';
                    div.innerHTML = `
                      <span class="mention-icon">${getTokenIcon(item.type)}</span>
                      <span class="mention-label">${item.label}</span>
                      <span class="mention-type">${item.type}</span>
                    `;
                    div.addEventListener('click', () => props.command(item));
                    component.appendChild(div);
                  });
                }
                
                // Update position
                const { left, top, height } = props.clientRect();
                component.style.left = `${left}px`;
                component.style.top = `${top + height}px`;
              },
              onKeyDown: (props: any) => {
                if (props.event.key === 'Escape') {
                  if (component) {
                    component.remove();
                  }
                  return true;
                }
                return false;
              },
              onExit: () => {
                if (component) {
                  component.remove();
                }
              },
            };
          },
        },
        renderLabel({ node }) {
          return `@${node.attrs.label}`;
        },
      }),
    ],
    content: initialContent || getDefaultContent(currentFormat),
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(editor.getHTML());
      }
      
      // Track token usage
      if (documentId && projectId) {
        const doc = editor.getJSON();
        const mentions = extractMentions(doc);
        mentions.forEach((mention, index) => {
          trackTokenUsage({
            documentId,
            tokenId: mention.id as Id<"tokens">,
            position: index,
            context: mention.context || '',
          });
        });
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-4',
      },
    },
  });

  // Auto-save functionality
  useEffect(() => {
    if (!editor || !onSave) return;

    const autoSaveInterval = setInterval(() => {
      const content = editor.getHTML();
      if (content !== initialContent) {
        handleSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [editor, initialContent, onSave]);

  const handleSave = async () => {
    if (!editor || !onSave) return;
    
    setIsSaving(true);
    try {
      const content = editor.getHTML();
      await onSave(content);
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  };

  const applyFormat = (newFormat: WritingEditorProps['format']) => {
    if (!editor || !newFormat) return;
    setCurrentFormat(newFormat);
    
    // Apply format-specific styles by updating placeholder extension options
    const placeholderExt = editor.extensionManager.extensions.find(
      (ext) => ext.name === 'placeholder'
    );
    if (placeholderExt && placeholderExt.options) {
      placeholderExt.options.placeholder = getPlaceholderText(newFormat);
    }
  };

  if (!editor) {
    return <div className="p-4 text-muted-foreground">Loading editor...</div>;
  }

  const stats = {
    words: editor.storage.characterCount.words(),
    characters: editor.storage.characterCount.characters(),
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-border bg-[#252526]">
        {/* Format Selection */}
        <Select value={currentFormat} onValueChange={applyFormat}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="novel">Novel</SelectItem>
            <SelectItem value="screenplay">Screenplay</SelectItem>
            <SelectItem value="stage_play">Stage Play</SelectItem>
            <SelectItem value="comic_script">Comic Script</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6" />

        {/* Formatting Buttons */}
        <Button
          size="sm"
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button
          size="sm"
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button
          size="sm"
          variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="flex-1" />

        {/* Save and Export */}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        
        <ExportMenu 
          content={editor.getHTML()}
          title={documentTitle}
          format={currentFormat}
        />
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-sm border-t border-border bg-[#252526] text-muted-foreground">
        <div>
          Words: {stats.words} | Characters: {stats.characters}
        </div>
        {lastSaved && (
          <div>
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions for format-specific content
function getPlaceholderText(format: WritingEditorProps['format']): string {
  switch (format) {
    case 'screenplay':
      return 'INT. LOCATION - DAY';
    case 'stage_play':
      return 'ACT I, SCENE 1';
    case 'comic_script':
      return 'PAGE 1, PANEL 1';
    case 'novel':
    default:
      return 'Start writing your story...';
  }
}

function getDefaultContent(format: WritingEditorProps['format']): string {
  switch (format) {
    case 'screenplay':
      return '<h1>FADE IN:</h1><p>INT. LOCATION - DAY</p><p></p><p>ACTION DESCRIPTION</p><p></p><p>CHARACTER NAME</p><p>(parenthetical)</p><p>Dialogue text here.</p>';
    case 'stage_play':
      return '<h1>ACT I</h1><h2>SCENE 1</h2><p>[Stage Direction]</p><p></p><p>CHARACTER NAME: Dialogue text here.</p>';
    case 'comic_script':
      return '<h1>PAGE 1</h1><p><strong>PANEL 1</strong></p><p>Description of visual content.</p><p></p><p>CAPTION: Narrative text.</p><p>CHARACTER (BALLOON): Dialogue.</p>';
    case 'novel':
    default:
      return '<h1>Chapter 1</h1><p></p>';
  }
}

function getTokenIcon(type: string): string {
  const icons: Record<string, string> = {
    character: '👤',
    location: '📍',
    object: '📦',
    creature: '🐉',
    faction: '🛡️',
    event: '📅',
  };
  return icons[type] || '🏷️';
}

function extractMentions(doc: any): Array<{ id: string; context: string }> {
  const mentions: Array<{ id: string; context: string }> = [];
  
  function traverse(node: any, context: string = '') {
    if (node.type === 'mention') {
      mentions.push({
        id: node.attrs.id,
        context: context.slice(-100), // Last 100 chars as context
      });
    }
    
    if (node.content) {
      node.content.forEach((child: any) => {
        const text = child.text || '';
        traverse(child, context + text);
      });
    }
  }
  
  traverse(doc);
  return mentions;
}
