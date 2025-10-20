import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Edit, Plus, Download, Settings, ImagePlus, ImageOff, ArrowRight } from 'lucide-react';
import { ProjectStatCard } from './ProjectStatCard';

const computeWordCount = (content?: string) => {
  if (!content) return 0;
  return content
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .length;
};

const formatRelativeTime = (timestamp?: number) => {
  if (!timestamp) return "";
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
};

interface ProjectOverviewProps {
  projectId: Id<"projects">;
  onAddDocument?: () => void;
  onAddToken?: () => void;
  onEdit?: () => void;
  onViewChapters?: () => void;
  onViewTokens?: () => void;
  onSelectDocument?: (documentId: Id<"documents">) => void;
  onSelectToken?: (tokenId: Id<"tokens">) => void;
}

export function ProjectOverview({
  projectId,
  onAddDocument,
  onAddToken,
  onEdit,
  onViewChapters,
  onViewTokens,
  onSelectDocument,
  onSelectToken,
}: ProjectOverviewProps) {
  // State
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [isCoverDialogOpen, setIsCoverDialogOpen] = useState(false);
  const [coverImageDraft, setCoverImageDraft] = useState("");

  // Queries
  const overviewData = useQuery(
    api.projects.getProjectOverview,
    { projectId }
  );

  // Mutations
  const updateDescription = useMutation(api.projects.updateProjectDescription);
  const updateCoverImage = useMutation(api.projects.updateProjectCoverImage);

  // Handlers
  const handleEditClick = () => {
    setEditedDescription(overviewData?.project?.metadata?.description || "");
    setIsEditingDescription(true);
  };

  const handleSaveDescription = async () => {
    try {
      await updateDescription({
        projectId,
        description: editedDescription,
      });
      setIsEditingDescription(false);
      toast.success("Description updated");
    } catch (error) {
      toast.error("Failed to update description");
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingDescription(false);
    setEditedDescription("");
  };

  // Loading state
  if (!overviewData) {
    return <ProjectOverviewSkeleton />;
  }

  const project = overviewData.project;
  const stats = overviewData.stats;
  const recentDocuments = overviewData.recentDocuments || [];
  const recentTokens = overviewData.recentTokens || [];
  const coverImageUrl = project?.coverImageUrl;

  const handleOpenCoverDialog = () => {
    setCoverImageDraft(coverImageUrl || "");
    setIsCoverDialogOpen(true);
  };

  const handleSaveCoverImage = async () => {
    try {
      await updateCoverImage({
        projectId,
        coverImageUrl: coverImageDraft.trim() || undefined,
      });
      setIsCoverDialogOpen(false);
      setCoverImageDraft("");
      toast.success(coverImageDraft.trim() ? "Cover image updated" : "Cover image removed");
    } catch (error) {
      toast.error("Failed to update cover image");
      console.error(error);
    }
  };

  const handleRemoveCoverImage = async () => {
    try {
      await updateCoverImage({ projectId });
      setCoverImageDraft("");
      setIsCoverDialogOpen(false);
      toast.success("Cover image removed");
    } catch (error) {
      toast.error("Failed to remove cover image");
      console.error(error);
    }
  };

  return (
    <>
      <Dialog
        open={isCoverDialogOpen}
        onOpenChange={(open) => {
          setIsCoverDialogOpen(open);
          if (!open) {
            setCoverImageDraft("");
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{coverImageUrl ? "Update cover image" : "Add cover image"}</DialogTitle>
            <DialogDescription>
              Provide a direct image URL to personalize this project.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="cover-image-url" className="text-sm font-medium">
                Image URL
              </Label>
              <Input
                id="cover-image-url"
                value={coverImageDraft}
                onChange={(e) => setCoverImageDraft(e.target.value)}
                placeholder="https://example.com/cover.jpg"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsCoverDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveCoverImage}
              disabled={!coverImageDraft.trim() && !coverImageUrl}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full h-full overflow-y-auto p-6 space-y-6 bg-background">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full max-w-[220px]">
            <AspectRatio
              ratio={3 / 4}
              className="overflow-hidden rounded-lg border border-border/40 bg-muted"
            >
              {coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt={`Cover for ${project?.title ?? "project"}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs">Add a visual for this project</span>
                </div>
              )}
            </AspectRatio>
            <div className="mt-3 flex gap-32">
              <span>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleOpenCoverDialog}>
                  <ImagePlus className="h-4 w-4" />
                  {coverImageUrl ? "Change cover" : "Add cover"}
                </Button>
                {coverImageUrl && (
                  <Button variant="ghost" size="sm" className="gap-2" onClick={handleRemoveCoverImage}>
                    <ImageOff className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </span>
              <span className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" size="sm" onClick={onAddDocument} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Chapter
                </Button>
                <Button variant="outline" size="sm" onClick={onAddToken} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Token
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={onEdit} className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>

              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{project?.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {project?.genre && <span>Genre: {project.genre}</span>}
                <span>Format: {project?.format}</span>
                {project?.updatedAt && <span>Updated {formatRelativeTime(project.updatedAt)}</span>}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Description</h3>
                  <p className="text-xs text-muted-foreground">Set the tone for collaborators and future chapters</p>
                </div>
                {!isEditingDescription && (
                  <Button size="sm" variant="ghost" onClick={handleEditClick} className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
              {isEditingDescription ? (
                <div className="space-y-3">
                  <Textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Enter project description..."
                    className="min-h-24"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveDescription}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {project?.metadata?.description || "No description yet"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <ProjectStatCard label="Chapters" value={stats?.documentCount || 0} icon="📚" />
              <ProjectStatCard
                label="Words"
                value={stats?.wordCount ? stats.wordCount.toLocaleString() : 0}
                icon="✍️"
              />
              <ProjectStatCard label="Tokens" value={stats?.tokenCount || 0} icon="🏷️" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Left: Token Distribution */}
          <div className="lg:col-span-1">
            {stats?.tokensByType && Object.keys(stats.tokensByType).length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Token Distribution</CardTitle>
                  <CardDescription>Snapshot across token categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(stats.tokensByType).map(([type, count]) => (
                      <div
                        key={type}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm capitalize"
                      >
                        {type}: <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="hidden lg:block">
                {/* keep left column visually aligned on large screens when no data */}
              </div>
            )}
          </div>

          {/* Right: stacked Recent Chapters (top) and Recent Tokens (bottom) */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-4">
            <div className="row-span-1">
              <Card>
                <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-sm">Recent Chapters</CardTitle>
                    <CardDescription>Your three most recently updated chapters</CardDescription>
                  </div>
                  {onViewChapters && (
                    <Button variant="ghost" size="sm" className="gap-1" onClick={onViewChapters}>
                      View all
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {recentDocuments.length > 0 ? (
                    <div className="space-y-3">
                      {recentDocuments.map((doc) => (
                        <div
                          key={doc._id}
                          className="rounded-lg border border-border/60 bg-card p-3 shadow-sm cursor-pointer transition-colors hover:bg-accent/50"
                          onClick={() => onSelectDocument?.(doc._id)}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold truncate">
                              {doc.title || "Untitled chapter"}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(doc.updatedAt)}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {computeWordCount(doc.content)} words
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border/50 p-6 text-sm text-muted-foreground">
                      <p>No chapters yet.</p>
                      <Button size="sm" className="gap-2 self-start" onClick={onAddDocument}>
                        <Plus className="h-4 w-4" />
                        Add your first chapter
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="row-span-1">
              <Card>
                <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-sm">Recent Tokens</CardTitle>
                    <CardDescription>Latest additions to your world-building library</CardDescription>
                  </div>
                  {onViewTokens && (
                    <Button variant="ghost" size="sm" className="gap-1" onClick={onViewTokens}>
                      View all
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {recentTokens.length > 0 ? (
                    <div className="space-y-3">
                      {recentTokens.map((token) => (
                        <div
                          key={token._id}
                          className="rounded-lg border border-border/60 bg-card p-3 shadow-sm cursor-pointer transition-colors hover:bg-accent/50"
                          onClick={() => onSelectToken?.(token._id)}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold">{token.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{token.type}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(token.updatedAt)}
                            </span>
                          </div>
                          {token.description && (
                            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                              {token.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border/50 p-6 text-sm text-muted-foreground">
                      <p>No tokens yet.</p>
                      <Button size="sm" className="gap-2 self-start" onClick={onAddToken}>
                        <Plus className="h-4 w-4" />
                        Add your first token
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Skeleton Loader
function ProjectOverviewSkeleton() {
  return (
    <div className="w-full h-full p-6 space-y-6 animate-pulse bg-background">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="h-64 w-full max-w-[220px] rounded-lg bg-card" />
        <div className="flex-1 space-y-4">
          <div className="h-10 bg-card rounded" />
          <div className="h-4 bg-card rounded w-1/3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-card rounded" />
            ))}
          </div>
        </div>
      </div>
      <div className="h-32 bg-card rounded" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-card rounded" />
        ))}
      </div>
    </div>
  );
}