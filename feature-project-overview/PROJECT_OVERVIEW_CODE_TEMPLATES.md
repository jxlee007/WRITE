# 💻 Project Overview - Code Templates & Snippets

## Backend Queries Template

### Template 1: `getProjectOverview` Query

```typescript
// Location: convex/projects.ts

export const getProjectOverview = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    // Get the project
    const project = await ctx.db.get(args.projectId);
    
    if (!project) {
      throw new Error("Project not found");
    }
    
    // Get all documents for this project
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    // Calculate document count and word count
    const documentCount = documents.length;
    const wordCount = documents.reduce((sum, doc) => {
      const words = doc.content?.split(/\s+/).length || 0;
      return sum + words;
    }, 0);
    
    // Get all tokens for this project
    const tokens = await ctx.db
      .query("tokens")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    // Count tokens and group by type
    const tokenCount = tokens.length;
    const tokensByType: { [key: string]: number } = {};
    
    tokens.forEach((token) => {
      const type = token.type;
      tokensByType[type] = (tokensByType[type] || 0) + 1;
    });
    
    // Get top 8 tokens for preview
    const previewTokens = tokens.slice(0, 8);
    
    return {
      project,
      stats: {
        documentCount,
        wordCount,
        tokenCount,
        tokensByType,
      },
      tokens: previewTokens,
    };
  },
});
```

### Template 2: `updateProjectDescription` Mutation

```typescript
// Location: convex/projects.ts

export const updateProjectDescription = mutation({
  args: {
    projectId: v.id("projects"),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    // Get current project
    const currentProject = await ctx.db.get(args.projectId);
    
    if (!currentProject) {
      throw new Error("Project not found");
    }
    
    // Update with new description
    await ctx.db.patch(args.projectId, {
      metadata: {
        wordCount: currentProject.metadata?.wordCount,
        chapterCount: currentProject.metadata?.chapterCount,
        description: args.description, // Updated
      },
      updatedAt: Date.now(),
    });
    
    // Return updated project
    return await ctx.db.get(args.projectId);
  },
});
```

---

## React Component Templates

### Template 3: `ProjectOverview.tsx` Structure

```typescript
// Location: src/components/ProjectOverview.tsx

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
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
  if (overviewData?.isLoading) {
    return <ProjectOverviewSkeleton />;
  }
  
  // Error state
  if (overviewData?.error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">Failed to load project</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }
  
  const project = overviewData?.project;
  const stats = overviewData?.stats;
  const tokens = overviewData?.tokens || [];
  
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">Token Distribution</h3>
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
        </div>
      )}
      
      {/* Description */}
      <div className="bg-card rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Description</h3>
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
        </div>
        
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
      </div>
      
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
      <div className="flex gap-2 pt-4">
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
    <div className="flex-1 p-6 space-y-6">
      <div className="h-10 bg-card rounded animate-pulse" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-card rounded animate-pulse" />
        ))}
      </div>
      <div className="h-32 bg-card rounded animate-pulse" />
    </div>
  );
}
```

### Template 4: `ProjectStatCard.tsx`

```typescript
// Location: src/components/ProjectStatCard.tsx

import { ReactNode } from 'react';

interface ProjectStatCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
}

export function ProjectStatCard({ label, value, icon }: ProjectStatCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 space-y-2 border border-border">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {label}
        </span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="text-3xl font-bold text-primary">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  );
}
```

### Template 5: `TokenPreviewCard.tsx`

```typescript
// Location: src/components/TokenPreviewCard.tsx

import type { Token } from '../../convex/_generated/dataModel';

interface TokenPreviewCardProps {
  token: Token;
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
```

---

## Index.tsx Integration Template

### Template 6: Update Index.tsx Main Content Area

```typescript
// Location: src/pages/Index.tsx
// Replace the main content rendering section with:

{/* Main Content Area */}
<div className="flex-1 flex flex-col overflow-hidden">
  {selectedProjectId ? (
    <ProjectOverview
      projectId={selectedProjectId}
      onAddDocument={() => {
        // TODO: Handle add document
        // Could open a dialog, navigate, etc.
        toast.info("Add document functionality");
      }}
      onAddToken={() => {
        // TODO: Handle add token
        toast.info("Add token functionality");
      }}
      onEdit={() => {
        // TODO: Handle edit project settings
        toast.info("Edit project functionality");
      }}
    />
  ) : (
    <div className="flex-1 flex items-center justify-center text-muted-foreground">
      <p>Select a project from the sidebar</p>
    </div>
  )}
</div>
```

---

## Type Definitions Reference

### Template 7: TypeScript Interfaces

```typescript
// Reference types for Project Overview

interface ProjectOverviewData {
  project: {
    _id: Id<"projects">;
    userId: string;
    title: string;
    genre?: string;
    format: string;
    createdAt: number;
    updatedAt: number;
    metadata?: {
      wordCount?: number;
      chapterCount?: number;
      description?: string;
    };
  };
  stats: {
    documentCount: number;
    wordCount: number;
    tokenCount: number;
    tokensByType: {
      [key: string]: number; // e.g. { "character": 12, "location": 8 }
    };
  };
  tokens: Token[];
}

interface ProjectOverviewProps {
  projectId: Id<"projects">;
  onAddDocument?: () => void;
  onAddToken?: () => void;
  onEdit?: () => void;
}

interface ProjectStatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
}

interface TokenPreviewCardProps {
  token: {
    _id: string;
    name: string;
    type: string;
    description?: string;
    projectId: string;
  };
}
```

---

## Common Patterns & Utilities

### Template 8: Helper Functions

```typescript
// Utility functions for Project Overview

/**
 * Format a number with thousand separators
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Truncate text to a maximum length
 */
export const truncateText = (text: string, length: number): string => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * Get emoji for token type
 */
export const getTokenTypeEmoji = (type: string): string => {
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

/**
 * Get color for token type
 */
export const getTokenTypeColor = (type: string): string => {
  const colorMap: { [key: string]: string } = {
    character: 'bg-blue-500/20 text-blue-200',
    location: 'bg-green-500/20 text-green-200',
    object: 'bg-yellow-500/20 text-yellow-200',
    creature: 'bg-red-500/20 text-red-200',
    faction: 'bg-purple-500/20 text-purple-200',
    event: 'bg-orange-500/20 text-orange-200',
  };
  return colorMap[type] || 'bg-gray-500/20 text-gray-200';
};

/**
 * Calculate word count from text
 */
export const calculateWordCount = (text: string): number => {
  return text.trim().split(/\s+/).length;
};
```

### Template 9: Error Handling

```typescript
// Error handling patterns

// In component:
const handleSaveDescription = async () => {
  try {
    // Show loading state
    setIsSaving(true);
    
    // Call mutation
    await updateDescription({
      projectId,
      description: editedDescription,
    });
    
    // Show success
    toast.success("Description updated successfully");
    
    // Close editor
    setIsEditingDescription(false);
  } catch (error) {
    // Log error
    console.error('Failed to update description:', error);
    
    // Show user-friendly error
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Failed to update description. Please try again.");
    }
    
    // Keep editor open for retry
  } finally {
    setIsSaving(false);
  }
};
```

### Template 10: Loading States

```typescript
// Loading state patterns

// Skeleton Loader Component
function ProjectOverviewSkeleton() {
  return (
    <div className="flex-1 p-6 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-card rounded w-1/3" />
        <div className="h-4 bg-card rounded w-1/4" />
      </div>
      
      {/* Stats Skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-card rounded" />
        ))}
      </div>
      
      {/* Description Skeleton */}
      <div className="h-32 bg-card rounded" />
      
      {/* Token Grid Skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-20 bg-card rounded" />
        ))}
      </div>
    </div>
  );
}
```

---

## Testing Template

### Template 11: Test Cases

```typescript
// Example test cases for ProjectOverview

describe('ProjectOverview', () => {
  it('should display project title', async () => {
    // Test setup
    const mockProjectId = 'proj_123';
    
    // Render component
    render(<ProjectOverview projectId={mockProjectId} />);
    
    // Wait for query
    await waitFor(() => {
      expect(screen.getByText('My Epic Novel')).toBeInTheDocument();
    });
  });
  
  it('should display statistics correctly', async () => {
    // Test that stats display
    await waitFor(() => {
      expect(screen.getByText('25')).toBeInTheDocument(); // chapters
      expect(screen.getByText('15,240')).toBeInTheDocument(); // words
      expect(screen.getByText('42')).toBeInTheDocument(); // tokens
    });
  });
  
  it('should allow editing description', async () => {
    // Find edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    
    // Click edit
    fireEvent.click(editButton);
    
    // Textarea should appear
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    
    // Type new description
    fireEvent.change(textarea, {
      target: { value: 'New description' }
    });
    
    // Click save
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    // Verify mutation called
    expect(mockUpdateMutation).toHaveBeenCalledWith({
      projectId: mockProjectId,
      description: 'New description'
    });
  });
});
```

---

## Quick Copy-Paste Snippets

### Token Type Distribution Display

```typescript
<div className="space-y-2">
  <h4 className="text-sm font-semibold">Token Distribution</h4>
  <div className="flex flex-wrap gap-2">
    {Object.entries(stats?.tokensByType || {}).map(([type, count]) => (
      <span
        key={type}
        className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary"
      >
        {type}: {count}
      </span>
    ))}
  </div>
</div>
```

### Action Buttons Row

```typescript
<div className="flex gap-2 flex-wrap">
  <Button onClick={onAddDocument} variant="outline" size="sm">
    <Plus className="h-4 w-4 mr-2" />
    Add Chapter
  </Button>
  <Button onClick={onAddToken} variant="outline" size="sm">
    <Plus className="h-4 w-4 mr-2" />
    Add Token
  </Button>
  <Button variant="outline" size="sm">
    <Download className="h-4 w-4 mr-2" />
    Export
  </Button>
  <Button onClick={onEdit} variant="outline" size="sm">
    <Settings className="h-4 w-4 mr-2" />
    Settings
  </Button>
</div>
```

### Word Count Display

```typescript
<div className="text-sm">
  <span className="text-muted-foreground">Word Count: </span>
  <span className="font-semibold">
    {stats?.wordCount?.toLocaleString() || 0}
  </span>
</div>
```

