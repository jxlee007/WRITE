"use client";

import { useState } from "react";
import { SearchIcon, BellIcon, Rainbow } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Input } from "./ui/input";
import { AIChat } from "./AIChat";

export const TopBar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const menuGroups = [
    {
      label: "File",
      items: ["New Project", "New Document", "Open Recent", "Open Workspace Folder", "Save As", "Auto Save", "Preferences", "Export", "Exit"],
    },
    {
      label: "Edit",
      items: ["Undo", "Redo", "Cut", "Copy", "Paste", "Find", "Replace", "Toggle Comment"],
    },
    {
      label: "View",
      items: ["Toggle Sidebar", "Focus Mode", "Zen Mode", "Word Wrap"],
    },
    {
      label: "Help",
      items: ["AI Studio Docs", "Keyboard Shortcuts", "Report Issue"],
    },
  ] as const;

  return (
    <header className="h-7 border-b border-primary border-opacity-30 bg-statusbar bg-opacity-90 backdrop-blur flex items-center px-4 text-xs text-primary-foreground">
      <div className="flex items-center gap-2">
        {menuGroups.map((group) => (
          <div key={group.label} className="relative group">
            <button
              type="button"
              className="uppercase tracking-wide px-2 py-1 text-primary-foreground text-opacity-80 transition hover:text-primary-foreground hover:text-opacity-100"
            >
              {group.label}
            </button>
            <div
              className="pointer-events-none absolute left-0 top-full hidden min-w-[10rem] translate-y-1 rounded-md border border-primary border-opacity-40 bg-sidebar bg-opacity-95 py-1 text-left shadow-elevated backdrop-blur group-hover:block group-hover:pointer-events-auto"
            >
              {group.items.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="w-full px-3 py-1 text-left text-md text-primary-foreground text-opacity-80 transition hover:bg-primary hover:bg-opacity-90 hover:text-primary-foreground hover:text-opacity-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 px-6">
        <div className="relative mx-auto max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground text-opacity-70" />
          <Input
            type="search"
            placeholder="Search projects, documents, tokens..."
            className="h-6 rounded-full border-primary border-opacity-40 bg-primary bg-opacity-20 pl-9 pr-4 text-xs text-primary-foreground placeholder:text-primary-foreground placeholder:text-opacity-70 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* <span className="hidden md:inline">AI Studio v1.0</span> */}
        <button
          className="h-5 w-5 cursor-pointer hover:opacity-80 transition-all"
          onClick={() => setIsChatOpen(true)}
          title="Open AI Chat"
          type="button"
        >
          <Rainbow className="h-5 w-5" />
        </button>
        <BellIcon className="h-4 w-4 cursor-pointer hover:opacity-80" />
        <SignedIn>
          <UserButton appearance={{ elements: { avatarBox: "h-5 w-5" } }} afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>

      <AIChat isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </header>
  );
};
