import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownRendererProps {
  content: string;
  isUser?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, isUser = false }) => {
  return (
    <div className={`markdown-content ${isUser ? 'user-message' : 'assistant-message'}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Headings
          h1: ({ node, ...props }) => (
            <h1 className="text-lg font-bold mt-4 mb-2 text-foreground" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-base font-bold mt-3 mb-2 text-foreground" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-sm font-bold mt-2 mb-1 text-foreground" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-sm font-semibold mt-2 mb-1 text-foreground" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-xs font-semibold mt-1 mb-1 text-foreground" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-xs font-semibold mt-1 mb-1 text-muted-foreground" {...props} />
          ),
          // Paragraphs
          p: ({ node, ...props }) => (
            <p className="mb-2 text-sm leading-relaxed text-foreground" {...props} />
          ),
          // Links
          a: ({ node, ...props }) => (
            <a
              className="text-accent hover:underline break-words"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // Code
          code: ({ node, inline, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-muted/50 rounded px-1.5 py-0.5 text-xs font-mono text-accent break-words"
                  {...props}
                />
              );
            }
            return <code className="font-mono text-xs" {...props} />;
          },
          // Code blocks
          pre: ({ node, ...props }) => (
            <pre
              className="bg-muted/70 rounded-lg p-3 mb-2 overflow-x-auto text-xs leading-relaxed border border-border/30"
              {...props}
            />
          ),
          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-accent/50 pl-3 my-2 py-1 text-sm text-muted-foreground italic"
              {...props}
            />
          ),
          // Lists
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-2 ml-2 space-y-1 text-sm" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-2 ml-2 space-y-1 text-sm" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-sm text-foreground" {...props} />
          ),
          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-sm border-collapse border border-border/30" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-muted/50 border-b border-border/30" {...props} />
          ),
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => (
            <tr className="border-b border-border/30 hover:bg-muted/20" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-3 py-2 text-left font-semibold text-foreground" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-3 py-2 text-foreground" {...props} />
          ),
          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr className="my-3 border-border/30" {...props} />
          ),
          // Strong and emphasis
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-foreground" {...props} />
          ),
          // Images
          img: ({ node, ...props }) => (
            <img
              className="max-w-full h-auto rounded-md my-2 border border-border/20"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
