import { CheckCircle2Icon, GitBranchIcon, BellIcon } from "lucide-react";

export const StatusBar = () => {
  return (
    <div className="h-6 bg-statusbar border-t border-primary/30 flex items-center justify-between px-4 text-xs text-primary-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranchIcon className="w-3 h-3" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2Icon className="w-3 h-3" />
          <span>Ready</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span>AI Studio v1.0</span>
        <BellIcon className="w-3 h-3 cursor-pointer hover:opacity-80" />
      </div>
    </div>
  );
};
