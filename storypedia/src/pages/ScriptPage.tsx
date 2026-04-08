import { useParams, Link } from 'react-router-dom';
import { scriptsBySlug, genreLabels, statusLabels, statusColors } from '@/data/scripts';
import { pagesBySlug, categoryIcons } from '@/data/wiki';
import { ScriptReader } from '@/components/scripts/ScriptReader';
import { ArrowLeft, FileText } from 'lucide-react';

export default function ScriptPage() {
  const { slug } = useParams<{ slug: string }>();
  const script = slug ? scriptsBySlug.get(slug) : undefined;

  if (!script) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-20">
        <h1 className="font-mono text-2xl text-primary mb-4">Script Not Found</h1>
        <p className="text-muted-foreground mb-6 font-serif">
          The script "{slug}" doesn't exist yet.
        </p>
        <Link to="/scripts" className="inline-flex items-center gap-2 text-primary font-mono text-sm hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to scripts
        </Link>
      </div>
    );
  }

  const linkedPages = script.linkedSlugs
    .map(s => pagesBySlug.get(s))
    .filter(Boolean);

  return (
    <div className="flex-1 min-w-0 px-6 py-6 overflow-y-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground max-w-2xl mx-auto">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/scripts" className="hover:text-primary transition-colors">Scripts</Link>
        <span>/</span>
        <span className="text-foreground">{script.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-xs font-mono uppercase tracking-widest text-primary/70 bg-primary/5 px-2 py-0.5 rounded">
            {genreLabels[script.genre]}
          </span>
          <span className={`text-xs font-mono px-2 py-0.5 rounded border ${statusColors[script.status]}`}>
            {statusLabels[script.status]}
          </span>
        </div>
        <h1 className="font-mono text-3xl font-bold text-wiki-heading leading-tight mb-2">
          {script.title}
        </h1>
        <p className="font-serif text-foreground/70 text-sm">
          Project: <span className="text-foreground">{script.project}</span>
        </p>
        <p className="font-serif text-foreground/60 mt-2 leading-relaxed">
          {script.synopsis}
        </p>
        <div className="mt-4 h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
      </div>

      {/* Script content */}
      <ScriptReader script={script} />

      {/* Cross-links to wiki */}
      {linkedPages.length > 0 && (
        <div className="mt-10 pt-6 border-t border-border max-w-2xl mx-auto">
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Related Wiki Pages
          </h3>
          <div className="flex flex-wrap gap-2">
            {linkedPages.map(lp => lp && (
              <Link
                key={lp.slug}
                to={`/wiki/${lp.slug}`}
                className="inline-flex items-center gap-1.5 rounded border border-border bg-card px-3 py-1.5 text-sm font-mono text-foreground transition-all hover:border-primary/40 hover:text-primary hover:shadow-[0_0_8px_hsl(155,100%,50%,0.1)]"
              >
                <span>{categoryIcons[lp.category]}</span>
                {lp.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}