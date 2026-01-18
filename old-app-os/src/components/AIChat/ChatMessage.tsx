import { Message } from "./AIChat";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-br-none"
            : "bg-muted/50 text-foreground rounded-bl-none border border-border/50"
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 pt-2 border-t border-current border-opacity-20">
            <p className="text-xs opacity-70 mb-1">Attachments:</p>
            <ul className="text-xs space-y-1">
              {message.attachments.map((attachment, idx) => (
                <li key={idx} className="opacity-80 truncate">
                  📎 {attachment}
                </li>
              ))}
            </ul>
          </div>
        )}
        <span className="text-xs opacity-70 mt-1 block">
          {format(message.timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
};
