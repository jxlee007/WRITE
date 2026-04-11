import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { pagesByCategory, categoryLabels, categoryIcons, type PageCategory } from '@/data/wiki';

const categoryOrder: PageCategory[] = ['story', 'character', 'theme', 'technique', 'world', 'analysis', 'idea'];

export function WikiSidebar() {
  const { slug } = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    categoryOrder.forEach(cat => {
      init[cat] = true;
    });
    return init;
  });

  const toggle = (cat: string) => {
    setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-card/50 overflow-y-auto hidden lg:block">
      <div className="p-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Navigation
        </h2>
        <nav className="space-y-1">
          {categoryOrder.map(cat => {
            const pages = pagesByCategory[cat] || [];
            const isExpanded = expanded[cat];
            return (
              <div key={cat}>
                <button
                  onClick={() => toggle(cat)}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm font-mono text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                >
                  {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                  <span>{categoryIcons[cat]}</span>
                  <span>{categoryLabels[cat]}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{pages.length}</span>
                </button>
                {isExpanded && (
                  <div className="ml-4 border-l border-border/50 pl-2 mt-1 space-y-0.5">
                    {pages.map(page => (
                      <Link
                        key={page.slug}
                        to={`/wiki/${page.slug}`}
                        className={`block rounded px-2 py-1 text-sm transition-colors truncate ${
                          slug === page.slug
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
                        }`}
                      >
                        {page.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}