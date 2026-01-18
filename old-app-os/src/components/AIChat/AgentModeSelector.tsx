import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface AgentMode {
  id: string;
  label: string;
  icon: string;
}

interface AgentModeSelectorProps {
  modes: AgentMode[];
  selected: string;
  onSelect: (modeId: string) => void;
}

export const AgentModeSelector = ({
  modes,
  selected,
  onSelect,
}: AgentModeSelectorProps) => {
  const selectedMode = modes.find((m) => m.id === selected);

  return (
    <DropdownMenu>
      <div className="relative">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between border-primary/30 hover:bg-primary/10 bg-muted/50"
          >
            <span className="flex items-center gap-2">
              {selectedMode?.icon}
              <span className="text-sm">{selectedMode?.label}</span>
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-full min-w-[200px] bg-sidebar border-primary/30"
          align="start"
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Select Agent Mode
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/50" />

          {modes.map((mode) => (
            <DropdownMenuItem
              key={mode.id}
              onClick={() => onSelect(mode.id)}
              className={`cursor-pointer flex items-center gap-2 ${
                selected === mode.id
                  ? "bg-primary/20 text-primary"
                  : "text-foreground hover:bg-primary/10"
              }`}
            >
              <span>{mode.icon}</span>
              <span className="text-sm">{mode.label}</span>
              {selected === mode.id && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};
