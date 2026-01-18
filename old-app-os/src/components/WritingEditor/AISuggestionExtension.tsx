import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface Suggestion {
  id: string;
  type: 'grammar' | 'spelling' | 'style' | 'clarity' | 'tone' | 'consistency';
  from: number;
  to: number;
  originalText: string;
  suggestedText: string;
  explanation: string;
  confidence?: number;
}

const SUGGESTION_COLORS = {
  grammar: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.15)' },
  spelling: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' },
  style: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
  clarity: { color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.15)' },
  tone: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' },
  consistency: { color: '#6366F1', bg: 'rgba(99, 102, 241, 0.15)' },
};

export interface AISuggestionOptions {
  suggestions: Suggestion[];
  onHover?: (suggestion: Suggestion | null, pos: { x: number; y: number } | null) => void;
}

export const AISuggestionExtension = Extension.create<AISuggestionOptions>({
  name: 'aiSuggestion',

  addOptions() {
    return {
      suggestions: [],
      onHover: undefined,
    };
  },

  addProseMirrorPlugins() {
    const extension = this;

    return [
      new Plugin({
        key: new PluginKey('aiSuggestion'),
        
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr, set) {
            set = set.map(tr.mapping, tr.doc);
            return set;
          },
        },

        props: {
          decorations(state) {
            const decorations: Decoration[] = [];
            const { suggestions } = extension.options;

            suggestions.forEach((suggestion) => {
              if (suggestion.from < state.doc.content.size && suggestion.to <= state.doc.content.size) {
                const colors = SUGGESTION_COLORS[suggestion.type];
                decorations.push(
                  Decoration.inline(suggestion.from, suggestion.to, {
                    class: `ai-suggestion ai-suggestion-${suggestion.type}`,
                    style: `background-color: ${colors.bg}; border-bottom: 2px solid ${colors.color}; cursor: pointer;`,
                    'data-suggestion-id': suggestion.id,
                    'data-suggestion-type': suggestion.type,
                  })
                );
              }
            });

            return DecorationSet.create(state.doc, decorations);
          },

          handleDOMEvents: {
            mousemove(view, event) {
              const target = event.target as HTMLElement;
              const suggestionEl = target.closest('.ai-suggestion');
              
              if (suggestionEl) {
                const suggestionId = suggestionEl.getAttribute('data-suggestion-id');
                const suggestion = extension.options.suggestions.find(s => s.id === suggestionId);
                
                if (suggestion && extension.options.onHover) {
                  const rect = suggestionEl.getBoundingClientRect();
                  extension.options.onHover(suggestion, {
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                  });
                }
              } else if (extension.options.onHover) {
                extension.options.onHover(null, null);
              }

              return false;
            },
          },
        },
      }),
    ];
  },
});
