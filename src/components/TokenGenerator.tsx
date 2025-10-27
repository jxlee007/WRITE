import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface TokenGeneratorProps {
  initialPrompt?: string;
  projectId?: Id<"projects"> | null;
  onRecentGenerationsToggle?: (open: boolean) => void;
}

export const TokenGenerator = ({ initialPrompt, projectId, onRecentGenerationsToggle }: TokenGeneratorProps) => {
  // Token fields
  const [tokenName, setTokenName] = useState("");
  const [tokenType, setTokenType] = useState("character");
  const [tokenDescription, setTokenDescription] = useState("");
  
  // Image generation fields
  const [imagePrompt, setImagePrompt] = useState(initialPrompt || "");
  const [additionalContext, setAdditionalContext] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string; tokenId?: Id<"tokens"> }>>([]);
  const [imageQuality, setImageQuality] = useState("1080p");
  const [imageSize, setImageSize] = useState("square-1024");

  // Use the unified token system
  const createToken = useMutation(api.tokens.createToken);

  const buildEnhancedPrompt = () => {
    let enhancedPrompt = imagePrompt;

    // Add additional context
    if (additionalContext) {
      enhancedPrompt = `${enhancedPrompt}, ${additionalContext}`;
    }

    // Add quality modifiers
    enhancedPrompt = `${enhancedPrompt}, high quality, detailed, professional`;

    return enhancedPrompt;
  };

  const handleGenerate = async () => {
    // Validate token name
    if (!tokenName.trim()) {
      toast.error("Please enter a token name");
      return;
    }

    // Validate image prompt
    if (!imagePrompt.trim()) {
      toast.error("Please enter an image prompt");
      return;
    }

    setGenerating(true);
    try {
      const enhancedPrompt = buildEnhancedPrompt();
      console.log("Generating token with image:", { tokenName, tokenType, enhancedPrompt });

      // Simulate AI generation
      // In production, this would call actual image generation API
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Mock generated image
      const mockImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      
      // Create token with generated image
      const tokenId = await createToken({
        ...(projectId ? { projectId } : {}),
        type: tokenType,
        name: tokenName,
        description: tokenDescription,
        fileUrl: mockImageUrl,
        primaryImageUrl: mockImageUrl,
        source: "ai-generated",
        prompt: enhancedPrompt,
        modelUsed: "mock-model",
        settings: {
          size: imageSize,
          quality: imageQuality,
        },
        mimeType: "image/png",
      });
      
      // Add to generated images list
      setGeneratedImages((prev) => [{ url: mockImageUrl, tokenId }, ...prev]);
      
      toast.success(`Token "${tokenName}" created successfully!`);
      
      // Clear form for next token
      setTokenName("");
      setTokenDescription("");
      setImagePrompt("");
      setAdditionalContext("");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate token");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${tokenName || 'generated'}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded");
  };

  return (
    <div className="flex-1 bg-editor flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Token Generator
        </h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">
          Create tokens with AI-generated images
        </p>
      </div>

      {/* Main Content - Left Input | Right Output */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL - INPUT CONTROLS */}
        <div className="w-80 border-r border-border bg-editor/50 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Token Name */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="e.g., Dragon Knight, Castle Ruins..."
                  className="bg-background text-xs h-8"
                />
              </div>

              {/* Type, Quality, Size Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground">
                    Type <span className="text-destructive">*</span>
                  </Label>
                  <Select value={tokenType} onValueChange={setTokenType}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="character">Character</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="object">Object</SelectItem>
                      <SelectItem value="creature">Creature</SelectItem>
                      <SelectItem value="faction">Faction</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground">Quality</Label>
                  <Select value={imageQuality} onValueChange={setImageQuality}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4k">4K Ultra</SelectItem>
                      <SelectItem value="2k">2K</SelectItem>
                      <SelectItem value="1080p">Full HD</SelectItem>
                      <SelectItem value="720p">HD</SelectItem>
                      <SelectItem value="480p">SD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground">Size</Label>
                  <Select value={imageSize} onValueChange={setImageSize}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Square Formats */}
                      <SelectItem value="square-512">■ 512×512</SelectItem>
                      <SelectItem value="square-1024">■ 1024×1024</SelectItem>
                      <SelectItem value="square-1536">■ 1536×1536</SelectItem>

                      {/* Landscape Formats */}
                      <SelectItem value="landscape-1024x768">🟫 1024×768</SelectItem>
                      <SelectItem value="landscape-1280x720">🟫 1280×720</SelectItem>
                        <SelectItem value="landscape-1536x1024">🟫 1536×1024</SelectItem>
                        <SelectItem value="landscape-1920x1080">🟫 1920×1080</SelectItem>
                      {/* Portrait Formats */}
                      <SelectItem value="portrait-768x1024">🟪 768×1024</SelectItem>
                      <SelectItem value="portrait-720x1280">🟪 720×1280</SelectItem>
                      <SelectItem value="portrait-1024x1536">🟪 1024×1536</SelectItem>
                      <SelectItem value="portrait-1080x1920">🟪 1080×1920</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Image Prompt */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">
                  Image Prompt <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image to generate..."
                  className="min-h-[80px] bg-background text-xs resize-none"
                />
              </div>

              {/* Token Description */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">Description</Label>
                <Textarea
                  value={tokenDescription}
                  onChange={(e) => setTokenDescription(e.target.value)}
                  placeholder="Describe this token..."
                  className="min-h-[60px] bg-background text-xs resize-none"
                />
              </div>

              {/* Additional Context */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">Style & Details</Label>
                <Textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Add style, mood, lighting..."
                  className="min-h-[60px] bg-background text-xs resize-none"
                />
              </div>
            </div>
          </ScrollArea>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full h-9 text-xs bg-gradient-ai hover:shadow-glow transition-all"
          >
            {generating ? (
              <>
                <Loader2Icon className="w-3 h-3 mr-2 animate-spin" />
                Creating Token...
              </>
            ) : (
              <>
                <SparklesIcon className="w-3 h-3 mr-2" />
                Generate Token
              </>
            )}
          </Button>
        </div>

        {/* RIGHT PANEL - OUTPUT AREA */}
        <div className="flex-1 bg-editor flex flex-col overflow-hidden">
          {generatedImages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <SparklesIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-xs text-muted-foreground mb-1">
                  Generate a token to see results
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Fill in token details and image prompt
                </p>
              </div>
            </div>
          ) : (
            <ScrollArea className="flex-1">
              <div className="p-4 grid grid-cols-1 gap-4">
                {generatedImages.map((item, index) => (
                  <div key={index} className="group">
                    <div className="relative bg-card rounded-sm overflow-hidden border border-border hover:border-primary/50 transition-colors">
                      <img
                        src={item.url}
                        alt={`Generated ${index}`}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <Button
                          onClick={() => handleDownload(item.url)}
                          size="sm"
                          variant="ghost"
                          className="w-full h-7 text-xs hover:bg-primary/20"
                        >
                          <DownloadIcon className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-medium text-foreground line-clamp-1">
                        {item.tokenId ? "✓ Token Created" : "Processing..."}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{imagePrompt}</p>
                    </div>
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
          <p className="text-xs text-muted-foreground/60 line-clamp-1">
            Full prompt: {buildEnhancedPrompt()}
          </p>
        </div>
      )}
    </div>
  );
};
