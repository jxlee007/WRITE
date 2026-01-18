import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Mention from "@tiptap/extension-mention";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Save,
  Undo,
  Redo,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Search,
  MoreVertical,
  Strikethrough,
  Eye,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  AISuggestionExtension,
  Suggestion,
} from "./WritingEditor/AISuggestionExtension";
import { SuggestionTooltip } from "./WritingEditor/SuggestionTooltip";
import { TokenPreviewCard } from "./WritingEditor/TokenPreviewCard";
import { applyFormatRules } from "./WritingEditor/FormatRules";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { ExportMenu } from "./ExportMenu";
import { useIsMobile } from "../hooks/use-mobile";

interface WritingEditorProps {
  documentId?: Id<"documents">;
  projectId?: Id<"projects">;
  documentTitle?: string;
  initialContent?: string;
  format?: "novel" | "screenplay" | "stage_play" | "comic_script";
  onSave?: (content: string) => void;
  onContentChange?: (content: string) => void;
}

export function WritingEditor({
  documentId,
  projectId,
  documentTitle = "Document",
  initialContent = "",
  format = "novel",
  onSave,
  onContentChange,
}: WritingEditorProps) {
  const isMobile = useIsMobile();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentFormat, setCurrentFormat] = useState(format);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<Suggestion[]>([]);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<Suggestion | null>(
    null,
  );
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hoveredToken, setHoveredToken] = useState<any>(null);
  const [tokenPreviewPos, setTokenPreviewPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Fetch tokens for mention suggestions - now works without projectId
  const tokens = useQuery(api.tokens.getTokens, projectId ? { projectId } : {});
  const trackTokenUsage = useMutation(api.tokenUsage.trackTokenUsage);
  const suggestions = useQuery(
    (api as any).suggestions?.getSuggestions,
    documentId ? { documentId } : "skip",
  );
  const acceptSuggestion = useMutation(
    (api as any).suggestions?.acceptSuggestion,
  );
  const rejectSuggestion = useMutation(
    (api as any).suggestions?.rejectSuggestion,
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Strike,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: getPlaceholderText(currentFormat),
      }),
      CharacterCount,
      AISuggestionExtension.configure({
        suggestions: aiSuggestions,
        onHover: (suggestion, pos) => {
          setHoveredSuggestion(suggestion);
          setTooltipPosition(pos);
        },
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: {
          items: ({ query }) => {
            if (!tokens) return [];
            return tokens
              .filter((token) =>
                token.name.toLowerCase().startsWith(query.toLowerCase()),
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
            let hoverTimeout: any;

            return {
              onStart: (props: any) => {
                component = document.createElement("div");
                component.className = "mention-suggestions";

                if (props.items.length === 0) {
                  component.innerHTML =
                    '<div class="mention-item">No tokens found</div>';
                } else {
                  props.items.forEach((item: any) => {
                    const div = document.createElement("div");
                    div.className = "mention-item";
                    div.innerHTML = `
                      <span class="mention-icon">${getTokenIcon(item.type)}</span>
                      <span class="mention-label">${item.label}</span>
                      <span class="mention-type">${item.type}</span>
                    `;
                    div.addEventListener("click", () => props.command(item));

                    // Add hover preview
                    div.addEventListener("mouseenter", () => {
                      const token = tokens?.find((t) => t._id === item.id);
                      if (token) {
                        const rect = div.getBoundingClientRect();
                        setHoveredToken(token);
                        setTokenPreviewPos({ x: rect.right + 10, y: rect.top });
                      }
                    });
                    div.addEventListener("mouseleave", () => {
                      clearTimeout(hoverTimeout);
                      hoverTimeout = setTimeout(() => {
                        setHoveredToken(null);
                        setTokenPreviewPos(null);
                      }, 200);
                    });

                    component.appendChild(div);
                  });
                }

                document.body.appendChild(component);

                // Position the popup
                const { left, top, height } = props.clientRect();
                component.style.position = "absolute";
                component.style.left = `${left}px`;
                component.style.top = `${top + height}px`;
              },
              onUpdate: (props: any) => {
                if (!component) return;
                component.innerHTML = "";

                if (props.items.length === 0) {
                  component.innerHTML =
                    '<div class="mention-item">No tokens found</div>';
                } else {
                  props.items.forEach((item: any) => {
                    const div = document.createElement("div");
                    div.className = "mention-item";
                    div.innerHTML = `
                      <span class="mention-icon">${getTokenIcon(item.type)}</span>
                      <span class="mention-label">${item.label}</span>
                      <span class="mention-type">${item.type}</span>
                    `;
                    div.addEventListener("click", () => props.command(item));
                    component.appendChild(div);
                  });
                }

                // Update position
                const { left, top, height } = props.clientRect();
                component.style.left = `${left}px`;
                component.style.top = `${top + height}px`;
              },
              onKeyDown: (props: any) => {
                if (props.event.key === "Escape") {
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
    editorProps: {
      handleKeyDown: (view, event) => {
        // Format-specific keyboard shortcuts
        if (editor) {
          return applyFormatRules(editor, currentFormat, event);
        }
        return false;
      },
    },
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
            context: mention.context || "",
          });
        });
      }
    },
  });

  // Update editor content when document changes
  useEffect(() => {
    if (editor && initialContent !== undefined) {
      const currentContent = editor.getHTML();
      if (currentContent !== initialContent) {
        editor.commands.setContent(
          initialContent || getDefaultContent(currentFormat),
        );
      }
    }
  }, [documentId, initialContent, editor, currentFormat]);

  // Update AI suggestions in editor
  useEffect(() => {
    if (editor && suggestions) {
      const mappedSuggestions: Suggestion[] = suggestions.map((s) => ({
        id: s._id,
        type: s.type as any,
        from: s.range.from,
        to: s.range.to,
        originalText: s.originalText,
        suggestedText: s.suggestedText,
        explanation: s.explanation,
        confidence: s.confidence,
      }));
      setAiSuggestions(mappedSuggestions);
    }
  }, [editor, suggestions]);

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

  const applyFormat = (newFormat: WritingEditorProps["format"]) => {
    if (!editor || !newFormat) return;
    setCurrentFormat(newFormat);

    // Apply format-specific styles by updating placeholder extension options
    const placeholderExt = editor.extensionManager.extensions.find(
      (ext) => ext.name === "placeholder",
    );
    if (placeholderExt && placeholderExt.options) {
      placeholderExt.options.placeholder = getPlaceholderText(newFormat);
    }
  };

  const handleFind = () => {
    if (!editor || !searchQuery) return;

    const { state } = editor;
    const { doc } = state;
    let found = false;

    doc.descendants((node, pos) => {
      if (node.isText && node.text) {
        const index = node.text
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase());
        if (index !== -1) {
          editor.commands.setTextSelection({
            from: pos + index,
            to: pos + index + searchQuery.length,
          });
          found = true;
          return false;
        }
      }
    });

    if (!found) {
      console.log("No matches found");
    }
  };

  const handleReplace = () => {
    if (!editor || !searchQuery) return;

    const { state } = editor;
    const { selection } = state;
    const selectedText = state.doc.textBetween(selection.from, selection.to);

    if (selectedText.toLowerCase() === searchQuery.toLowerCase()) {
      editor.commands.insertContentAt(
        { from: selection.from, to: selection.to },
        replaceText,
      );
    }
  };

  const handleReplaceAll = () => {
    if (!editor || !searchQuery) return;

    let content = editor.getHTML();
    const regex = new RegExp(searchQuery, "gi");
    content = content.replace(regex, replaceText);
    editor.commands.setContent(content);
  };

  const handleAcceptSuggestion = async (suggestion: Suggestion) => {
    if (!editor) return;

    // Replace text in editor
    editor.commands.insertContentAt(
      { from: suggestion.from, to: suggestion.to },
      suggestion.suggestedText,
    );

    // Mark as accepted in database
    if (documentId) {
      await acceptSuggestion({
        suggestionId: suggestion.id as Id<"suggestions">,
      });
    }

    setHoveredSuggestion(null);
    setTooltipPosition(null);
  };

  const handleRejectSuggestion = async (suggestion: Suggestion) => {
    if (documentId) {
      await rejectSuggestion({
        suggestionId: suggestion.id as Id<"suggestions">,
      });
    }

    setHoveredSuggestion(null);
    setTooltipPosition(null);
  };

  const generateAISuggestions = async () => {
    if (!editor || !documentId) return;

    // TODO: Implement actual AI suggestion generation with OpenRouter
    // For now, this is a placeholder that shows the UI works
    console.log("Generating AI suggestions for document:", documentId);
  };

  if (!editor) {
    return <div className="p-4 text-muted-foreground">Loading editor...</div>;
  }

  const stats = {
    words: editor.storage.characterCount.words(),
    characters: editor.storage.characterCount.characters(),
  };

  return (
    <div
      className={`flex flex-col h-full bg-[#1e1e1e] text-white format-${currentFormat}`}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-border bg-[#252526] overflow-x-auto">
        {/* Format Selection */}
        <Select value={currentFormat} onValueChange={applyFormat}>
          <SelectTrigger className="w-28 flex-shrink-0">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="novel">Novel</SelectItem>
            <SelectItem value="screenplay">Screenplay</SelectItem>
            <SelectItem value="stage_play">Stage Play</SelectItem>
            <SelectItem value="comic_script">Comic Script</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6 flex-shrink-0" />

        {/* AI Suggestions */}
        <Button
          size="sm"
          variant="ghost"
          onClick={generateAISuggestions}
          title="Generate AI Suggestions"
          className="flex-shrink-0"
        >
          <Sparkles className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 flex-shrink-0" />

        {/* Undo/Redo - Only on Mobile/Tablet */}
        {isMobile && (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              title="Undo (Ctrl+Z)"
              className="flex-shrink-0"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              title="Redo (Ctrl+Shift+Z)"
              className="flex-shrink-0"
            >
              <Redo className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6 flex-shrink-0" />
          </>
        )}

        {/* Format Menu - Consolidates text formatting and alignment on mobile */}
        {isMobile ? (
          <>
            {/* Compact Text Formatting Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0"
                  title="Text Formatting"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Text Formatting</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "bg-accent" : ""}
                >
                  <Bold className="h-4 w-4 mr-2" />
                  <span>Bold (Ctrl+B)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "bg-accent" : ""}
                >
                  <Italic className="h-4 w-4 mr-2" />
                  <span>Italic (Ctrl+I)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={editor.isActive("underline") ? "bg-accent" : ""}
                  title="Underline (Ctrl+U)"
                >
                  <UnderlineIcon className="h-4 w-4 mr-2" />
                  <span>Underline (Ctrl+U)</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs">
                  Headings
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""
                  }
                >
                  <Heading1 className="h-4 w-4 mr-2" />
                  <span>Heading 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""
                  }
                >
                  <Heading2 className="h-4 w-4 mr-2" />
                  <span>Heading 2</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs">Lists</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={editor.isActive("bulletList") ? "bg-accent" : ""}
                >
                  <List className="h-4 w-4 mr-2" />
                  <span>Bullet List</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={editor.isActive("orderedList") ? "bg-accent" : ""}
                >
                  <ListOrdered className="h-4 w-4 mr-2" />
                  <span>Ordered List</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs">
                  Alignment
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  className={
                    editor.isActive({ textAlign: "left" }) ? "bg-accent" : ""
                  }
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4 mr-2" />
                  <span>Align Left</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className={
                    editor.isActive({ textAlign: "center" }) ? "bg-accent" : ""
                  }
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4 mr-2" />
                  <span>Align Center</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className={
                    editor.isActive({ textAlign: "right" }) ? "bg-accent" : ""
                  }
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4 mr-2" />
                  <span>Align Right</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {/* Desktop: Consolidated Dropdowns for Formatting */}
            {/* Text Style Dropdown (Bold/Italic/Underline/Strikethrough) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0"
                  title="Text styles"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuLabel>Text Styles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "bg-accent" : ""}
                >
                  <Bold className="h-4 w-4 mr-2" />
                  <span>Bold (Ctrl+B)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "bg-accent" : ""}
                >
                  <Italic className="h-4 w-4 mr-2" />
                  <span>Italic (Ctrl+I)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={editor.isActive("underline") ? "bg-accent" : ""}
                >
                  <UnderlineIcon className="h-4 w-4 mr-2" />
                  <span>Underline (Ctrl+U)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "bg-accent" : ""}
                >
                  <Strikethrough className="h-4 w-4 mr-2" />
                  <span>Strikethrough</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 flex-shrink-0" />

            {/* Headings / Text Size Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0"
                  title="Headings"
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Headings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""
                  }
                >
                  <Heading1 className="h-4 w-4 mr-2" />
                  <span>H1</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""
                  }
                >
                  <Heading2 className="h-4 w-4 mr-2" />
                  <span>H2</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <span className="ml-6">Title (H1)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  <span className="ml-6">Normal text</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 3 }) ? "bg-accent" : ""
                  }
                >
                  <span className="ml-6">Sub-head (H3)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 flex-shrink-0" />

            {/* Lists Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0"
                  title="Lists"
                >
                  <List className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuLabel>Lists</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={editor.isActive("bulletList") ? "bg-accent" : ""}
                >
                  <List className="h-4 w-4 mr-2" />
                  <span>Bulleted list</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={editor.isActive("orderedList") ? "bg-accent" : ""}
                >
                  <ListOrdered className="h-4 w-4 mr-2" />
                  <span>Numbered list</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 flex-shrink-0" />

            {/* Alignment Buttons (kept as buttons for quick access) */}
            <Button
              size="sm"
              variant={
                editor.isActive({ textAlign: "left" }) ? "default" : "ghost"
              }
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              title="Align Left"
              className="flex-shrink-0"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={
                editor.isActive({ textAlign: "center" }) ? "default" : "ghost"
              }
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              title="Align Center"
              className="flex-shrink-0"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={
                editor.isActive({ textAlign: "right" }) ? "default" : "ghost"
              }
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              title="Align Right"
              className="flex-shrink-0"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </>
        )}

        <div className="flex-1" />

        {/* Find & Replace */}
        <Button
          size="sm"
          variant={showFindReplace ? "default" : "ghost"}
          onClick={() => setShowFindReplace(!showFindReplace)}
          title="Find & Replace (Ctrl+F)"
          className="flex-shrink-0"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Preview and Export */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowPreview(true)}
          className="flex-shrink-0"
          title="Preview"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>

        <ExportMenu
          content={editor.getHTML()}
          title={documentTitle}
          format={currentFormat}
        />
      </div>

      {/* Find & Replace Bar */}
      {showFindReplace && (
        <div className="flex items-center gap-2 p-2 border-b border-border bg-[#2d2d30]">
          <input
            type="text"
            placeholder="Find..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleFind();
              if (e.key === "Escape") setShowFindReplace(false);
            }}
            className="px-2 py-1 bg-[#3c3c3c] border border-border rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Replace..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleReplace();
              if (e.key === "Escape") setShowFindReplace(false);
            }}
            className="px-2 py-1 bg-[#3c3c3c] border border-border rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button size="sm" variant="ghost" onClick={handleFind}>
            Find
          </Button>
          <Button size="sm" variant="ghost" onClick={handleReplace}>
            Replace
          </Button>
          <Button size="sm" variant="ghost" onClick={handleReplaceAll}>
            Replace All
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowFindReplace(false)}
          >
            Close
          </Button>
        </div>
      )}

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>

      {/* AI Suggestion Tooltip */}
      {hoveredSuggestion && tooltipPosition && (
        <SuggestionTooltip
          suggestion={hoveredSuggestion}
          position={tooltipPosition}
          onAccept={() => handleAcceptSuggestion(hoveredSuggestion)}
          onReject={() => handleRejectSuggestion(hoveredSuggestion)}
        />
      )}

      {/* Token Preview Card */}
      {hoveredToken && tokenPreviewPos && (
        <TokenPreviewCard token={hoveredToken} position={tokenPreviewPos} />
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowPreview(false)}
          />
          <div className="relative max-w-3xl w-full bg-white text-black rounded shadow-lg overflow-auto max-h-[80vh] z-10">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="font-medium">Preview — {documentTitle}</div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </Button>
              </div>
            </div>
            <div
              className="p-6 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            />
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-sm border-t border-border bg-[#252526] text-muted-foreground">
        <div>
          Words: {stats.words} | Characters: {stats.characters}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs">
            Autosave: {isSaving ? "Saving..." : "On"}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-shrink-0"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          {lastSaved && (
            <div className="text-xs">
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions for format-specific content
function getPlaceholderText(format: WritingEditorProps["format"]): string {
  switch (format) {
    case "screenplay":
      return "INT. LOCATION - DAY";
    case "stage_play":
      return "ACT I, SCENE 1";
    case "comic_script":
      return "PAGE 1, PANEL 1";
    case "novel":
    default:
      return "Start writing your story...";
  }
}

function getDefaultContent(format: WritingEditorProps["format"]): string {
  switch (format) {
    case "screenplay":
      return "<h1>FADE IN:</h1><p>INT. LOCATION - DAY</p><p></p><p>ACTION DESCRIPTION</p><p></p><p>CHARACTER NAME</p><p>(parenthetical)</p><p>Dialogue text here.</p>";
    case "stage_play":
      return "<h1>ACT I</h1><h2>SCENE 1</h2><p>[Stage Direction]</p><p></p><p>CHARACTER NAME: Dialogue text here.</p>";
    case "comic_script":
      return "<h1>PAGE 1</h1><p><strong>PANEL 1</strong></p><p>Description of visual content.</p><p></p><p>CAPTION: Narrative text.</p><p>CHARACTER (BALLOON): Dialogue.</p>";
    case "novel":
    default:
      return "<h1>Chapter 1</h1><p></p>";
  }
}

function getTokenIcon(type: string): string {
  const icons: Record<string, string> = {
    character: "👤",
    location: "📍",
    object: "📦",
    creature: "🐉",
    faction: "🛡️",
    event: "📅",
  };
  return icons[type] || "🏷️";
}

function extractMentions(doc: any): Array<{ id: string; context: string }> {
  const mentions: Array<{ id: string; context: string }> = [];

  function traverse(node: any, context: string = "") {
    if (node.type === "mention") {
      mentions.push({
        id: node.attrs.id,
        context: context.slice(-100), // Last 100 chars as context
      });
    }

    if (node.content) {
      node.content.forEach((child: any) => {
        const text = child.text || "";
        traverse(child, context + text);
      });
    }
  }

  traverse(doc);
  return mentions;
}
