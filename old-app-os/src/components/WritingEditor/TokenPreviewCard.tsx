import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface TokenPreviewCardProps {
  token: {
    _id: string;
    name: string;
    type: string;
    description: string;
    primaryImageUrl?: string;
    metadata?: {
      tags?: string[];
    };
  };
  position: { x: number; y: number };
}

const TOKEN_ICONS: Record<string, string> = {
  character: '👤',
  location: '📍',
  object: '🎯',
  creature: '🐉',
  faction: '⚔️',
  event: '⚡',
};

export function TokenPreviewCard({ token, position }: TokenPreviewCardProps) {
  return (
    <div
      className="fixed z-50 w-72 animate-in fade-in-0 zoom-in-95"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateY(8px)',
      }}
    >
      <Card className="p-4 shadow-lg border-border/50 backdrop-blur-sm bg-popover/95">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <span className="text-2xl">{TOKEN_ICONS[token.type] || '📄'}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{token.name}</h4>
              <Badge variant="secondary" className="mt-1">
                {token.type}
              </Badge>
            </div>
          </div>

          {/* Image */}
          {token.primaryImageUrl && (
            <img
              src={token.primaryImageUrl}
              alt={token.name}
              className="w-full h-32 object-cover rounded-md"
            />
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {token.description}
          </p>

          {/* Tags */}
          {token.metadata?.tags && token.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {token.metadata.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
