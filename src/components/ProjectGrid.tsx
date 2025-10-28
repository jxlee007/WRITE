import { useState } from 'react';
import { useQuery, useMutation, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Plus, FolderOpen, Trash2, Settings, ImageOff } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';

interface ProjectGridProps {
  onProjectSelect?: (projectId: Id<"projects">) => void;
}

export function ProjectGrid({ onProjectSelect }: ProjectGridProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { isAuthenticated, isLoading: isConvexLoading } = useConvexAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    genre: '',
    format: 'novel' as const,
    description: '',
  });

  const shouldFetchProjects = isLoaded && isSignedIn && isAuthenticated;
  const convexAuthFailed = isLoaded && isSignedIn && !isAuthenticated && !isConvexLoading;

  const projects = useQuery(
    api.projects.getProjects,
    shouldFetchProjects ? undefined : 'skip'
  );
  const createProject = useMutation(api.projects.createProject);
  const deleteProject = useMutation(api.projects.deleteProject);

  const handleCreateProject = async () => {
    if (!newProject.title) return;
    if (!shouldFetchProjects) return;

    try {
      await createProject({
        title: newProject.title,
        genre: newProject.genre || undefined,
        format: newProject.format,
        description: newProject.description.trim() || undefined,
      });
      
      setNewProject({ title: '', genre: '', format: 'novel', description: '' });
      setIsCreateOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDeleteProject = async (e: React.MouseEvent, projectId: Id<"projects">) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteProject({ id: projectId });
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
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

  let content: JSX.Element;

  if (convexAuthFailed) {
    content = (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center">
        <p className="text-sm">Unable to connect to Convex.</p>
        <p className="text-xs mt-2">
          Check your authentication configuration and reload.
        </p>
      </div>
    );
  } else if (isConvexLoading || !projects) {
    content = (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
        <p className="text-sm text-center">Loading projects...</p>
      </div>
    );
  } else if (projects.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
        <FolderOpen className="h-16 w-16 mb-4 opacity-50" />
        <p className="text-lg font-semibold mb-2">No projects yet</p>
        <p className="text-sm text-center mb-4">Create your first project to get started</p>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#252526] text-white border-border">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="My Novel"
                  className="bg-[#3c3c3c] border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Genre (Optional)</Label>
                <Select
                  value={newProject.genre}
                  onValueChange={(value) => setNewProject({ ...newProject, genre: value })}
                >
                  <SelectTrigger className="bg-[#3c3c3c] border-border">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="sci-fi">Science Fiction</SelectItem>
                    <SelectItem value="mystery">Mystery</SelectItem>
                    <SelectItem value="thriller">Thriller</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="literary">Literary Fiction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Writing Format</Label>
                <Select
                  value={newProject.format}
                  onValueChange={(value) => setNewProject({ ...newProject, format: value as any })}
                >
                  <SelectTrigger className="bg-[#3c3c3c] border-border">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novel">Novel</SelectItem>
                    <SelectItem value="screenplay">Screenplay</SelectItem>
                    <SelectItem value="stage_play">Stage Play</SelectItem>
                    <SelectItem value="comic_script">Comic Script</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Brief synopsis or project notes"
                  className="bg-[#3c3c3c] border-border min-h-[80px] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateProject}
                  disabled={!newProject.title || !shouldFetchProjects}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    content = (
      <div className="w-full h-full overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#252526] text-white border-border">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="My Novel"
                    className="bg-[#3c3c3c] border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Genre (Optional)</Label>
                  <Select
                    value={newProject.genre}
                    onValueChange={(value) => setNewProject({ ...newProject, genre: value })}
                  >
                    <SelectTrigger className="bg-[#3c3c3c] border-border">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="sci-fi">Science Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="literary">Literary Fiction</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Writing Format</Label>
                  <Select
                    value={newProject.format}
                    onValueChange={(value) => setNewProject({ ...newProject, format: value as any })}
                  >
                    <SelectTrigger className="bg-[#3c3c3c] border-border">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novel">Novel</SelectItem>
                      <SelectItem value="screenplay">Screenplay</SelectItem>
                      <SelectItem value="stage_play">Stage Play</SelectItem>
                      <SelectItem value="comic_script">Comic Script</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Brief synopsis or project notes"
                    className="bg-[#3c3c3c] border-border min-h-[80px] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateProject}
                    disabled={!newProject.title || !shouldFetchProjects}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Create Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="group cursor-pointer hover:bg-card/60 transition-all border-border overflow-hidden"
              onClick={() => onProjectSelect?.(project._id)}
            >
              <CardHeader className="p-0">
                <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
                  {project.coverImageUrl ? (
                    <img
                      src={project.coverImageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                      <ImageOff className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                </AspectRatio>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{project.title}</h3>
                    {project.genre && (
                      <p className="text-xs text-muted-foreground capitalize">{project.genre}</p>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 h-7 w-7 p-0 hover:bg-red-500/20 flex-shrink-0"
                    onClick={(e) => handleDeleteProject(e, project._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="capitalize">{project.format.replace('_', ' ')}</span>
                  <span>{formatRelativeTime(project.updatedAt || project._creationTime)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return content;
}
