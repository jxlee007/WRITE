import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Link } from 'react-router-dom';
import { pagesBySlug } from '@/data/wiki-generated';
import type { ReactNode } from 'react';

function processWikiLinks(content: string): string {
  // Convert [[slug|text]] or [[slug]] to markdown links
  return content.replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (_, rawSlug, text) => {
    const slugId = generateId(rawSlug.trim());
    const displayText = text || pagesBySlug.get(slugId)?.title || rawSlug;
    return `[${displayText}](/wiki/${slugId})`;
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
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          a: ({ href, children }) => {
            let targetHref = href;
            let isWikiLink = false;
            let slug = '';

            if (href?.startsWith('/wiki/')) {
              isWikiLink = true;
              slug = href.replace('/wiki/', '');
            } else if (href && href.toLowerCase().endsWith('.md')) {
              try {
                const decodedHref = decodeURIComponent(href);
                const parts = decodedHref.split('/');
                const filename = parts[parts.length - 1];
                const basename = filename.replace(/\.md$/i, '');
                slug = generateId(basename);
                targetHref = `/wiki/${slug}`;
                isWikiLink = true;
              } catch (e) {
                // Ignore decoding errors
              }
            }

            if (isWikiLink) {
              const exists = pagesBySlug.has(slug);
              return (
                <Link
                  to={targetHref || ''}
                  className={exists ? '' : 'opacity-50 line-through'}
                  title={exists ? undefined : 'Page not found'}
                >
                  {children}
                </Link>
              );
            }
            return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
          },
          img: ({ src, alt }) => {
            let resolvedSrc = src || '';
            if (resolvedSrc.includes('assets/')) {
              const parts = resolvedSrc.split('assets/');
              let filename = parts[parts.length - 1];
              filename = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');
              resolvedSrc = `${import.meta.env.BASE_URL}assets/${filename}`;
            }

            let width = 'auto';
            let alignClass = '';
            let cleanAlt = alt || '';

            if (alt && alt.includes('|')) {
              const segments = alt.split('|').map(s => s.trim());
              cleanAlt = segments[0];

              segments.slice(1).forEach(seg => {
                const lowerSeg = seg.toLowerCase();
                if (lowerSeg === 'left') {
                  alignClass = 'float-left mr-6 mb-6';
                } else if (lowerSeg === 'right') {
                  alignClass = 'float-right ml-6 mb-6';
                } else if (lowerSeg === 'center') {
                  alignClass = 'mx-auto block my-6';
                } else if (lowerSeg === 'w-full') {
                  width = '100%';
                } else if (lowerSeg.endsWith('%') || lowerSeg.endsWith('px') || !isNaN(Number(lowerSeg))) {
                  width = lowerSeg.endsWith('%') || lowerSeg.endsWith('px') ? lowerSeg : `${lowerSeg}px`;
                }
              });
            }

            return (
              <span className={`inline-block clear-both ${alignClass}`} style={{ width: alignClass === 'mx-auto block my-6' || width === '100%' ? '100%' : 'auto' }}>
                <img
                  src={resolvedSrc}
                  alt={cleanAlt}
                  className="rounded-md border border-border bg-card shadow-md max-w-full"
                  style={{ width: width === '100%' ? '100%' : width, height: 'auto', display: alignClass === 'mx-auto block my-6' ? 'block' : 'inline-block', margin: alignClass === 'mx-auto block my-6' ? '0 auto' : undefined }}
                />
                {cleanAlt && (
                  <span className="block text-center text-xs text-muted-foreground mt-2 font-serif italic">
                    {cleanAlt}
                  </span>
                )}
              </span>
            );
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