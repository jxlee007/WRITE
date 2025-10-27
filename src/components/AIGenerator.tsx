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
  const [imageQuality, setImageQuality] = useState("1080p");
  const [imageSize, setImageSize] = useState("square-1024");

  // Use the new unified token system for AI-generated images
  const saveAIGeneratedImage = useMutation(api.tokens.saveAIGeneratedImage);

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
      
      // Save to database as AI-generated image token if projectId exists
      if (projectId) {
        await saveAIGeneratedImage({
          projectId,
          name: `AI Generated - ${new Date().toLocaleString()}`,
          description: enhancedPrompt,
          prompt: enhancedPrompt,
          fileUrl: mockImage,
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
      {/* Header */}
      <div className="border-b border-border px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Image Generator
        </h2>
      </div>

      {/* Main Content - Left Input | Right Output */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL - INPUT CONTROLS */}
        <div className="w-80 border-r border-border bg-editor/50 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Base Prompt */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter prompt..."
                  className="min-h-[80px] bg-background text-xs resize-none"
                />
              </div>

              {/* Additional Context */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Details</label>
                <Textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Add style, mood..."
                  className="min-h-[60px] bg-background text-xs resize-none"
                />
              </div>

              {/* Settings Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Quality</label>
                  <Select value={imageQuality} onValueChange={setImageQuality}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4k">4K Ultra (2160P)</SelectItem>
                      <SelectItem value="2k">2K (1440P)</SelectItem>
                      <SelectItem value="1080p">Full HD (1080P)</SelectItem>
                      <SelectItem value="720p">HD (720P)</SelectItem>
                      <SelectItem value="480p">SD (480P)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Size</label>
                  <Select value={imageSize} onValueChange={setImageSize}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Square Formats */}
                      <SelectItem value="square-512">■ Square 512×512</SelectItem>
                      <SelectItem value="square-1024">■ Square 1024×1024</SelectItem>
                      <SelectItem value="square-1536">■ Square 1536×1536</SelectItem>

                      {/* Landscape Formats */}
                      <SelectItem value="landscape-832x1216">🟫 Landscape 832×1216</SelectItem>
                      <SelectItem value="landscape-1024x768">🟫 Landscape 1024×768</SelectItem>
                      <SelectItem value="landscape-1280x720">🟫 Landscape 1280×720 (16:9)</SelectItem>
                      <SelectItem value="landscape-1536x1024">🟫 Landscape 1536×1024 (3:2)</SelectItem>
                      <SelectItem value="landscape-1920x1080">🟫 Landscape 1920×1080 (16:9)</SelectItem>
                      <SelectItem value="landscape-2048x1536">🟫 Landscape 2048×1536</SelectItem>

                      {/* Portrait Formats */}
                      <SelectItem value="portrait-1216x832">🟪 Portrait 1216×832</SelectItem>
                      <SelectItem value="portrait-768x1024">🟪 Portrait 768×1024</SelectItem>
                      <SelectItem value="portrait-720x1280">🟪 Portrait 720×1280 (9:16)</SelectItem>
                      <SelectItem value="portrait-1024x1536">🟪 Portrait 1024×1536 (2:3)</SelectItem>
                      <SelectItem value="portrait-1080x1920">🟪 Portrait 1080×1920 (9:16)</SelectItem>
                      <SelectItem value="portrait-1536x2048">🟪 Portrait 1536×2048</SelectItem>

                      {/* Side by Side Formats */}
                      <SelectItem value="sidebyside-2048x1024">⬅️➡️ Side by Side 2048×1024</SelectItem>
                      <SelectItem value="sidebyside-1920x960">⬅️➡️ Side by Side 1920×960</SelectItem>
                      <SelectItem value="sidebyside-1536x768">⬅️➡️ Side by Side 1536×768</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full h-8 text-xs bg-gradient-ai hover:shadow-glow transition-all"
              >
                {generating ? (
                  <>
                    <Loader2Icon className="w-3 h-3 mr-1 animate-spin" />
                    Generating
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-3 h-3 mr-1" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </ScrollArea>
        </div>

        {/* RIGHT PANEL - OUTPUT AREA */}
        <div className="flex-1 bg-editor flex flex-col overflow-hidden">
          {generatedImages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <SparklesIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-xs text-muted-foreground">
                  Generate an image to see results
                </p>
              </div>
            </div>
          ) : (
            <ScrollArea className="flex-1">
              <div className="p-4 grid grid-cols-1 gap-4">
                {generatedImages.map((imageUrl, index) => (
                  <div key={index} className="group">
                    <div className="relative bg-card rounded-sm overflow-hidden border border-border hover:border-primary/50 transition-colors">
                      <img
                        src={imageUrl}
                        alt={`Generated ${index}`}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <Button
                          onClick={() => handleDownload(imageUrl)}
                          size="sm"
                          variant="ghost"
                          className="w-full h-7 text-xs hover:bg-primary/20"
                        >
                          <DownloadIcon className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{prompt}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>

      {/* Enhanced Prompt Preview */}
      {additionalContext && (
        <div className="border-t border-border px-4 py-2 bg-card/30">
          <p className="text-xs text-muted-foreground line-clamp-1">
            {buildEnhancedPrompt()}
          </p>
        </div>
      )}
    </div>
  );
};
