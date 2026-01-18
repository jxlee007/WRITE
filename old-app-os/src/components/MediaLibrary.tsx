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
const getImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> => {
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
    const media = document.createElement(
      file.type.startsWith("audio") ? "audio" : "video",
    );
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
  const [mediaType, setMediaType] = useState<
    "all" | "image" | "video" | "audio"
  >("all");
  const [isUploading, setIsUploading] = useState(false);

  // Fetch media from the unified tokens system - now works without projectId
  // For images: get reference-image and ai-generated-image types
  const allMedia = useQuery(
    api.tokens.getMediaTokens,
    projectId ? { projectId, type: "all" } : { type: "all" },
  );

  const generateUploadUrl = useMutation(api.tokens.generateUploadUrl);
  const uploadReferenceImage = useMutation(api.tokens.uploadReferenceImage);
  const deleteToken = useMutation(api.tokens.deleteToken);

  // Filter media by type - currently only supporting images
  const filteredMedia = allMedia?.filter((media) => {
    if (mediaType === "all") return true;
    if (mediaType === "image") {
      return (
        media.type === "reference-image" || media.type === "ai-generated-image"
      );
    }
    return false;
  });

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user) {
      return;
    }

    setIsUploading(true);

    try {
      const file = event.target.files[0];
      const fileType = file.type.split("/")[0]; // image, video, audio

      // Currently only supporting images in the unified system
      if (fileType !== "image") {
        toast({
          title: "Only images supported",
          description:
            "Currently only image uploads are supported. Video/audio coming soon!",
          variant: "destructive",
        });
        setIsUploading(false);
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
      const dimensions = await getImageDimensions(file);

      // Add to unified tokens system as reference-image
      await uploadReferenceImage({
        ...(projectId ? { projectId } : {}),
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        description: `Uploaded reference image: ${file.name}`,
        fileUrl: storageId,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
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

  const handleDelete = async (mediaId: Id<"tokens">) => {
    try {
      await deleteToken({ id: mediaId });
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
      case "reference-image":
        return <ImageIcon className="w-4 h-4" />;
      case "ai-generated-image":
        return <SparklesIcon className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <VideoIcon className="w-4 h-4" />;
      case "audio":
        return <MusicIcon className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const renderMediaPreview = (media: any) => {
    // All media tokens have images
    return (
      <img
        src={media.fileUrl || media.primaryImageUrl}
        alt={media.fileName || media.name}
        className="w-full h-full object-cover"
      />
    );
  };

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

        <Tabs
          value={mediaType}
          onValueChange={(v) => setMediaType(v as any)}
          className="flex-1 flex flex-col"
        >
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
                    <p>
                      No {mediaType === "all" ? "media" : `${mediaType} files`}{" "}
                      yet.
                    </p>
                    <p className="text-sm mt-2">
                      Upload media or generate with AI!
                    </p>
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
                            {media.type === "ai-generated-image" && (
                              <SparklesIcon className="w-3 h-3 text-accent" />
                            )}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs text-white line-clamp-2">
                            {media.fileName || media.name}
                          </p>
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
      <Dialog
        open={!!selectedMedia}
        onOpenChange={() => setSelectedMedia(null)}
      >
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
                <img
                  src={selectedMedia.fileUrl || selectedMedia.primaryImageUrl}
                  alt={selectedMedia.fileName || selectedMedia.name}
                  className="w-full h-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">
                    {selectedMedia.type === "reference-image"
                      ? "Reference Image"
                      : selectedMedia.type === "ai-generated-image"
                        ? "AI Generated"
                        : selectedMedia.type}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Source</p>
                  <p className="font-medium capitalize flex items-center gap-1">
                    {selectedMedia.type === "ai-generated-image" && (
                      <SparklesIcon className="w-4 h-4 text-accent" />
                    )}
                    {selectedMedia.source || "uploaded"}
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
                      {selectedMedia.dimensions.width} ×{" "}
                      {selectedMedia.dimensions.height}
                    </p>
                  </div>
                )}
              </div>

              {selectedMedia.prompt && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">AI Prompt:</p>
                  <p className="text-sm font-mono bg-muted/50 p-3 rounded">
                    {selectedMedia.prompt}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => handleDownload(selectedMedia)}
                >
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
