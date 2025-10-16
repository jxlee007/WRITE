import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon, TrashIcon, ZoomInIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const mockGalleryImages = [
  { id: 1, url: "https://picsum.photos/400/400?random=1", prompt: "A serene mountain landscape" },
  { id: 2, url: "https://picsum.photos/400/400?random=2", prompt: "Futuristic cityscape" },
  { id: 3, url: "https://picsum.photos/400/400?random=3", prompt: "Abstract digital art" },
  { id: 4, url: "https://picsum.photos/400/400?random=4", prompt: "Character portrait" },
];

export const ImageGallery = () => {
  const [images] = useState(mockGalleryImages);
  const [selectedImage, setSelectedImage] = useState<typeof mockGalleryImages[0] | null>(null);

  return (
    <>
      <div className="flex-1 bg-editor flex flex-col h-full">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Image Gallery
          </h2>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-6">
            {images.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                No images yet. Generate some images to see them here!
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {images.map((image) => (
                  <Card
                    key={image.id}
                    className="overflow-hidden group relative bg-card/50 backdrop-blur-sm cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-auto transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(image);
                        }}
                      >
                        <ZoomInIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-white line-clamp-2">{image.prompt}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.prompt}
                className="w-full h-auto rounded-lg"
              />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Prompt:</p>
                <p className="text-sm font-mono bg-muted/50 p-3 rounded">{selectedImage.prompt}</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="destructive">
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
