import { FileIcon, ImageIcon, LayoutTemplateIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ActivityBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const ActivityBar = ({ activeView, onViewChange }: ActivityBarProps) => {
  const activities = [
    { id: "files", icon: FileIcon, label: "File Explorer" },
    { id: "templates", icon: LayoutTemplateIcon, label: "Prompt Templates" },
    { id: "generate", icon: Sparkles, label: "AI Generation" },
    { id: "gallery", icon: ImageIcon, label: "Image Gallery" },
  ];

  return (
    <div className="w-12 bg-activitybar border-r border-border flex flex-col items-center py-4 gap-2">
      {activities.map((activity) => (
        <Tooltip key={activity.id}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`w-10 h-10 transition-all ${
                activeView === activity.id
                  ? "bg-primary/20 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              onClick={() => onViewChange(activity.id)}
            >
              <activity.icon className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{activity.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
