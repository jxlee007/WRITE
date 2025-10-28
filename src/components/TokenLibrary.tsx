import { useState, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Plus, 
  Search, 
  Users, 
  MapPin, 
  Box, 
  Skull, 
  Shield, 
  Calendar,
  Trash2,
  ImageIcon,
  Upload,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';

interface TokenLibraryProps {
  projectId?: string | null; // Made optional
}

const TOKEN_TYPES = [
  { value: 'character', label: 'Character', icon: Users, color: 'bg-blue-500' },
  { value: 'location', label: 'Location', icon: MapPin, color: 'bg-green-500' },
  { value: 'object', label: 'Object', icon: Box, color: 'bg-yellow-500' },
  { value: 'creature', label: 'Creature', icon: Skull, color: 'bg-red-500' },
  { value: 'faction', label: 'Faction', icon: Shield, color: 'bg-purple-500' },
  { value: 'event', label: 'Event', icon: Calendar, color: 'bg-pink-500' },
  { value: 'reference-image', label: 'Reference Image', icon: ImageIcon, color: 'bg-cyan-500' },
  { value: 'ai-generated-image', label: 'AI Generated', icon: Sparkles, color: 'bg-violet-500' },
];

// Helper to get image dimensions
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
};

export function TokenLibrary({ projectId }: TokenLibraryProps) {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newToken, setNewToken] = useState({
    type: 'character',
    name: '',
    description: '',
    promptTemplate: '',
  });

  // Now works without projectId
  const tokens = useQuery(
    api.tokens.getTokens,
    { 
      projectId: projectId ? (projectId as any) : undefined, 
      type: filterType !== 'all' ? filterType : undefined 
    }
  );

  const createToken = useMutation(api.tokens.createToken);
  const deleteToken = useMutation(api.tokens.deleteToken);
  const uploadReferenceImage = useMutation(api.tokens.uploadReferenceImage);
  const generateUploadUrl = useMutation(api.tokens.generateUploadUrl);

  const filteredTokens = tokens?.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreateToken = async () => {
    if (!newToken.name) return;

    try {
      await createToken({
        projectId: projectId ? (projectId as any) : undefined,
        type: newToken.type,
        name: newToken.name,
        description: newToken.description,
        promptTemplate: newToken.promptTemplate || undefined,
      });

      setNewToken({ type: 'character', name: '', description: '', promptTemplate: '' });
      setIsCreateOpen(false);
      toast.success('Token created successfully');
    } catch (error) {
      console.error('Failed to create token:', error);
      toast.error('Failed to create token');
    }
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (!confirm('Are you sure you want to delete this token? This will remove it from all documents.')) {
      return;
    }

    try {
      await deleteToken({ id: tokenId as any });
      toast.success('Token deleted successfully');
    } catch (error) {
      console.error('Failed to delete token:', error);
      toast.error('Failed to delete token');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user) {
      return;
    }

    setIsUploading(true);

    try {
      const file = event.target.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        setIsUploading(false);
        return;
      }

      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl();

      // Upload file to Convex storage
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      const { storageId } = await result.json();

      // Get image dimensions
      const dimensions = await getImageDimensions(file);

      // Create reference image token
      await uploadReferenceImage({
        projectId: projectId as any,
        name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
        description: `Uploaded reference image: ${file.name}`,
        fileUrl: storageId,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        dimensions,
      });

      toast.success('Image uploaded successfully');

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const getTokenIcon = (type: string) => {
    const tokenType = TOKEN_TYPES.find(t => t.value === type);
    return tokenType ? tokenType.icon : Box;
  };

  const getTokenColor = (type: string) => {
    const tokenType = TOKEN_TYPES.find(t => t.value === type);
    return tokenType ? tokenType.color : 'bg-gray-500';
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Header */}
      <div className="p-4 border-b border-border bg-[#252526]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Tokens & Media Library</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Characters, locations, reference images, and AI-generated content
            </p>
          </div>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || !projectId}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              {/* New Token trigger removed per user request */}
              <DialogContent className="bg-[#252526] text-white border-border max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Token</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="token-type">Token Type</Label>
                  <Select
                    value={newToken.type}
                    onValueChange={(value) => setNewToken({ ...newToken, type: value })}
                  >
                    <SelectTrigger className="bg-[#3c3c3c] border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TOKEN_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-name">Name</Label>
                  <Input
                    id="token-name"
                    value={newToken.name}
                    onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                    placeholder="e.g., Alice, Castle, Magic Sword"
                    className="bg-[#3c3c3c] border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-description">Description</Label>
                  <Textarea
                    id="token-description"
                    value={newToken.description}
                    onChange={(e) => setNewToken({ ...newToken, description: e.target.value })}
                    placeholder="Detailed description for your reference and AI generation..."
                    className="bg-[#3c3c3c] border-border min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-prompt">AI Prompt Template (Optional)</Label>
                  <Textarea
                    id="token-prompt"
                    value={newToken.promptTemplate}
                    onChange={(e) => setNewToken({ ...newToken, promptTemplate: e.target.value })}
                    placeholder="Specific prompt for AI image generation..."
                    className="bg-[#3c3c3c] border-border min-h-[80px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    This template will be used when generating images for consistency
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateToken}
                    disabled={!newToken.name}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Create Token
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Filters (search + inline type filter) */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {/* add right padding so input text doesn't overlap the select */}
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tokens and media..."
              className="pl-9 pr-52 bg-[#3c3c3c] border-border"
            />

            {/* Put the Select inside the search container, absolutely positioned on the right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[200px] bg-[#3c3c3c] border-border">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types ({tokens?.length || 0})</SelectItem>
                  {TOKEN_TYPES.map(type => {
                    const count = tokens?.filter(t => t.type === type.value).length || 0;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center justify-between w-full gap-2">
                          <span>{type.label}</span>
                          <span className="text-muted-foreground text-xs">({count})</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Token Grid */}
      <div className="flex-1 overflow-auto p-4">
        {filteredTokens.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Users className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">No {filterType === 'all' ? 'items' : TOKEN_TYPES.find(t => t.value === filterType)?.label.toLowerCase()} yet</p>
            <p className="text-sm">Upload images or create tokens to start building your world</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTokens.map((token) => {
              const Icon = getTokenIcon(token.type);
              return (
                <Card
                  key={token._id}
                  className="bg-[#252526] border-border hover:border-purple-600 transition-colors group"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getTokenColor(token.type)}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white line-clamp-1">
                            {token.name}
                          </h3>
                          <Badge variant="outline" className="text-xs mt-1">
                            {TOKEN_TYPES.find(t => t.value === token.type)?.label}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteToken(token._id)}
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {token.description}
                    </p>

                    {/* Display image - prioritize fileUrl (new system) then primaryImageUrl (legacy) */}
                    {(token.fileUrl || token.primaryImageUrl) && (
                      <div className="mt-2 relative h-32 rounded-md overflow-hidden bg-[#3c3c3c]">
                        <img
                          src={token.fileUrl || token.primaryImageUrl}
                          alt={token.name}
                          className="w-full h-full object-cover"
                        />
                        {token.type === 'ai-generated-image' && (
                          <div className="absolute top-1 right-1 bg-violet-500 rounded-full p-1">
                            <Sparkles className="h-3 w-3 text-white" />
                          </div>
                        )}
                        {token.type === 'reference-image' && (
                          <div className="absolute top-1 right-1 bg-cyan-500 rounded-full p-1">
                            <ImageIcon className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}

                    {!token.fileUrl && !token.primaryImageUrl && (
                      <div className="mt-2 h-32 rounded-md bg-[#3c3c3c] flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground opacity-50" />
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}



