import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { Edit, Plus, Download, Settings } from 'lucide-react';
import { ProjectStatCard } from './ProjectStatCard';
import { TokenPreviewCard } from './TokenPreviewCard';

interface ProjectOverviewProps {
  projectId: Id<"projects">;
  onAddDocument?: () => void;
  onAddToken?: () => void;
  onEdit?: () => void;
}

export function ProjectOverview({
  projectId,
  onAddDocument,
  onAddToken,
  onEdit,
}: ProjectOverviewProps) {
  // State
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  
  // Queries
  const overviewData = useQuery(
    api.projects.getProjectOverview,
    { projectId }
  );
  
  // Mutations
  const updateDescription = useMutation(api.projects.updateProjectDescription);
  
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
  const tokens = overviewData.tokens || [];
  
  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{project?.title}</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          {project?.genre && <span>Genre: {project.genre}</span>}
          <span>Format: {project?.format}</span>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <ProjectStatCard
          label="Chapters"
          value={stats?.documentCount || 0}
          icon="📚"
        />
        <ProjectStatCard
          label="Words"
          value={stats?.wordCount?.toLocaleString() || 0}
          icon="✍️"
        />
        <ProjectStatCard
          label="Tokens"
          value={stats?.tokenCount || 0}
          icon="🏷️"
        />
      </div>
      
      {/* Token Types */}
      {stats?.tokensByType && Object.keys(stats.tokensByType).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Token Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.tokensByType).map(([type, count]) => (
                <div
                  key={type}
                  className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                >
                  {type}: <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Description */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Description</CardTitle>
          {!isEditingDescription && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEditClick}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditingDescription ? (
            <div className="space-y-3">
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Enter project description..."
                className="min-h-24"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveDescription}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {project?.metadata?.description || "No description yet"}
            </p>
          )}
        </CardContent>
      </Card>
      
      {/* Token Preview */}
      {tokens.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">
            Related Tokens ({tokens.length} of {stats?.tokenCount})
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {tokens.map((token) => (
              <TokenPreviewCard key={token._id} token={token} />
            ))}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={onAddDocument}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Chapter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddToken}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Token
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="gap-2"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}

// Skeleton Loader
function ProjectOverviewSkeleton() {
  return (
    <div className="w-full h-full p-6 space-y-6 animate-pulse bg-background">
      <div className="h-10 bg-card rounded" />
      <div className="h-4 bg-card rounded w-1/3" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-card rounded" />
        ))}
      </div>
      <div className="h-32 bg-card rounded" />
    </div>
  );
}
