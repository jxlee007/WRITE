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
        // Fetch from GitHub API
        const response = await fetch(
          'https://api.github.com/repos/PicoTrex/Awesome-Nano-Banana-images/contents/'
        );
        
        if (response.ok) {
          const files = await response.json();
          // Process README or template files
          // For now, we'll use enhanced mock data based on the repo structure
          const mockTemplates: Template[] = [
            {
              title: "Nano Banana Character",
              prompt: "A cute nano banana character, vibrant yellow, cartoon style, friendly expression, detailed texture, 4k",
              category: "Character",
            },
            {
              title: "Banana in Nature",
              prompt: "Banana in a natural setting, jungle background, tropical atmosphere, photorealistic, high detail",
              category: "Nature",
            },
            {
              title: "Fantasy Banana Kingdom",
              prompt: "Epic fantasy kingdom made of bananas, magical atmosphere, golden hour lighting, cinematic composition",
              category: "Fantasy",
            },
            {
              title: "Cyberpunk Banana",
              prompt: "Futuristic cyberpunk banana, neon lights, digital art, sci-fi aesthetic, high tech",
              category: "Sci-Fi",
            },
            {
              title: "Banana Portrait",
              prompt: "Professional portrait of a banana character, studio lighting, dramatic shadows, artistic composition",
              category: "Portrait",
            },
            {
              title: "Abstract Banana Art",
              prompt: "Abstract digital art featuring banana elements, vibrant colors, geometric shapes, modern design",
              category: "Abstract",
            },
            {
              title: "Banana Product Shot",
              prompt: "Commercial product photography of banana, clean white background, professional lighting, high resolution",
              category: "Product",
            },
            {
              title: "Anime Banana",
              prompt: "Anime style banana character, cute kawaii design, big expressive eyes, colorful, manga aesthetic",
              category: "Anime",
            },
          ];
          
          setTemplates(mockTemplates);
          setFilteredTemplates(mockTemplates);
        } else {
          throw new Error('Failed to fetch from GitHub');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('GitHub fetch error:', error);
        // Fallback to basic templates
        const fallbackTemplates: Template[] = [
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
        ];
        setTemplates(fallbackTemplates);
        setFilteredTemplates(fallbackTemplates);
        setLoading(false);
        toast.info("Using default templates");
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
