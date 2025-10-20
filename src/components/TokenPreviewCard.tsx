import type { Doc } from '../../convex/_generated/dataModel';

interface TokenPreviewCardProps {
  token: Doc<"tokens">;
}

export function TokenPreviewCard({ token }: TokenPreviewCardProps) {
  const getTypeEmoji = (type: string) => {
    const emojiMap: { [key: string]: string } = {
      character: '👤',
      location: '🏰',
      object: '⚔️',
      creature: '👹',
      faction: '🏛️',
      event: '⚡',
    };
    return emojiMap[type] || '🏷️';
  };
  
  return (
    <div className="bg-card rounded-lg p-3 space-y-2 border border-border hover:border-primary/50 transition cursor-pointer group">
      <div className="flex items-center gap-2">
        <span className="text-xl">{getTypeEmoji(token.type)}</span>
        <span className="text-xs text-muted-foreground uppercase font-semibold">
          {token.type}
        </span>
      </div>
      
      <div className="font-medium text-sm truncate group-hover:text-primary transition">
        {token.name}
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2">
        {token.description || 'No description'}
      </p>
    </div>
  );
}
