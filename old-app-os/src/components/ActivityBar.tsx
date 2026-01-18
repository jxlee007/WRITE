import { ImageIcon, LayoutTemplateIcon, Sparkles, PencilIcon, FolderIcon, DatabaseIcon } from "lucide-react";
import { SignedIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AccountButton } from "@/components/account/AccountButton";

interface ActivityBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const ActivityBar = ({ activeView, onViewChange }: ActivityBarProps) => {
  const activities = [
    { id: "projects", icon: FolderIcon, label: "Projects" },
    { id: "writing", icon: PencilIcon, label: "Writing Editor" },
    { id: "tokens", icon: DatabaseIcon, label: "Tokens & Media" },
    { id: "generate", icon: Sparkles, label: "Token Generator" },
    { id: "templates", icon: LayoutTemplateIcon, label: "Prompt Templates" },
  ];

  return (
    <div className="w-12 bg-activitybar border-r border-border flex flex-col items-center py-4 gap-2">
      <div className="flex flex-col items-center gap-2">
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

      <div className="mt-auto">
        <SignedIn>
          <div className="flex items-center justify-center">
            <AccountButton />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};
