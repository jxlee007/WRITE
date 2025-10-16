import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ExternalLinkIcon, CopyIcon, SparklesIcon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface Template {
  title: string;
  prompt: string;
  category: string;
}

interface PromptTemplatesProps {
  onSelectTemplate: (prompt: string) => void;
}

export const PromptTemplates = ({ onSelectTemplate }: PromptTemplatesProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch templates from GitHub repo
    const fetchTemplates = async () => {
      try {
        // For now, using mock data. In production, this would fetch from:
        // https://github.com/PicoTrex/Awesome-Nano-Banana-images
        const mockTemplates: Template[] = [
          {
            title: "Character Portrait",
            prompt: "A detailed character portrait, cinematic lighting, highly detailed, 8k resolution",
            category: "Character",
          },
          {
            title: "Fantasy Landscape",
            prompt: "Epic fantasy landscape, magical atmosphere, volumetric lighting, ultra realistic",
            category: "Landscape",
          },
          {
            title: "Product Photography",
            prompt: "Professional product photography, studio lighting, clean background, commercial quality",
            category: "Product",
          },
          {
            title: "Abstract Art",
            prompt: "Abstract digital art, vibrant colors, geometric shapes, modern aesthetic",
            category: "Abstract",
          },
          {
            title: "Sci-Fi Scene",
            prompt: "Futuristic sci-fi scene, cyberpunk aesthetic, neon lights, high detail",
            category: "Sci-Fi",
          },
        ];
        
        setTemplates(mockTemplates);
        setFilteredTemplates(mockTemplates);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load templates");
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const filtered = templates.filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTemplates(filtered);
  }, [searchTerm, templates]);

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard");
  };

  return (
    <div className="w-80 bg-sidebar border-r border-border flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Prompt Templates
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6"
            onClick={() =>
              window.open(
                "https://github.com/PicoTrex/Awesome-Nano-Banana-images",
                "_blank"
              )
            }
          >
            <ExternalLinkIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-background"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {loading ? (
            <div className="text-center text-muted-foreground py-8">
              Loading templates...
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No templates found
            </div>
          ) : (
            filteredTemplates.map((template, idx) => (
              <Card
                key={idx}
                className="p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-sm">{template.title}</h3>
                      <span className="text-xs text-primary">{template.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.prompt}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1"
                      onClick={() => onSelectTemplate(template.prompt)}
                    >
                      <SparklesIcon className="w-3 h-3 mr-1" />
                      Use
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyPrompt(template.prompt)}
                    >
                      <CopyIcon className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
