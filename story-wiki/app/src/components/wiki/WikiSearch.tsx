import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wikiPages, categoryIcons } from '@/data/wiki-generated';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WikiSearch({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const results = useMemo(() => {
    if (!query.trim()) return wikiPages;
    const q = query.toLowerCase();
    return wikiPages.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.category.includes(q)
    );
  }, [query]);

  const handleSelect = (slug: string) => {
    navigate(`/wiki/${slug}`);
    onOpenChange(false);
    setQuery('');
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search all pages..."
        value={query}
        onValueChange={setQuery}
        className="font-mono"
      />
      <CommandList>
        <CommandEmpty className="py-6 text-center text-sm text-muted-foreground font-mono">
          No pages found.
        </CommandEmpty>
        <CommandGroup heading="Results">
          {results.map(page => (
            <CommandItem
              key={page.slug}
              value={page.slug + ' ' + page.title}
              onSelect={() => handleSelect(page.slug)}
              className="cursor-pointer"
            >
              <span className="mr-2">{categoryIcons[page.category]}</span>
              <span className="font-mono text-sm">{page.title}</span>
              <span className="ml-auto text-xs text-muted-foreground capitalize">{page.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}