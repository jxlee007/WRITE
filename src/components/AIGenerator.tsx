import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, Loader2Icon, DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIGeneratorProps {
  initialPrompt?: string;
}

export const AIGenerator = ({ initialPrompt }: AIGeneratorProps) => {
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setGenerating(true);
    try {
      // Simulate AI generation with Gradio
      // In production, this would integrate with actual Gradio/Lovable AI
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Mock generated image
      const mockImage = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImages((prev) => [mockImage, ...prev]);
      
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded");
  };

  return (
    <div className="flex-1 bg-editor flex flex-col h-full">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Image Generator
        </h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Prompt Input */}
          <Card className="p-4 space-y-3 bg-card/50 backdrop-blur-sm">
            <label className="text-sm font-medium">Prompt</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your image generation prompt..."
              className="min-h-[120px] bg-background font-mono text-sm"
            />
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-gradient-ai hover:shadow-glow transition-all"
            >
              {generating ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
          </Card>

          {/* Generated Images */}
          {generatedImages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Generated Images
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((imageUrl, idx) => (
                  <Card
                    key={idx}
                    className="overflow-hidden group relative bg-card/50 backdrop-blur-sm"
                  >
                    <img
                      src={imageUrl}
                      alt={`Generated ${idx + 1}`}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDownload(imageUrl)}
                      >
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
