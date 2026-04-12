import { useMemo } from 'react';
import type { Script } from '@/data/scripts';

interface Props {
  script: Script;
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
  const lines = useMemo(() => {
    return script.content.split('\n').map(parseScriptLine);
  }, [script.content]);

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