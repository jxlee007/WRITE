import { useParams, Link } from 'react-router-dom';
import { pagesBySlug, categoryLabels, categoryIcons } from '@/data/wiki-generated';
import { WikiRenderer } from '@/components/wiki/WikiRenderer';
import { TableOfContents } from '@/components/wiki/TableOfContents';
import { ArrowLeft } from 'lucide-react';

export default function WikiPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? pagesBySlug.get(slug) : undefined;

  if (!page) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-20">
        <h1 className="font-mono text-2xl text-primary mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-6 font-serif">
          The page "{slug}" doesn't exist in this universe yet.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-mono text-sm hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Return to home
        </Link>
      </div>
    );
  }

  const linkedPages = page.links
    .map(s => pagesBySlug.get(s))
    .filter(Boolean);

  return (
    <div className="flex flex-1 min-h-0">
      <article className="flex-1 min-w-0 px-6 py-6 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="capitalize">{categoryLabels[page.category]}</span>
          <span>/</span>
          <span className="text-foreground">{page.title}</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{categoryIcons[page.category]}</span>
            <span className="text-xs font-mono uppercase tracking-widest text-primary/70 bg-primary/5 px-2 py-0.5 rounded">
              {page.category}
            </span>
          </div>
          <h1 className="font-mono text-3xl font-bold text-wiki-heading leading-tight">
            {page.title}
          </h1>
        </div>

        {/* Content */}
        <WikiRenderer content={page.content} />

        {/* Linked pages */}
        {linkedPages.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border">
            <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-3">
              See Also
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
      </article>

      <TableOfContents content={page.content} />
    </div>
  );
}