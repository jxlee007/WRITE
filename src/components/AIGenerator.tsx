import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, Loader2Icon, DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AIGeneratorProps {
  initialPrompt?: string;
  projectId?: Id<"projects"> | null;
  onRecentGenerationsToggle?: (open: boolean) => void;
}

export const AIGenerator = ({ initialPrompt, projectId, onRecentGenerationsToggle }: AIGeneratorProps) => {
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [additionalContext, setAdditionalContext] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [imageQuality, setImageQuality] = useState("high");
  const [imageSize, setImageSize] = useState("1024x1024");

  // Mutation to save generated images
  const saveImage = useMutation(api.generatedImages.saveImage);

  const buildEnhancedPrompt = () => {
    let enhancedPrompt = prompt;

    // Add additional context
    if (additionalContext) {
      enhancedPrompt = `${enhancedPrompt}, ${additionalContext}`;
    }

    // Add quality modifiers
    enhancedPrompt = `${enhancedPrompt}, high quality, detailed, professional`;

    return enhancedPrompt;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setGenerating(true);
    try {
      const enhancedPrompt = buildEnhancedPrompt();
      console.log("Generating with prompt:", enhancedPrompt);

      // Simulate AI generation
      // In production, this would call Lovable AI or other image generation API
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Mock generated image
      const mockImage = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImages((prev) => [mockImage, ...prev]);
      
      // Save to database if projectId exists
      if (projectId) {
        await saveImage({
          projectId,
          prompt: enhancedPrompt,
          imageUrl: mockImage,
          modelUsed: "mock-model",
          settings: {
            size: imageSize,
            quality: imageQuality,
          },
        });
      }
      
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

  const handleReusePrompt = (historyPrompt: string) => {
    setPrompt(historyPrompt);
    toast.info("Prompt loaded from history");
  };

  return (
    <div className="flex-1 bg-editor flex flex-col h-full">
      {/* Main Generator Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            AI Image Generator
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Type token names directly in prompts (e.g., "John Smith in Ancient Temple")
          </p>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Prompt Input */}
            <Card className="p-4 space-y-3 bg-card/50 backdrop-blur-sm">
              <label className="text-sm font-medium">Base Prompt</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your image generation prompt... (mention tokens by name)"
                className="min-h-[100px] bg-background font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                💡 Tip: Reference your tokens by name directly in the prompt
              </p>
            </Card>

            {/* Additional Context */}
            <Card className="p-4 space-y-3 bg-card/50 backdrop-blur-sm">
              <label className="text-sm font-medium">Additional Context (Optional)</label>
              <Textarea
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="Add specific details, style, or mood..."
                className="min-h-[80px] bg-background font-mono text-sm"
              />
            </Card>

            {/* Generation Settings */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 space-y-3 bg-card/50 backdrop-blur-sm">
                <Label>Image Quality</Label>
                <Select value={imageQuality} onValueChange={setImageQuality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 space-y-3 bg-card/50 backdrop-blur-sm">
                <Label>Image Size</Label>
                <Select value={imageSize} onValueChange={setImageSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                    <SelectItem value="1536x1024">1536x1024 (Landscape)</SelectItem>
                    <SelectItem value="1024x1536">1024x1536 (Portrait)</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            </div>

            {/* Generate Button */}
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

            {/* Enhanced Prompt Preview */}
            {additionalContext && (
              <Card className="p-4 bg-card/30">
                <label className="text-sm font-medium text-muted-foreground">
                  Enhanced Prompt Preview
                </label>
                <p className="text-sm mt-2 font-mono text-muted-foreground">
                  {buildEnhancedPrompt()}
                </p>
              </Card>
            )}

            {/* Generated Images */}
            {generatedImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Generated Images (Current Session)
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
    </div>
  );
};
