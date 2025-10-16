import { useState } from "react";
import { ActivityBar } from "@/components/ActivityBar";
import { FileExplorer } from "@/components/FileExplorer";
import { PromptTemplates } from "@/components/PromptTemplates";
import { AIGenerator } from "@/components/AIGenerator";
import { ImageGallery } from "@/components/ImageGallery";
import { StatusBar } from "@/components/StatusBar";
import { toast } from "sonner";

const Index = () => {
  const [activeView, setActiveView] = useState("generate");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");

  const handleFileClick = (fileName: string) => {
    toast.info(`Opening: ${fileName}`);
  };

  const handleSelectTemplate = (prompt: string) => {
    setSelectedPrompt(prompt);
    setActiveView("generate");
    toast.success("Template loaded into generator");
  };

  const renderMainContent = () => {
    switch (activeView) {
      case "files":
        return <FileExplorer onFileClick={handleFileClick} />;
      case "templates":
        return <PromptTemplates onSelectTemplate={handleSelectTemplate} />;
      case "generate":
        return <AIGenerator initialPrompt={selectedPrompt} />;
      case "gallery":
        return <ImageGallery />;
      default:
        return <AIGenerator />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar activeView={activeView} onViewChange={setActiveView} />
        
        {/* Sidebar */}
        {activeView === "templates" && (
          <PromptTemplates onSelectTemplate={handleSelectTemplate} />
        )}
        {activeView === "files" && <FileExplorer onFileClick={handleFileClick} />}
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          {renderMainContent()}
        </div>
      </div>
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Index;
