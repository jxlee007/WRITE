import { useState, useRef } from 'react';
import { Printer, ChevronDown, ChevronRight, Film, MapPin, Users, Target, Lock, FileEdit } from 'lucide-react';
import type { ProseWork, ProseScene, ProseArc } from '@/data/prose-generated';
import { proseWorksBySlug } from '@/data/prose-generated';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TreatmentReaderProps {
  proseSlug: string;
}

// ─── Scene status badge ───────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProseScene['status'] }) {
  if (status === 'locked') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 bg-emerald-400/5 border border-emerald-400/20 px-1.5 py-0.5 rounded">
        <Lock className="h-2.5 w-2.5" />
        Locked
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-amber-400/80 bg-amber-400/5 border border-amber-400/20 px-1.5 py-0.5 rounded">
      <FileEdit className="h-2.5 w-2.5" />
      {status === 'revised' ? 'Revised' : 'Draft'}
    </span>
  );
}

// ─── Single Scene Card ────────────────────────────────────────────────────────

function SceneCard({ scene, index }: { scene: ProseScene; index: number }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="treatment-scene group mb-6 border border-border/60 rounded-lg overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_20px_hsl(155,100%,50%,0.04)]"
      id={`scene-${scene.sceneId}`}
    >
      {/* Scene header — always visible */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-muted/30 transition-colors"
        aria-expanded={expanded}
      >
        {/* Scene number pill */}
        <div className="shrink-0 mt-0.5 w-10 h-10 rounded-md bg-primary/5 border border-primary/20 flex items-center justify-center">
          <span className="font-mono text-xs text-primary font-bold">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-mono text-sm font-semibold text-wiki-heading leading-tight">
              {scene.title}
            </h3>
            <StatusBadge status={scene.status} />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {scene.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary/50" />
                {scene.location}
              </span>
            )}
            {scene.characters && (
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3 text-primary/50" />
                {scene.characters}
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0 text-muted-foreground/50 mt-0.5 transition-transform duration-200" style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      {/* Scene purpose strip */}
      {scene.purpose && (
        <div className="px-6 pb-3 flex items-start gap-1.5 text-xs text-muted-foreground/70 italic border-b border-border/40">
          <Target className="h-3 w-3 mt-0.5 shrink-0 text-primary/40" />
          <span>{scene.purpose}</span>
        </div>
      )}

      {/* Prose body — collapsible */}
      {expanded && (
        <div className="px-6 py-5 treatment-prose">
          {scene.body.split(/\n\n+/).map((para, i) => (
            para.trim() && (
              <p key={i} className="font-serif text-foreground/90 leading-[1.85] mb-5 last:mb-0 text-[0.96rem]">
                {para.trim()}
              </p>
            )
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Arc Section ─────────────────────────────────────────────────────────────

function ArcSection({
  arc,
  scenes,
  arcIndex,
}: {
  arc: ProseArc;
  scenes: ProseScene[];
  arcIndex: number;
}) {
  const arcScenes = scenes.filter(s => s.arcName === arc.name);
  const [open, setOpen] = useState(true);

  if (arcScenes.length === 0) return null;

  return (
    <section className="treatment-arc mb-10">
      {/* Arc heading */}
      <button
        onClick={() => setOpen(o => !o)}
        className="group/arc w-full flex items-center gap-3 mb-5 text-left"
        aria-expanded={open}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70 bg-primary/5 border border-primary/20 px-3 py-1 rounded-full whitespace-nowrap">
          Arc {String(arcIndex + 1).padStart(2, '0')} — {arc.name}
        </span>
        <div className="text-primary/30 transition-transform duration-200 group-hover/arc:text-primary/60" style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
      </button>

      {arc.note && (
        <p className="font-serif text-muted-foreground/70 text-sm italic text-center mb-6 px-8">
          {arc.note}
        </p>
      )}

      {open && arcScenes.map((scene, i) => (
        <SceneCard key={scene.sceneId} scene={scene} index={i} />
      ))}
    </section>
  );
}

// ─── Cover Page ───────────────────────────────────────────────────────────────

function CoverPage({ work }: { work: ProseWork }) {
  const lockedPct = work.sceneCount > 0
    ? Math.round((work.lockedCount / work.sceneCount) * 100)
    : 0;

  return (
    <div className="treatment-cover mb-12 text-center py-10 px-6 rounded-xl border border-border/50 bg-card/40 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,hsl(155,100%,50%,0.06),transparent_60%)]" />

      <div className="relative">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Film className="h-5 w-5 text-primary/60" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary/60">
            Treatment — {work.genre}
          </span>
        </div>

        <h1 className="font-mono text-4xl font-bold text-wiki-heading leading-tight mb-2 treatment-title">
          {work.storyTitle}
        </h1>

        <div className="mt-1 mb-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <p className="font-serif text-foreground/80 text-base leading-relaxed max-w-xl mx-auto mb-8 treatment-logline italic">
          "{work.logline}"
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
          <span>
            <span className="text-primary font-semibold">{work.sceneCount}</span> scenes
          </span>
          <span className="text-border">|</span>
          <span>
            <span className="text-primary font-semibold">{work.arcs.length}</span> arcs
          </span>
          <span className="text-border">|</span>
          <span>
            <span className="text-emerald-400 font-semibold">{lockedPct}%</span> locked
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 mx-auto max-w-xs h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-700"
            style={{ width: `${lockedPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main TreatmentReader ─────────────────────────────────────────────────────

export function TreatmentReader({ proseSlug }: TreatmentReaderProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const work = proseWorksBySlug.get(proseSlug);

  if (!work) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          Treatment data not found for <code className="text-primary">{proseSlug}</code>.
        </p>
        <p className="font-mono text-xs text-muted-foreground/50 mt-2">
          Run <code>npm run predev</code> to regenerate.
        </p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 px-1 no-print">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="text-primary/60">◆</span>
          <span>Prose Treatment</span>
          <span className="text-border">·</span>
          <span>{work.sceneCount} scenes · {work.arcs.length} arcs</span>
        </div>
        <button
          id="treatment-print-btn"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-card text-xs font-mono text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-200 hover:shadow-[0_0_12px_hsl(155,100%,50%,0.1)]"
        >
          <Printer className="h-3.5 w-3.5" />
          Export PDF
        </button>
      </div>

      {/* Treatment document */}
      <div ref={printRef} className="treatment-document" id="treatment-document">
        <CoverPage work={work} />

        {work.arcs.length > 0 ? (
          work.arcs.map((arc, i) => (
            <ArcSection
              key={arc.name}
              arc={arc}
              scenes={work.scenes}
              arcIndex={i}
            />
          ))
        ) : (
          // Fallback: no arc structure, just render scenes in order
          work.scenes.map((scene, i) => (
            <SceneCard key={scene.sceneId} scene={scene} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
