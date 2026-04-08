import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { pagesBySlug } from '@/data/wiki';
import type { ReactNode } from 'react';

function processWikiLinks(content: string): string {
  // Convert [[slug|text]] or [[slug]] to markdown links
  return content.replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (_, slug, text) => {
    const displayText = text || pagesBySlug.get(slug)?.title || slug;
    return `[${displayText}](/wiki/${slug})`;
  });
}

function generateId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function WikiRenderer({ content }: { content: string }) {
  const processed = processWikiLinks(content);

  return (
    <div className="wiki-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith('/wiki/')) {
              const slug = href.replace('/wiki/', '');
              const exists = pagesBySlug.has(slug);
              return (
                <Link
                  to={href}
                  className={exists ? '' : 'opacity-50 line-through'}
                  title={exists ? undefined : 'Page not found'}
                >
                  {children}
                </Link>
              );
            }
            return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
          },
          h2: ({ children }) => {
            const text = extractText(children);
            return <h2 id={generateId(text)}>{children}</h2>;
          },
          h3: ({ children }) => {
            const text = extractText(children);
            return <h3 id={generateId(text)}>{children}</h3>;
          },
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border bg-muted px-3 py-2 text-left font-mono text-xs uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2">{children}</td>
          ),
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}

function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as any).props.children);
  }
  return '';
}