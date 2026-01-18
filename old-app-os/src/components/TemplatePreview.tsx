import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SparklesIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";
import type { Template } from "./PromptTemplates";

interface TemplatePreviewProps {
  template: Template;
  onUseInGenerator: (prompt: string) => void;
}

export const TemplatePreview = ({ template, onUseInGenerator }: TemplatePreviewProps) => {
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(template.prompt);
    toast.success("Prompt copied to clipboard");
  };

  const handleUsePrompt = () => {
    onUseInGenerator(template.prompt);
  };

  return (
    <div className="h-full flex bg-background overflow-hidden">
      {/* Left Panel - Preview Image (60%) */}
      <div className="flex-[3] flex items-center justify-center p-8 bg-muted/20">
        {template.previewImage ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={template.previewImage}
              alt={template.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No preview image available</p>
          </div>
        )}
      </div>

      {/* Right Panel - Details (40%) - merged into one scrollable column */}
      <div className="flex-[2] min-w-96 max-w-lg border-l border-border bg-card">
        <div className="p-6 h-full overflow-y-auto flex flex-col space-y-6">
          {/* Header (now part of the scrollable content) */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">{template.title}</h1>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {template.category}
              </span>
            </div>
          </div>

          {/* Prompt Display (scrolls with header and actions) */}
          <div className="flex-1 ">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Prompt
                </h3>
                <Button size="sm" variant="ghost" onClick={handleCopyPrompt}>
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Card className="p-4 bg-muted/50">
                <p className="text-sm leading-relaxed text-foreground overflow-y-auto no-scrollbar">
                  {template.prompt}
                </p>
              </Card>
              {/* Action Button (now part of the scrollable content, at the bottom of the column) */}
              <div className="space-y-2">
                <div className="flex gap-3">
                  <Button size="lg" onClick={handleUsePrompt} className="w-full">
                    <SparklesIcon className="w-4 h-4 mr-2" />
                    Use
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Click "Use" to load this prompt into the AI image generator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
