import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { scripts, genreLabels, statusLabels, statusColors, allGenres, allStatuses, type ScriptGenre, type ScriptStatus } from '@/data/scripts';

export function ScriptSidebar() {
  const { slug } = useParams();
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState<ScriptGenre | ''>('');
  const [statusFilter, setStatusFilter] = useState<ScriptStatus | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = scripts.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.project.toLowerCase().includes(q) || s.content.toLowerCase().includes(q);
    const matchGenre = !genreFilter || s.genre === genreFilter;
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchGenre && matchStatus;
  });

  const hasFilters = !!genreFilter || !!statusFilter;

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card/50 overflow-y-auto hidden lg:flex flex-col">
      <div className="p-4 space-y-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Scripts & Screenplays
        </h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search scripts..."
            className="w-full rounded border border-border bg-secondary pl-8 pr-3 py-1.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <Filter className="h-3 w-3" />
          Filters
          {hasFilters && (
            <span className="bg-primary/20 text-primary px-1.5 rounded text-[10px]">active</span>
          )}
        </button>

        {showFilters && (
          <div className="space-y-2 p-2 rounded border border-border/50 bg-secondary/50">
            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground">Genre</label>
              <select
                value={genreFilter}
                onChange={e => setGenreFilter(e.target.value as ScriptGenre | '')}
                className="w-full mt-0.5 rounded border border-border bg-background px-2 py-1 text-xs font-mono text-foreground focus:border-primary/40 focus:outline-none"
              >
                <option value="">All Genres</option>
                {allGenres.map(g => (
                  <option key={g} value={g}>{genreLabels[g]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground">Status</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as ScriptStatus | '')}
                className="w-full mt-0.5 rounded border border-border bg-background px-2 py-1 text-xs font-mono text-foreground focus:border-primary/40 focus:outline-none"
              >
                <option value="">All Statuses</option>
                {allStatuses.map(s => (
                  <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
              </select>
            </div>
            {hasFilters && (
              <button
                onClick={() => { setGenreFilter(''); setStatusFilter(''); }}
                className="flex items-center gap-1 text-[10px] font-mono text-primary hover:underline"
              >
                <X className="h-2.5 w-2.5" /> Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Script list */}
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {filtered.length === 0 && (
          <p className="text-xs text-muted-foreground font-mono py-2">No scripts found.</p>
        )}
        {filtered.map(s => (
          <Link
            key={s.slug}
            to={`/scripts/${s.slug}`}
            className={`block rounded px-3 py-2 transition-colors ${
              slug === s.slug
                ? 'bg-primary/10 border border-primary/20'
                : 'hover:bg-sidebar-accent'
            }`}
          >
            <div className={`text-sm font-mono truncate ${slug === s.slug ? 'text-primary font-medium' : 'text-foreground'}`}>
              {s.title}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-muted-foreground">{genreLabels[s.genre]}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${statusColors[s.status]}`}>
                {statusLabels[s.status]}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}