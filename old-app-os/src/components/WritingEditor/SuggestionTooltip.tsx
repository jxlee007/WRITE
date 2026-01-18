import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Check, X, Edit } from 'lucide-react';
import { Suggestion } from './AISuggestionExtension';

interface SuggestionTooltipProps {
  suggestion: Suggestion;
  position: { x: number; y: number };
  onAccept: () => void;
  onReject: () => void;
  onModify?: () => void;
}

const SUGGESTION_COLORS = {
  grammar: '#3B82F6',
  spelling: '#EF4444',
  style: '#10B981',
  clarity: '#8B5CF6',
  tone: '#F59E0B',
  consistency: '#6366F1',
};

export function SuggestionTooltip({
  suggestion,
  position,
  onAccept,
  onReject,
  onModify,
}: SuggestionTooltipProps) {
  return (
    <div
      className="fixed z-50 w-80 rounded-lg border bg-popover p-4 shadow-lg animate-in fade-in-0 zoom-in-95"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 10}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            style={{
              borderColor: SUGGESTION_COLORS[suggestion.type],
              color: SUGGESTION_COLORS[suggestion.type],
            }}
          >
            {suggestion.type}
          </Badge>
          {suggestion.confidence !== undefined && (
            <span className="text-xs text-muted-foreground">
              {Math.round(suggestion.confidence * 100)}% confident
            </span>
          )}
        </div>

        {/* Original Text */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Original:</p>
          <p className="text-sm line-through opacity-60">{suggestion.originalText}</p>
        </div>

        {/* Suggested Text */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Suggestion:</p>
          <p className="text-sm font-medium text-foreground">{suggestion.suggestedText}</p>
        </div>

        {/* Explanation */}
        <p className="text-xs text-muted-foreground">{suggestion.explanation}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onAccept}
            className="flex-1"
          >
            <Check className="h-3 w-3 mr-1" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onReject}
          >
            <X className="h-3 w-3" />
          </Button>
          {onModify && (
            <Button
              size="sm"
              variant="outline"
              onClick={onModify}
            >
              <Edit className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
