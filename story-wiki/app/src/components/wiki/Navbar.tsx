import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Terminal, FileText, BookOpen, Menu, X } from 'lucide-react';
import { WikiSearch } from './WikiSearch';

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isScripts = location.pathname.startsWith('/scripts');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="h-5 w-5 text-primary transition-all group-hover:drop-shadow-[0_0_6px_hsl(155,100%,50%)]" />
            <span className="font-mono text-lg font-bold tracking-tight text-foreground">
              Storypedia
            </span>
            <span className="hidden md:inline text-xs font-mono text-muted-foreground ml-1">
              // the wiki of my creative universe
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden sm:flex items-center gap-1 ml-4">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                !isScripts ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Wiki
            </Link>
            <Link
              to="/scripts"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                isScripts ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Scripts
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground font-mono"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline text-xs bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-border bg-background/95 backdrop-blur-md px-4 py-3 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-mono transition-colors ${
              !isScripts ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Wiki
          </Link>
          <Link
            to="/scripts"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-mono transition-colors ${
              isScripts ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="h-4 w-4" />
            Scripts & Screenplays
          </Link>
        </div>
      )}

      <WikiSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}