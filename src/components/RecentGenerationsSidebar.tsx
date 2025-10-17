import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClockIcon } from "lucide-react";

interface RecentGenerationsSidebarProps {
  projectId?: Id<"projects"> | null;
  onReusePrompt: (prompt: string) => void;
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
};

export function RecentGenerationsSidebar({
  projectId,
  onReusePrompt,
}: RecentGenerationsSidebarProps) {
  const recentGenerations = useQuery(
    api.generatedImages.getRecentImages,
    projectId ? { projectId, limit: 10 } : "skip"
  );

  return (
    <div className="w-80 border-r border-border bg-[#252526] flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recent Generations
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Click any image to reuse its prompt
        </p>
      </div>

      {/* Generations List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {recentGenerations && recentGenerations.length > 0 ? (
            recentGenerations.map((generation) => (
              <Card
                key={generation._id}
                className="p-3 cursor-pointer hover:bg-card/80 transition-all group"
                onClick={() => onReusePrompt(generation.prompt)}
              >
                <div className="space-y-2">
                  <div className="aspect-square rounded-md overflow-hidden bg-muted">
                    <img
                      src={generation.imageUrl}
                      alt="Generated"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground line-clamp-2 font-mono">
                      {generation.prompt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(generation.createdAt)}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to reuse
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <ClockIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No generations yet</p>
              <p className="text-xs mt-1">Generate images to see history</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
