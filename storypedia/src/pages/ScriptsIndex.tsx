import { Link } from 'react-router-dom';
import { scripts, genreLabels, statusLabels, statusColors } from '@/data/scripts';
import { FileText, ArrowRight } from 'lucide-react';

export default function ScriptsIndex() {
  return (
    <div className="flex-1 px-6 py-8 max-w-4xl">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <FileText className="h-8 w-8 text-primary animate-glow-pulse" />
          <h1 className="font-mono text-4xl font-bold text-wiki-heading">Scripts & Screenplays</h1>
        </div>
        <p className="font-serif text-lg text-foreground/80 leading-relaxed max-w-xl">
          My personal collection of scripts, screenplays, and dramatic works — from early drafts to completed pieces.
        </p>
        <div className="mt-4 h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {scripts.map(s => (
          <Link
            key={s.slug}
            to={`/scripts/${s.slug}`}
            className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-[0_0_20px_hsl(155,100%,50%,0.05)]"
          >
            <div className="flex items-start justify-between mb-2">
              <h2 className="font-mono text-lg font-semibold text-wiki-heading group-hover:text-primary transition-colors">
                {s.title}
              </h2>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
            </div>
            <p className="font-serif text-sm text-muted-foreground line-clamp-2 mb-3">
              {s.synopsis}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {genreLabels[s.genre]}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusColors[s.status]}`}>
                {statusLabels[s.status]}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                {s.project}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-border">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">{scripts.length}</span> scripts ·{' '}
          <span className="text-primary">{new Set(scripts.map(s => s.genre)).size}</span> genres ·{' '}
          <span className="text-primary">{scripts.filter(s => s.status === 'completed').length}</span> completed
        </p>
      </div>
    </div>
  );
}