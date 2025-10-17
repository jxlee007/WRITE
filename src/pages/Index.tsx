import { useState } from "react";
import { ActivityBar } from "@/components/ActivityBar";
import { FileExplorer } from "@/components/FileExplorer";
import { PromptTemplates } from "@/components/PromptTemplates";
import { AIGenerator } from "@/components/AIGenerator";
import { ImageGallery } from "@/components/ImageGallery";
import { RecentGenerationsSidebar } from "@/components/RecentGenerationsSidebar";
import { StatusBar } from "@/components/StatusBar";
import { ProjectManager } from "@/components/ProjectManager";
import { WritingEditor } from "@/components/WritingEditor";
import { TokenLibrary } from "@/components/TokenLibrary";
import { DocumentTree } from "@/components/DocumentTree";
import { toast } from "sonner";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

const Index = () => {
  const [activeView, setActiveView] = useState("projects");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<Id<"projects"> | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<Id<"documents"> | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState<string | null>("projects");
  const [isRecentGenerationsOpen, setIsRecentGenerationsOpen] = useState(true);
  
  // TODO: Replace with actual auth
  const userId = "demo-user";

  // Queries
  const currentDocument = useQuery(
    api.documents.getDocument,
    selectedDocumentId ? { id: selectedDocumentId } : "skip"
  );

  // Mutations
  const updateDocument = useMutation(api.documents.updateDocument);

  const handleFileClick = (fileName: string) => {
    toast.info(`Opening: ${fileName}`);
  };

  const handleSelectTemplate = (prompt: string) => {
    setSelectedPrompt(prompt);
    setActiveView("generate");
    toast.success("Template loaded into generator");
  };

  const handleProjectSelect = (projectId: Id<"projects">) => {
    setSelectedProjectId(projectId);
    setActiveView("writing");
    setActiveSidebar("writing");
    setIsSidebarOpen(true);
    toast.success("Project opened");
  };

  const handleActivityBarClick = (view: string) => {
    // Views that have sidebars
    const sidebarViews = ["projects", "writing", "files"];
    
    if (sidebarViews.includes(view)) {
      // If clicking the same view, toggle sidebar
      if (activeSidebar === view && isSidebarOpen) {
        setIsSidebarOpen(false);
      } else {
        setActiveSidebar(view);
        setIsSidebarOpen(true);
      }
    } else if (view === "generate") {
      // For AI Generator, toggle right sidebar
      setIsRecentGenerationsOpen(!isRecentGenerationsOpen);
    } else {
      // For non-sidebar views, close sidebar
      setIsSidebarOpen(false);
      setActiveSidebar(null);
    }
    
    setActiveView(view);
  };

  const handleDocumentSelect = (documentId: Id<"documents">) => {
    setSelectedDocumentId(documentId);
  };

  const handleSaveDocument = async (content: string) => {
    if (!selectedDocumentId) return;
    
    try {
      await updateDocument({
        id: selectedDocumentId,
        content,
      });
      toast.success("Document saved");
    } catch (error) {
      toast.error("Failed to save document");
      console.error(error);
    }
  };

  const renderMainContent = () => {
    switch (activeView) {
      case "projects":
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select a project from the sidebar</p>
          </div>
        );
      case "writing":
        return selectedProjectId ? (
          selectedDocumentId && currentDocument ? (
            <WritingEditor
              documentId={selectedDocumentId}
              projectId={selectedProjectId}
              documentTitle={currentDocument.title}
              initialContent={currentDocument.content}
              onSave={handleSaveDocument}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {selectedDocumentId ? (
                <p>Loading document...</p>
              ) : (
                <p>Create or select a document to start writing</p>
              )}
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a project to start writing
          </div>
        );
      case "files":
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select a file from the explorer</p>
          </div>
        );
      case "tokens":
        return <TokenLibrary projectId={selectedProjectId} />;
      case "generate":
        return <AIGenerator initialPrompt={selectedPrompt} projectId={selectedProjectId} />;
      case "gallery":
        return <ImageGallery />;
      case "templates":
        return <PromptTemplates onSelectTemplate={handleSelectTemplate} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select an activity from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden h-full relative">
        {/* Activity Bar - Static */}
        <ActivityBar activeView={activeView} onViewChange={handleActivityBarClick} />
        
        {/* Collapsible Left Sidebar - Overlays main content */}
        <div 
          className={`
            absolute left-12 top-0 h-full z-20
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            w-64 bg-sidebar border-r border-border shadow-lg
          `}
        >
          {activeSidebar === "files" && <FileExplorer onFileClick={handleFileClick} />}
          {activeSidebar === "projects" && (
            <ProjectManager userId={userId} onProjectSelect={handleProjectSelect} />
          )}
          {activeSidebar === "writing" && (
            <DocumentTree 
              projectId={selectedProjectId}
              selectedDocumentId={selectedDocumentId}
              onDocumentSelect={handleDocumentSelect}
            />
          )}
        </div>

        {/* Right Sidebar - Recent Generations (overlays main content) */}
        <div 
          className={`
            absolute right-0 top-0 h-full z-20
            transition-transform duration-300 ease-in-out
            ${activeView === "generate" && isRecentGenerationsOpen ? 'translate-x-0' : 'translate-x-full'}
            w-80 bg-sidebar border-l border-border shadow-lg
          `}
        >
          {activeView === "generate" && (
            <RecentGenerationsSidebar 
              projectId={selectedProjectId}
              onReusePrompt={setSelectedPrompt}
            />
          )}
        </div>
        
        {/* Main Content Area - Always full width */}
        <div className="flex-1 overflow-hidden ml-0">
          {renderMainContent()}
        </div>
      </div>
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Index;
