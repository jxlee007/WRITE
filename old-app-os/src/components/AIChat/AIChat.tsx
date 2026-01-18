"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  X,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Copy,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useConvexAuth } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { MarkdownRenderer } from "./MarkdownRenderer";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: string[];
  feedback?: "like" | "dislike" | null;
  isRetrying?: boolean;
}

const copyTextToClipboard = async (text: string): Promise<boolean> => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn(
        "Clipboard API write failed, attempting fallback copy.",
        error,
      );
    }
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const originalRange =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const successful = document.execCommand("copy");

    document.body.removeChild(textarea);

    if (selection) {
      selection.removeAllRanges();
      if (originalRange) {
        selection.addRange(originalRange);
      }
    }

    if (!successful) {
      throw new Error("document.execCommand('copy') returned false.");
    }

    return true;
  } catch (fallbackError) {
    console.error("Fallback clipboard copy failed.", fallbackError);
    return false;
  }
};

// Inlined ChatMessage component with feedback actions
export const ChatMessage = ({
  message,
  onFeedback,
  onRetry,
  onCopy,
  onDelete,
  isLoading,
  isCopied,
}: {
  message: Message;
  onFeedback?: (messageId: string, feedback: "like" | "dislike") => void;
  onRetry?: (messageId: string) => void;
  onCopy?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  isLoading?: boolean;
  isCopied?: boolean;
}) => {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2 group`}
    >
      <div
        className={`rounded-lg p-3 max-w-[80%] ${
          isUser ? "bg-accent text-background" : "bg-muted/50"
        }`}
      >
        {isAssistant ? (
          <MarkdownRenderer content={message.content} isUser={isUser} />
        ) : (
          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
        )}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground">
            Attachments: {message.attachments.join(", ")}
          </div>
        )}
        <div className="mt-1 text-[10px] text-muted-foreground">
          {message.timestamp.toLocaleString()}
        </div>
      </div>

      {/* Action buttons for all messages */}
      <div className="flex flex-col items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isAssistant && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFeedback?.(message.id, "like")}
              disabled={isLoading}
              className={`h-6 w-6 p-0 ${
                message.feedback === "like"
                  ? "bg-green-500/20 text-green-400"
                  : "text-muted-foreground hover:text-green-400 hover:bg-green-500/10"
              }`}
              title="Like this response"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFeedback?.(message.id, "dislike")}
              disabled={isLoading}
              className={`h-6 w-6 p-0 ${
                message.feedback === "dislike"
                  ? "bg-red-500/20 text-red-400"
                  : "text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
              }`}
              title="Dislike this response"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRetry?.(message.id)}
              disabled={isLoading}
              className="h-6 w-6 p-0 text-muted-foreground hover:text-accent hover:bg-accent/10"
              title="Regenerate response"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy?.(message.id, message.content)}
          disabled={isLoading}
          className={`h-6 w-6 p-0 transition-all ${
            isCopied
              ? "text-green-400 bg-green-500/10"
              : "text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10"
          }`}
          title={isCopied ? "Copied!" : "Copy to clipboard"}
        >
          {isCopied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete?.(message.id)}
          disabled={isLoading}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
          title="Delete message"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export interface AIChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
const AGENT_MODES = [
  { id: "screenplay", label: "Screenplay Writer", icon: "🎬" },
  { id: "script", label: "Script Writer", icon: "📝" },
  { id: "story", label: "Story Writer", icon: "📖" },
  { id: "dialogue", label: "Dialogue Writer", icon: "💬" },
  { id: "character", label: "Character Developer", icon: "👤" },
  { id: "worldbuilding", label: "World Builder", icon: "🌍" },
];

export const AIChat = ({ isOpen, onOpenChange }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedMode, setSelectedMode] = useState("screenplay");
  const [selectedModel, setSelectedModel] = useState(
    "mistralai/mistral-small-3.2-24b-instruct:free",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const { isLoaded, userId } = useAuth();
  const { isAuthenticated, isLoading: isConvexLoading } = useConvexAuth();
  const sendMessageMutation = useMutation(api.chat.sendMessage);

  // Available models for the dropdown
  const AVAILABLE_MODELS = [
    {
      id: "mistralai/mistral-small-3.2-24b-instruct:free",
      label: "Mistral Small ",
      description: "Fast and reliable",
    },
    {
      id: "google/gemini-2.0-flash-exp:free",
      label: "Gemini 2.0 Flash ",
      description: "High quality responses",
    },
    {
      id: "deepseek/deepseek-chat-v3.1:free",
      label: "DeepSeek V3.1 ",
      description: "Strong reasoning",
    },
    {
      id: "qwen/qwen3-235b-a22b:free",
      label: "Qwen 3 235B ",
      description: "High performance",
    },
    {
      id: "mistralai/mistral-small-3.2-24b-instruct:free",
      label: "NVIDIA Nemotron ",
      description: "Specialized tasks",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node)
      ) {
        setIsModelDropdownOpen(false);
      }
    };

    if (isModelDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isModelDropdownOpen]);

  const shouldFetchHistory = Boolean(isLoaded && userId && isAuthenticated);
  const convexAuthFailed =
    isLoaded && !!userId && !isAuthenticated && !isConvexLoading;

  const chatHistory = useQuery(
    api.chat.getChatHistory,
    shouldFetchHistory
      ? {
          userId: userId!,
          agentMode: selectedMode,
          limit: 50,
        }
      : "skip",
  );
  const isHistoryLoading = shouldFetchHistory && chatHistory === undefined;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (!shouldFetchHistory) {
      setMessages([]);
      return;
    }

    if (!chatHistory) {
      return;
    }

    setMessages(
      chatHistory.map((message) => ({
        id: message._id,
        role: message.role === "assistant" ? "assistant" : "user",
        content: message.content,
        timestamp: new Date(message.createdAt ?? Date.now()),
        attachments: message.attachments ?? undefined,
      })),
    );
  }, [chatHistory, shouldFetchHistory]);

  useEffect(() => {
    setMessages([]);
    setErrorMessage(null);
  }, [selectedMode]);

  const handleSendMessage = async () => {
    if (isLoading) return;

    const trimmedContent = inputValue.trim();
    if (!trimmedContent && attachedFiles.length === 0) return;
    if (!shouldFetchHistory || !userId) {
      setErrorMessage("You need to be signed in to chat with the AI.");
      return;
    }

    const attachmentNames = attachedFiles.map((f) => f.name);
    const messageContent =
      trimmedContent ||
      (attachmentNames.length > 0
        ? `Uploaded ${attachmentNames.length} file(s)`
        : "");

    // Add user message
    const userMessage: Message = {
      id: `local-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date(),
      attachments: attachmentNames,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setAttachedFiles([]);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await sendMessageMutation({
        userId,
        agentMode: selectedMode,
        content: messageContent,
        attachments: attachmentNames.length > 0 ? attachmentNames : undefined,
        model: selectedModel,
      });
    } catch (error) {
      console.error("Failed to send AI chat message:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting the AI.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFeedback = (messageId: string, feedback: "like" | "dislike") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              feedback: msg.feedback === feedback ? null : feedback,
            }
          : msg,
      ),
    );
  };

  const handleRetry = async (messageId: string) => {
    // Find the assistant message to retry
    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1 || messageIndex === 0) return;

    // Find the user message that prompted this response
    let userMessageIndex = messageIndex - 1;
    while (
      userMessageIndex >= 0 &&
      messages[userMessageIndex].role !== "user"
    ) {
      userMessageIndex--;
    }

    if (userMessageIndex < 0) return;

    const userMessage = messages[userMessageIndex];

    // Remove the assistant message and anything after it
    const newMessages = messages.slice(0, messageIndex);
    setMessages(newMessages);

    // Resend the user's message to get a new response
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await sendMessageMutation({
        userId,
        agentMode: selectedMode,
        content: userMessage.content,
        attachments: userMessage.attachments,
        model: selectedModel,
      });
    } catch (error) {
      console.error("Failed to retry message:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to regenerate response. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (messageId: string, content: string) => {
    copyTextToClipboard(content)
      .then((didCopy) => {
        if (didCopy) {
          setCopiedMessageId(messageId);
          console.log("Message copied to clipboard");
          // Reset the copied state after 2 seconds
          setTimeout(() => {
            setCopiedMessageId(null);
          }, 2000);
        } else {
          console.error("Failed to copy message to clipboard.");
        }
      })
      .catch((error) => {
        console.error("Unexpected clipboard error:", error);
      });
  };

  const handleDelete = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="w-full sm:w-96 right-0 left-auto rounded-l-xl">
        <div className="h-screen flex flex-col bg-sidebar">
          {/* Header */}
          <DrawerHeader className=" flex-shrink-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                Studio Chat
              </DrawerTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DrawerHeader>

          {/* Messages Area */}
          <ScrollArea className="flex-1 overflow-hidden" ref={scrollAreaRef}>
            <div className="p-2 space-y-4 flex flex-col">
              {messages.length === 0 && !isLoading && (
                <div className="flex items-center justify-center h-full min-h-80">
                  <div className="text-center">
                    {convexAuthFailed ? (
                      <p className="text-sm text-muted-foreground">
                        Unable to connect to the AI service right now. Please
                        reload the page or check your connection.
                      </p>
                    ) : isHistoryLoading ? (
                      <p className="text-sm text-muted-foreground">
                        Loading chat history...
                      </p>
                    ) : shouldFetchHistory ? (
                      <p className="text-lg text-muted-foreground">
                        Welcome to Studio Chat! <br /> I'm here to help with
                        your creative writing.
                      </p>
                    ) : (
                      <p className="text-lg text-muted-foreground">
                        Sign in to start chatting with the Studio AI assistant.
                      </p>
                    )}
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onFeedback={handleFeedback}
                  onRetry={handleRetry}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                  isCopied={copiedMessageId === message.id}
                />
              ))}
              {errorMessage && (
                <div className="flex justify-center">
                  <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {errorMessage}
                  </div>
                </div>
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 rounded-lg px-4 py-2">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="px-4 pb-8 flex-shrink-0 bg-sidebar">
            <div className="rounded-2xl border border-primary/20 bg-background/40 ">
              <div className="relative">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type raw ideas... (Shift+Enter for new line)"
                  className="min-h-36 max-h-56 w-full resize-none rounded-md bg-muted/40 border-none pt-10 pb-16 focus-visible:ring-1 focus-visible:ring-primary"
                  disabled={isLoading || !shouldFetchHistory}
                />

                {attachedFiles.length > 0 && (
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                    {attachedFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center gap-2 rounded-full bg-muted/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        <span className="max-w-[160px] truncate text-foreground/80">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          title="Remove attachment"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="absolute left-3 right-3 bottom-3 flex flex-wrap items-center gap-3">
                  <Select
                    value={selectedMode}
                    onValueChange={setSelectedMode}
                    disabled={isLoading || !shouldFetchHistory}
                  >
                    <SelectTrigger className="h-10 max-w-16 flex-1 rounded-lg border-none bg-muted/60 px-3 text-left shadow-none focus:ring-0 focus:ring-offset-0 data-[state=open]:min-w-[180px] data-[state=open]:px-4">
                      <div className="flex items-center gap-2 truncate data-[state=open]:gap-3">
                        <span className="text-base leading-none flex-shrink-0">
                          {AGENT_MODES.find((mode) => mode.id === selectedMode)
                            ?.icon ?? "✨"}
                        </span>
                        <div className="hidden data-[state=open]:flex items-center gap-2 truncate">
                          <SelectValue placeholder="Choose agent mode" />
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {AGENT_MODES.map((mode) => (
                        <SelectItem key={mode.id} value={mode.id}>
                          <div className="flex items-center gap-2">
                            <span>{mode.icon}</span>
                            <span>{mode.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Model Dropdown Button */}
                  <div className="relative" ref={modelDropdownRef}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setIsModelDropdownOpen(!isModelDropdownOpen)
                      }
                      disabled={isLoading || !shouldFetchHistory}
                      className="h-10 px-3 rounded-lg border border-muted/40 bg-muted/60 hover:bg-muted/80 text-xs flex items-center gap-1"
                      title="Select AI model"
                    >
                      <span className="truncate max-w-[100px] text-[11px]">
                        {AVAILABLE_MODELS.find(
                          (m) => m.id === selectedModel,
                        )?.label?.split(" ")[0] || "Model"}
                      </span>
                      <ChevronDown className="h-3 w-3 flex-shrink-0" />
                    </Button>

                    {/* Dropdown Menu */}
                    {isModelDropdownOpen && (
                      <div className="absolute bottom-12 left-0 w-64 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                        <div className="max-h-80 overflow-y-auto">
                          {AVAILABLE_MODELS.map((model) => (
                            <button
                              key={model.id}
                              onClick={() => {
                                setSelectedModel(model.id);
                                setIsModelDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 border-b border-border/50 last:border-b-0 transition-colors ${
                                selectedModel === model.id
                                  ? "bg-primary/20 text-primary"
                                  : "hover:bg-muted/50 text-foreground"
                              }`}
                            >
                              <div className="font-medium text-sm">
                                {model.label}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {model.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".txt,.pdf,.docx,.md,.json"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading || !shouldFetchHistory}
                      className="h-4 w-4 rounded-full bg-muted/40 text-muted-foreground hover:bg-muted/60"
                      title="Attach file"
                    >
                      <Paperclip className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={
                        isLoading ||
                        (!inputValue.trim() && attachedFiles.length === 0) ||
                        !shouldFetchHistory
                      }
                      className="h-6 w-6 text-background shadow-md transition-colors hover:from-primary/90 hover:to-accent/90"
                      title="Send message (Enter)"
                    >
                      <Send className="h-4 w-4 rotate-45" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
