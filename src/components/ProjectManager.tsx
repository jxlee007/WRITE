import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
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
import { Plus, FolderOpen, Trash2 } from 'lucide-react';

interface ProjectManagerProps {
  userId: string;
  onProjectSelect?: (projectId: Id<"projects">) => void;
}

export function ProjectManager({ userId, onProjectSelect }: ProjectManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    genre: '',
    format: 'novel' as const,
  });

  const projects = useQuery(api.projects.getProjects, { userId });
  const createProject = useMutation(api.projects.createProject);
  const deleteProject = useMutation(api.projects.deleteProject);

  const handleCreateProject = async () => {
    if (!newProject.title) return;

    try {
      await createProject({
        userId,
        title: newProject.title,
        genre: newProject.genre || undefined,
        format: newProject.format,
      });
      
      setNewProject({ title: '', genre: '', format: 'novel' });
      setIsCreateOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteProject({ id: projectId as any });
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div className="w-64 border-r border-border bg-[#252526] flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Projects</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="h-4 w-4" />
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

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateProject}
                  disabled={!newProject.title}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects List */}
      <ScrollArea className="flex-1">
        {!projects || projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
            <FolderOpen className="h-12 w-12 mb-3 opacity-50" />
            <p className="text-sm text-center">No projects yet</p>
            <p className="text-xs text-center mt-1">Create your first project</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group flex items-center gap-2 px-2 py-2 rounded cursor-pointer
                  hover:bg-[#2a2d2e] text-muted-foreground hover:text-foreground
                  transition-colors"
                onClick={() => onProjectSelect?.(project._id)}
              >
                <FolderOpen className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{project.title}</p>
                  {project.genre && (
                    <p className="text-xs text-muted-foreground truncate">{project.genre}</p>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-red-500/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project._id);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-red-400" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
