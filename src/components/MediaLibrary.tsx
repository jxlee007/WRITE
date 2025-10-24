import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UploadIcon, 
  DownloadIcon, 
  TrashIcon, 
  ZoomInIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  SparklesIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";

interface MediaLibraryProps {
  projectId?: Id<"projects">;
}

// Helper to get image dimensions
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
};

// Helper to get media duration
const getMediaDuration = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const media = document.createElement(file.type.startsWith("audio") ? "audio" : "video");
    media.onloadedmetadata = () => {
      resolve(media.duration);
    };
    media.src = URL.createObjectURL(file);
  });
};

export const MediaLibrary = ({ projectId }: MediaLibraryProps) => {
  const { user } = useUser();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [mediaType, setMediaType] = useState<"all" | "image" | "video" | "audio">("all");
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch media from Convex
  const allMedia = useQuery(
    api.mediaLibrary.getProjectMedia,
    projectId ? { projectId } : "skip"
  );
  
  const generateUploadUrl = useMutation(api.mediaLibrary.generateUploadUrl);
  const addMedia = useMutation(api.mediaLibrary.addMedia);
  const deleteMediaMutation = useMutation(api.mediaLibrary.deleteMedia);
  
  // Filter media by type
  const filteredMedia = allMedia?.filter(media => 
    mediaType === "all" ? true : media.type === mediaType
  );
  
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !projectId || !user) {
      return;
    }
    
    setIsUploading(true);
    
    try {
      const file = event.target.files[0];
      const fileType = file.type.split("/")[0]; // image, video, audio
      
      // Validate file type
      if (!["image", "video", "audio"].includes(fileType)) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image, video, or audio file.",
          variant: "destructive",
        });
        return;
      }
      
      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl();
      
      // Upload file to Convex storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      
      const { storageId } = await result.json();
      
      // Get dimensions for images
      let dimensions: { width: number; height: number } | undefined;
      if (fileType === "image") {
        dimensions = await getImageDimensions(file);
      }
      
      // Get duration for audio/video
      let duration: number | undefined;
      if (fileType === "audio" || fileType === "video") {
        duration = await getMediaDuration(file);
      }
      
      // Add to media library
      await addMedia({
        projectId,
        userId: user.id,
        type: fileType,
        source: "uploaded",
        fileUrl: storageId,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        duration,
        dimensions,
      });
      
      toast({
        title: "Upload successful",
        description: `${file.name} has been added to your media library.`,
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDelete = async (mediaId: Id<"mediaLibrary">) => {
    try {
      await deleteMediaMutation({ mediaId });
      toast({
        title: "Media deleted",
        description: "Media has been removed from your library.",
      });
      setSelectedMedia(null);
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was an error deleting the media.",
        variant: "destructive",
      });
    }
  };
  
  const handleDownload = (media: any) => {
    // Download via storage URL
    window.open(media.fileUrl, "_blank");
  };
  
  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <VideoIcon className="w-4 h-4" />;
      case "audio":
        return <MusicIcon className="w-4 h-4" />;
      default:
        return <SparklesIcon className="w-4 h-4" />;
    }
  };
  
  const renderMediaPreview = (media: any) => {
    switch (media.type) {
      case "image":
        return (
          <img
            src={media.fileUrl}
            alt={media.fileName}
            className="w-full h-full object-cover"
          />
        );
      case "video":
        return (
          <video
            src={media.fileUrl}
            className="w-full h-full object-cover"
            muted
          />
        );
      case "audio":
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <MusicIcon className="w-12 h-12 text-primary" />
          </div>
        );
      default:
        return null;
    }
  };
  
  if (!projectId) {
    return (
      <div className="flex-1 bg-editor flex items-center justify-center">
        <p className="text-muted-foreground">Select a project to view media library</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex-1 bg-editor flex flex-col h-full">
        <div className="border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Media Library
          </h2>
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <UploadIcon className="w-4 h-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Media"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,audio/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
        
        <Tabs value={mediaType} onValueChange={(v) => setMediaType(v as any)} className="flex-1 flex flex-col">
          <div className="border-b border-border px-4">
            <TabsList className="bg-transparent">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="image">
                <ImageIcon className="w-4 h-4 mr-2" />
                Images
              </TabsTrigger>
              <TabsTrigger value="video">
                <VideoIcon className="w-4 h-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="audio">
                <MusicIcon className="w-4 h-4 mr-2" />
                Audio
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={mediaType} className="flex-1 mt-0">
            <ScrollArea className="h-full">
              <div className="p-6">
                {!filteredMedia || filteredMedia.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    <div className="mb-4">
                      {getMediaIcon(mediaType === "all" ? "image" : mediaType)}
                    </div>
                    <p>No {mediaType === "all" ? "media" : `${mediaType} files`} yet.</p>
                    <p className="text-sm mt-2">Upload media or generate with AI!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {filteredMedia.map((media) => (
                      <Card
                        key={media._id}
                        className="overflow-hidden group relative bg-card/50 backdrop-blur-sm cursor-pointer aspect-square"
                        onClick={() => setSelectedMedia(media)}
                      >
                        <div className="w-full h-full">
                          {renderMediaPreview(media)}
                        </div>
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMedia(media);
                            }}
                          >
                            <ZoomInIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/80 px-2 py-1 rounded flex items-center gap-1 text-xs">
                            {getMediaIcon(media.type)}
                            {media.source === "ai-generated" && (
                              <SparklesIcon className="w-3 h-3 text-accent" />
                            )}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs text-white line-clamp-2">{media.fileName}</p>
                          {media.fileSize && (
                            <p className="text-xs text-white/60">
                              {(media.fileSize / 1024 / 1024).toFixed(2)} MB
                            </p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Media Detail Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedMedia && getMediaIcon(selectedMedia.type)}
              {selectedMedia?.fileName}
            </DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden bg-muted">
                {selectedMedia.type === "image" && (
                  <img
                    src={selectedMedia.fileUrl}
                    alt={selectedMedia.fileName}
                    className="w-full h-auto"
                  />
                )}
                {selectedMedia.type === "video" && (
                  <video
                    src={selectedMedia.fileUrl}
                    controls
                    className="w-full h-auto"
                  />
                )}
                {selectedMedia.type === "audio" && (
                  <div className="p-8 flex flex-col items-center justify-center">
                    <MusicIcon className="w-24 h-24 text-primary mb-4" />
                    <audio src={selectedMedia.fileUrl} controls className="w-full" />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{selectedMedia.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Source</p>
                  <p className="font-medium capitalize flex items-center gap-1">
                    {selectedMedia.source === "ai-generated" && (
                      <SparklesIcon className="w-4 h-4 text-accent" />
                    )}
                    {selectedMedia.source}
                  </p>
                </div>
                {selectedMedia.fileSize && (
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-medium">
                      {(selectedMedia.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
                {selectedMedia.dimensions && (
                  <div>
                    <p className="text-muted-foreground">Dimensions</p>
                    <p className="font-medium">
                      {selectedMedia.dimensions.width} × {selectedMedia.dimensions.height}
                    </p>
                  </div>
                )}
                {selectedMedia.duration && (
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {Math.floor(selectedMedia.duration / 60)}:
                      {Math.floor(selectedMedia.duration % 60).toString().padStart(2, "0")}
                    </p>
                  </div>
                )}
              </div>
              
              {selectedMedia.metadata?.prompt && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">AI Prompt:</p>
                  <p className="text-sm font-mono bg-muted/50 p-3 rounded">
                    {selectedMedia.metadata.prompt}
                  </p>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => handleDownload(selectedMedia)}>
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDelete(selectedMedia._id)}
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
