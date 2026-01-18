import { useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ExternalLinkIcon, SparklesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import promptsSource from "../../prompts.json";

export interface Template {
  id?: string;
  title: string;
  prompt: string;
  category: string;
  previewImage?: string;
  previewImageUrls?: string[];
}

interface PromptTemplatesProps {
  onSelectTemplate: (template: Template) => void;
}

type PromptSource = {
  id?: string;
  category?: string;
  prompt?: string;
  previewImageUrls?: string[];
};

const parsedTemplates: Template[] = (promptsSource as PromptSource[])
  .filter((entry) => entry?.category && entry?.prompt)
  .map((entry) => ({
    id: entry.id,
    title: entry.category as string,
    category: entry.category as string,
    prompt: (entry.prompt as string).trim(),
    previewImage: entry.previewImageUrls?.[0]
      ? `/${entry.previewImageUrls[0].replace(/^\//, "")}`
      : undefined,
    previewImageUrls: entry.previewImageUrls?.map((url) => `/${url.replace(/^\//, "")}`) ?? [],
  }));

export const PromptTemplates = ({ onSelectTemplate }: PromptTemplatesProps) => {
  const templates = parsedTemplates;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTemplates = useMemo(
    () =>
      templates.filter(
        (template) =>
          template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.category.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, templates]
  );

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
          {filteredTemplates.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No templates found
            </div>
          ) : (
            filteredTemplates.map((template, idx) => (
              <Card
                key={template.id ?? idx}
                className="p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => onSelectTemplate(template)}
              >
                <div className="flex items-center gap-3">
                  {template.previewImage ? (
                    <img
                      src={template.previewImage}
                      alt={`${template.title} preview`}
                      className="w-14 h-14 rounded-md object-cover border border-border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-md border border-dashed border-muted-foreground/40 flex items-center justify-center text-muted-foreground text-xs">
                      No image
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight line-clamp-2">
                      {template.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTemplate(template);
                      }}
                    >
                      <SparklesIcon className="w-4 h-4" />
                      <span className="sr-only">Use template</span>
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
