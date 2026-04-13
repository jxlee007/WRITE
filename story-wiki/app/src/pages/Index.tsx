import { Link } from "react-router-dom";
import {
  categoryLabels,
  categoryIcons,
  pagesByCategory,
  type PageCategory,
} from "@/data/wiki-generated";
import { Terminal, ArrowRight } from "lucide-react";

const categoryOrder: PageCategory[] = [
  "story",
  "character",
  "theme",
  "technique",
  "world",
  "analysis",
  "idea",
];

export default function Index() {
  return (
    <div className="flex-1 px-6 py-8 max-w-4xl">
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Terminal className="h-8 w-8 text-primary animate-glow-pulse" />
          <h1 className="font-mono text-4xl font-bold text-wiki-heading">
            Storypedia
          </h1>
        </div>
        <p className="font-serif text-lg text-foreground/80 leading-relaxed max-w-xl">
          Welcome to the encyclopedia of my creative universe. Explore stories,
          characters, worlds, and the techniques that bring them to life.
        </p>
        <div className="mt-4 h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
      </div>

      {/* Categories grid */}
      <div className="columns-1 sm:columns-2 gap-6 space-y-6">
        {categoryOrder.map((cat) => {
          const pages = pagesByCategory[cat] || [];
          return (
            <div
              key={cat}
              /* break-inside-avoid prevents the card from splitting between columns */
              className="break-inside-avoid rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-[0_0_20px_hsl(155,100%,50%,0.05)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{categoryIcons[cat]}</span>
                <h2 className="font-mono text-lg font-semibold text-wiki-heading">
                  {categoryLabels[cat]}
                </h2>
                <span className="ml-auto text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {pages.length}
                </span>
              </div>
              <ul className="space-y-1">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      to={`/wiki/${page.slug}`}
                      className="group flex items-center gap-2 rounded px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-primary hover:bg-primary/5"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 transition-opacity text-primary" />
                      <span className="font-serif">{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-10 pt-6 border-t border-border">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">
            {Object.values(pagesByCategory).flat().length}
          </span>{" "}
          pages · <span className="text-primary">{categoryOrder.length}</span>{" "}
          categories · <span className="text-primary">∞</span> connections
        </p>
      </div>
    </div>
  );
}
