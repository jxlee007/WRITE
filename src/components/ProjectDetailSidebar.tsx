import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
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
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import { 
  Edit, 
  Plus, 
  Download, 
  Settings, 
  ImagePlus, 
  ImageOff, 
  ArrowRight, 
  X,
  FileText,
  Tag
} from 'lucide-react';
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

interface ProjectDetailSidebarProps {
  projectId: Id<"projects">;
  onClose?: () => void;
  onAddDocument?: () => void;
  onAddToken?: () => void;
  onEdit?: () => void;
  onViewChapters?: () => void;
  onViewTokens?: () => void;
  onSelectDocument?: (documentId: Id<"documents">) => void;
  onSelectToken?: (tokenId: Id<"tokens">) => void;
}

export function ProjectDetailSidebar({
  projectId,
  onClose,
  onAddDocument,
  onAddToken,
  onEdit,
  onViewChapters,
  onViewTokens,
  onSelectDocument,
  onSelectToken,
}: ProjectDetailSidebarProps) {
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

  const handleOpenCoverDialog = () => {
    setCoverImageDraft(overviewData?.project?.coverImageUrl || "");
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

  // Loading state
  if (!overviewData) {
    return (
      <div className="w-80 border-r border-border bg-[#252526] h-full flex flex-col">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Project Details</h2>
          {onClose && (
            <Button size="icon" variant="ghost" className="h-6 w-6 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
          <p className="text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const project = overviewData.project;
  const stats = overviewData.stats;
  const recentDocuments = overviewData.recentDocuments || [];
  const recentTokens = overviewData.recentTokens || [];
  const coverImageUrl = project?.coverImageUrl;

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

      <div className="w-80 border-r border-border bg-[#252526] h-full flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Project Details</h2>
          {onClose && (
            <Button size="icon" variant="ghost" className="h-6 w-6 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Cover Image */}
            <div>
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
                    <span className="text-xs">No cover</span>
                  </div>
                )}
              </AspectRatio>
              <div className="mt-2 flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 text-xs flex-1" 
                  onClick={handleOpenCoverDialog}
                >
                  <ImagePlus className="h-3 w-3" />
                  {coverImageUrl ? "Change" : "Add"}
                </Button>
                {coverImageUrl && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-xs" 
                    onClick={handleRemoveCoverImage}
                  >
                    <ImageOff className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Project Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{project?.title}</h3>
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                {project?.genre && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Genre:</span>
                    <span className="capitalize">{project.genre}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-medium">Format:</span>
                  <span className="capitalize">{project?.format.replace('_', ' ')}</span>
                </div>
                {project?.updatedAt && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Updated:</span>
                    <span>{formatRelativeTime(project.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Statistics */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Statistics</h4>
              <div className="flex items-center  gap-4 text-sm">
                <div className="flex items-center  gap-2">
                  <span className="text-muted-foreground">Chapters</span>
                  <span className="font-semibold text-white">{stats?.documentCount || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Words</span>
                  <span className="font-semibold text-white">
                    {stats?.wordCount ? stats.wordCount.toLocaleString() : 0}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Tokens</span>
                  <span className="font-semibold text-white">{stats?.tokenCount || 0}</span>
                </div>
              </div>

              {/* Token Distribution */}
              {stats?.tokensByType && Object.keys(stats.tokensByType).length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Token Types</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(stats.tokensByType).map(([type, count]) => (
                      <div
                        key={type}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-xs capitalize"
                      >
                        {type}: {count}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">Description</h4>
                {!isEditingDescription && (
                  <Button size="sm" variant="ghost" onClick={handleEditClick} className="h-6 p-1">
                    <Edit className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {isEditingDescription ? (
                <div className="space-y-2">
                  <Textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Enter project description..."
                    className="min-h-20 text-xs"
                  />
                  <div className="flex justify-end gap-1">
                    <Button variant="outline" size="sm" onClick={handleCancelEdit} className="text-xs h-7">
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveDescription} className="text-xs h-7">
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {project?.metadata?.description || "No description yet"}
                </p>
              )}
            </div>

            <Separator />

            {/* Recent Chapters */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">Recent Chapters</h4>
                {onViewChapters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 p-1" 
                    onClick={onViewChapters}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {recentDocuments.length > 0 ? (
                <div className="space-y-2">
                  {recentDocuments.slice(0, 3).map((doc) => (
                    <div
                      key={doc._id}
                      className="rounded border border-border/60 bg-card/50 p-2 cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => onSelectDocument?.(doc._id)}
                    >
                      <div className="flex items-start gap-2">
                        <FileText className="h-3 w-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">
                            {doc.title || "Untitled"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {computeWordCount(doc.content)} words
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground text-center py-4">
                  No chapters yet
                </div>
              )}
            </div>

            <Separator />

            {/* Recent Tokens */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">Recent Tokens</h4>
                {onViewTokens && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 p-1" 
                    onClick={onViewTokens}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {recentTokens.length > 0 ? (
                <div className="space-y-2">
                  {recentTokens.slice(0, 3).map((token) => (
                    <div
                      key={token._id}
                      className="rounded border border-border/60 bg-card/50 p-2 cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => onSelectToken?.(token._id)}
                    >
                      <div className="flex items-start gap-2">
                        <Tag className="h-3 w-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{token.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{token.type}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground text-center py-4">
                  No tokens yet
                </div>
              )}
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onAddDocument} 
                className="w-full gap-2 text-xs"
              >
                <Plus className="h-3 w-3" />
                Add Chapter
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onAddToken} 
                className="w-full gap-2 text-xs"
              >
                <Plus className="h-3 w-3" />
                Add Token
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onEdit} 
                className="w-full gap-2 text-xs"
              >
                <Settings className="h-3 w-3" />
                Settings
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
