import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Label } from "./ui/label";
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

interface DocumentTreeProps {
  projectId?: Id<"projects"> | null; // Made optional
  selectedDocumentId: Id<"documents"> | null;
  onDocumentSelect: (documentId: Id<"documents">) => void;
}

export function DocumentTree({
  projectId,
  selectedDocumentId,
  onDocumentSelect,
}: DocumentTreeProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [renameDocTitle, setRenameDocTitle] = useState("");
  const [editingDoc, setEditingDoc] = useState<Id<"documents"> | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<Id<"documents"> | null>(null);
  const [draggedDoc, setDraggedDoc] = useState<Id<"documents"> | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["chapters"]),
  );

  // Queries - now works without projectId
  const documents = useQuery(
    api.documents.getDocuments,
    projectId ? { projectId } : {},
  );

  // Mutations
  const createDocument = useMutation(api.documents.createDocument);
  const updateDocument = useMutation(api.documents.updateDocument);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const handleCreateDocument = async () => {
    if (!newDocTitle.trim()) {
      toast.error("Please enter a document title");
      return;
    }

    try {
      const docId = await createDocument({
        ...(projectId ? { projectId } : {}),
        title: newDocTitle,
        content: "",
      });
      setNewDocTitle("");
      setIsCreateOpen(false);
      toast.success("Document created");
      onDocumentSelect(docId);
    } catch (error) {
      toast.error("Failed to create document");
      console.error(error);
    }
  };

  const handleRenameDocument = async () => {
    if (!editingDoc || !renameDocTitle.trim()) {
      toast.error("Please enter a document title");
      return;
    }

    try {
      await updateDocument({
        id: editingDoc,
        title: renameDocTitle,
      });
      setRenameDocTitle("");
      setEditingDoc(null);
      setIsRenameOpen(false);
      toast.success("Document renamed");
    } catch (error) {
      toast.error("Failed to rename document");
      console.error(error);
    }
  };

  const handleDeleteDocument = async () => {
    if (!deletingDoc) return;

    try {
      await deleteDocument({ id: deletingDoc });
      setDeletingDoc(null);
      setIsDeleteOpen(false);
      toast.success("Document deleted");

      // If deleted document was selected, clear selection
      if (selectedDocumentId === deletingDoc) {
        // Select first available document if any
        if (documents && documents.length > 1) {
          const nextDoc = documents.find((d) => d._id !== deletingDoc);
          if (nextDoc) onDocumentSelect(nextDoc._id);
        }
      }
    } catch (error) {
      toast.error("Failed to delete document");
      console.error(error);
    }
  };

  const openRenameDialog = (doc: any) => {
    setEditingDoc(doc._id);
    setRenameDocTitle(doc.title);
    setIsRenameOpen(true);
  };

  const openDeleteDialog = (doc: any) => {
    setDeletingDoc(doc._id);
    setIsDeleteOpen(true);
  };

  const handleDragStart = (docId: Id<"documents">) => {
    setDraggedDoc(docId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (targetDocId: Id<"documents">) => {
    if (!draggedDoc || draggedDoc === targetDocId || !documents) return;

    try {
      const draggedIndex = documents.findIndex((d) => d._id === draggedDoc);
      const targetIndex = documents.findIndex((d) => d._id === targetDocId);

      if (draggedIndex === -1 || targetIndex === -1) return;

      // Update order for all affected documents
      const reordered = [...documents];
      const [movedDoc] = reordered.splice(draggedIndex, 1);
      reordered.splice(targetIndex, 0, movedDoc);

      // Update documentOrder for each document
      for (let i = 0; i < reordered.length; i++) {
        await updateDocument({
          id: reordered[i]._id,
          documentOrder: i,
        });
      }

      toast.success("Documents reordered");
    } catch (error) {
      toast.error("Failed to reorder documents");
      console.error(error);
    } finally {
      setDraggedDoc(null);
    }
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const getWordCount = (content: string): number => {
    if (!content) return 0;
    // Remove HTML tags and count words
    const text = content.replace(/<[^>]*>/g, " ");
    return text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  };

  return (
    <div className="w-64 border-r border-border bg-[#252526] flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Documents</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
              <DialogDescription>
                Add a new chapter or scene{projectId ? " to your project" : ""}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  placeholder="Chapter 1: The Beginning"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateDocument();
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDocument}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Document List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Chapters Folder */}
          <div className="mb-1">
            <button
              onClick={() => toggleFolder("chapters")}
              className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-[#2a2d2e] rounded text-sm text-muted-foreground"
            >
              {expandedFolders.has("chapters") ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <FileText className="h-4 w-4" />
              <span>Chapters</span>
              <span className="ml-auto text-xs">{documents?.length || 0}</span>
            </button>
          </div>

          {/* Document Items */}
          {expandedFolders.has("chapters") && documents && (
            <div className="ml-4 space-y-1">
              {documents.length === 0 ? (
                <div className="py-8 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-xs text-muted-foreground">
                    No documents yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click + to create one
                  </p>
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc._id}
                    draggable
                    onDragStart={() => handleDragStart(doc._id)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(doc._id)}
                    className={`
                      group flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer
                      ${
                        selectedDocumentId === doc._id
                          ? "bg-[#37373d] text-white"
                          : "hover:bg-[#2a2d2e] text-muted-foreground"
                      }
                      ${draggedDoc === doc._id ? "opacity-50" : ""}
                    `}
                    onClick={() => onDocumentSelect(doc._id)}
                  >
                    <GripVertical className="h-3 w-3 opacity-0 group-hover:opacity-50 flex-shrink-0" />
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {getWordCount(doc.content)} words
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          openRenameDialog(doc);
                        }}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteDialog(doc);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Rename Dialog */}
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new title for this document
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rename-title">Document Title</Label>
              <Input
                id="rename-title"
                value={renameDocTitle}
                onChange={(e) => setRenameDocTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameDocument();
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameDocument}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this document and all token usages
              within it. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDocument}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
