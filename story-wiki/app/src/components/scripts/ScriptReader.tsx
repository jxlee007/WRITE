import { useMemo } from 'react';
import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import type { Script } from '@/data/scripts';

interface Props {
  script: Script;
}

function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as any).props.children);
  }
  return '';
}

// Parse script content into styled blocks
function parseScriptLine(line: string): { type: string; text: string } {
  const trimmed = line.trim();

  // Scene headings (INT./EXT.)
  if (/^(INT\.|EXT\.|INT\/EXT\.)/.test(trimmed)) {
    return { type: 'scene-heading', text: trimmed };
  }
  // Act/title cards
  if (/^(ACT |TITLE CARD:|COLD OPEN|FADE IN:|FADE OUT|FADE TO|SMASH TO|SMASH CUT|CUT TO)/.test(trimmed)) {
    return { type: 'direction-major', text: trimmed };
  }
  // Transitions
  if (/^(SUPER:|ON SCREEN:|ON PHONE:|ON CARD:)/.test(trimmed)) {
    return { type: 'on-screen', text: trimmed };
  }
  // Character names (ALL CAPS line that's a name, possibly with (V.O.) etc.)
  if (/^[A-Z][A-Z\s.'()-]+$/.test(trimmed) && trimmed.length < 60 && !trimmed.startsWith('A ') && !trimmed.startsWith('THE ')) {
    return { type: 'character', text: trimmed };
  }
  // Parentheticals
  if (/^\(.*\)$/.test(trimmed)) {
    return { type: 'parenthetical', text: trimmed };
  }
  // Scene separator
  if (trimmed === '---') {
    return { type: 'separator', text: '' };
  }
  // Writer's notes
  if (/^\[.*\]$/.test(trimmed)) {
    return { type: 'note', text: trimmed };
  }
  // Montage
  if (/^MONTAGE/.test(trimmed)) {
    return { type: 'direction-major', text: trimmed };
  }
  // Stage direction in lines starting with —
  if (trimmed.startsWith('—')) {
    return { type: 'action-beat', text: trimmed };
  }
  // Empty line
  if (!trimmed) {
    return { type: 'blank', text: '' };
  }

  return { type: 'action', text: trimmed };
}

export function ScriptReader({ script }: Props) {
  const isMarkdown = useMemo(() => {
    return script.content.includes('# ') || /^\s*#/m.test(script.content);
  }, [script.content]);

  const lines = useMemo(() => {
    if (isMarkdown) return [];
    return script.content.split('\n').map(parseScriptLine);
  }, [script.content, isMarkdown]);

  if (isMarkdown) {
    return (
      <div className="script-reader max-w-2xl mx-auto font-mono text-sm leading-relaxed space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-center font-bold text-foreground uppercase tracking-widest pt-8 pb-4 text-sm border-b border-border/30 mb-6">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-primary font-bold uppercase tracking-wide pt-6 pb-2 text-xs border-b border-primary/20 mb-2 mt-6">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-primary/90 font-semibold uppercase tracking-wider pt-4 pb-1 text-xs border-b border-primary/10 mb-2 mt-4">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-foreground font-semibold pt-3 pb-1 text-xs uppercase tracking-wide">
                {children}
              </h4>
            ),
            p: ({ children }) => {
              const text = extractText(children);
              const isChar = /^[A-Z][A-Z\s.'()-]+$/.test(text.trim()) && text.trim().length < 60 && !text.trim().startsWith('A ') && !text.trim().startsWith('THE ');
              if (isChar) {
                return (
                  <p className="text-center text-primary/90 font-semibold uppercase tracking-wider pt-4 pb-0.5 text-xs">
                    {children}
                  </p>
                );
              }
              if (/^\(.*\)$/.test(text.trim())) {
                return (
                  <p className="text-center text-muted-foreground italic text-xs pb-0.5">
                    {children}
                  </p>
                );
              }
              return <p className="text-foreground/90 py-0.5">{children}</p>;
            },
            ul: ({ children }) => (
              <ul className="list-disc list-inside pl-4 space-y-1 my-2">
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li className="text-foreground/80 py-0.5">
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="text-primary font-semibold">{children}</strong>
            ),
            hr: () => (
              <div className="py-4">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            ),
          }}
        >
          {script.content}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="script-reader max-w-2xl mx-auto font-mono text-sm leading-relaxed space-y-0">
      {lines.map((line, i) => {
        switch (line.type) {
          case 'scene-heading':
            return (
              <p key={i} className="text-primary font-bold uppercase tracking-wide pt-6 pb-2 text-xs border-b border-primary/20 mb-2">
                {line.text}
              </p>
            );
          case 'direction-major':
            return (
              <p key={i} className="text-center font-bold text-foreground uppercase tracking-widest py-4 text-xs">
                {line.text}
              </p>
            );
          case 'on-screen':
            return (
              <p key={i} className="text-accent italic pl-8 pr-8 py-1 text-xs bg-accent/5 rounded my-2">
                {line.text}
              </p>
            );
          case 'character':
            return (
              <p key={i} className="text-center text-primary/90 font-semibold uppercase tracking-wider pt-4 pb-0.5 text-xs">
                {line.text}
              </p>
            );
          case 'parenthetical':
            return (
              <p key={i} className="text-center text-muted-foreground italic text-xs pb-0.5">
                {line.text}
              </p>
            );
          case 'separator':
            return (
              <div key={i} className="py-4">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            );
          case 'note':
            return (
              <p key={i} className="text-muted-foreground italic text-xs bg-muted/30 rounded p-3 my-4 border border-border/50">
                {line.text}
              </p>
            );
          case 'action-beat':
            return (
              <p key={i} className="text-foreground/80 pl-4 py-0.5 text-xs">
                {line.text}
              </p>
            );
          case 'blank':
            return <div key={i} className="h-2" />;
          case 'action':
          default:
            return (
              <p key={i} className="text-foreground/90 py-0.5">
                {line.text}
              </p>
            );
        }
      })}
    </div>
  );
}