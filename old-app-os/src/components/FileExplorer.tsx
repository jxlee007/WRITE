import { ChevronRight, FileIcon, FolderIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

const mockFileTree: FileNode[] = [
  {
    name: "prompts",
    type: "folder",
    children: [
      { name: "character-design.txt", type: "file" },
      { name: "landscape-scenes.txt", type: "file" },
      { name: "product-shots.txt", type: "file" },
    ],
  },
  {
    name: "generated",
    type: "folder",
    children: [
      { name: "image-001.png", type: "file" },
      { name: "image-002.png", type: "file" },
    ],
  },
  { name: "README.md", type: "file" },
];

const FileTreeNode = ({
  node,
  onFileClick,
  depth = 0,
}: {
  node: FileNode;
  onFileClick: (name: string) => void;
  depth?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <div
        className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 cursor-pointer group transition-colors"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          if (node.type === "folder") {
            setIsExpanded(!isExpanded);
          } else {
            onFileClick(node.name);
          }
        }}
      >
        {node.type === "folder" && (
          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        )}
        {node.type === "folder" ? (
          <FolderIcon className="w-4 h-4 text-accent" />
        ) : (
          <FileIcon className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="text-sm group-hover:text-foreground">{node.name}</span>
      </div>
      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child, idx) => (
            <FileTreeNode
              key={idx}
              node={child}
              onFileClick={onFileClick}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FileExplorerProps {
  onFileClick: (fileName: string) => void;
}

export const FileExplorer = ({ onFileClick }: FileExplorerProps) => {
  return (
    <div className="w-64 bg-sidebar border-r border-border flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Explorer
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="py-2">
          {mockFileTree.map((node, idx) => (
            <FileTreeNode key={idx} node={node} onFileClick={onFileClick} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
