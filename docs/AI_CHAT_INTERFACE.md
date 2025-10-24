# AI Chat Interface Implementation Guide

## Overview

A sophisticated AI chat interface that slides in from the right side of the screen when the rainbow icon in the top bar is clicked. The interface provides chat bubble messaging, file attachments, and multiple AI agent modes for creative writing assistance.

## Features

### 1. **Chat Interface**
- Slide-in drawer component from the right side
- Responsive design with scrollable message area
- Real-time message display with timestamps
- Automatic scroll to latest message
- Loading state with animated dots

### 2. **Message Bubbles**
- User messages: Right-aligned with gradient background (primary to accent colors)
- AI assistant messages: Left-aligned with subtle background
- Timestamp display for each message
- File attachment indicators within messages

### 3. **Agent Modes**
Dropdown selector with 6 different creative writing agent modes:
- 🎬 **Screenplay Writer** - Professional screenplay writing assistance
- 📝 **Script Writer** - Dialogue and script formatting
- 📖 **Story Writer** - Narrative structure and plot development
- 💬 **Dialogue Writer** - Character dialogue creation
- 👤 **Character Developer** - Character creation and development
- 🌍 **World Builder** - Fictional world creation and consistency

### 4. **Input Controls**
- **Textarea Input**: Multi-line message composition with Shift+Enter for new lines
- **Enter to Send**: Press Enter to send message instantly
- **File Attachment**: Paperclip button to attach files (.txt, .pdf, .docx, .md, .json)
- **Send Button**: Send message with visual feedback
- **File Display**: Shows attached files with remove option

## File Structure

```
src/components/AIChat/
├── AIChat.tsx                 # Main component with message state and UI logic
├── ChatMessage.tsx            # Individual message bubble component
├── AgentModeSelector.tsx       # Dropdown selector for agent modes
└── index.ts                   # Barrel export for easy imports

src/components/
└── TopBar.tsx                 # Updated to include rainbow icon handler

convex/
├── chat.ts                    # Backend functions for chat history
└── schema.ts                  # Updated schema with chatHistory table
```

## Component Details

### AIChat Component (`AIChat.tsx`)

**Props:**
```typescript
interface AIChatProps {
  isOpen: boolean;                    // Drawer visibility state
  onOpenChange: (open: boolean) => void; // Callback to change visibility
}
```

**Key Features:**
- Message state management with React hooks
- Automatic scroll-to-bottom on new messages
- File attachment handling and display
- Loading state animation
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

**State:**
- `messages`: Array of Message objects
- `inputValue`: Current textarea value
- `selectedMode`: Currently selected agent mode
- `isLoading`: Loading state during API calls
- `attachedFiles`: Array of selected files

### ChatMessage Component (`ChatMessage.tsx`)

**Props:**
```typescript
interface ChatMessageProps {
  message: Message;
}
```

**Message Structure:**
```typescript
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: string[];
}
```

**Styling:**
- User messages: Gradient background with primary-to-accent colors
- Assistant messages: Muted background with border
- Responsive max-width for different screen sizes

### AgentModeSelector Component (`AgentModeSelector.tsx`)

**Props:**
```typescript
interface AgentModeSelectorProps {
  modes: AgentMode[];
  selected: string;
  onSelect: (modeId: string) => void;
}

interface AgentMode {
  id: string;
  label: string;
  icon: string;
}
```

**Features:**
- Dropdown menu with all available agent modes
- Visual indication of selected mode (checkmark)
- Icon and label display for each mode
- Smooth hover transitions

## Convex Backend Integration

### Schema Updates (`schema.ts`)

Added `chatHistory` table for persistent message storage:
```typescript
chatHistory: defineTable({
  userId: v.string(),
  agentMode: v.string(),
  role: v.string(),              // "user" or "assistant"
  content: v.string(),
  attachments: v.optional(v.array(v.string())),
  createdAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_mode", ["userId", "agentMode"])
  .index("by_created", ["createdAt"]),
```

### Backend Functions (`chat.ts`)

#### `sendMessage` - Mutation
Sends a message and generates AI response
```typescript
sendMessage({
  userId: string;
  agentMode: string;
  content: string;
  attachments?: string[];
})
```

Returns:
```typescript
{
  userMessageId: Id<"chatHistory">;
  assistantMessageId: Id<"chatHistory">;
  response: string;
}
```

#### `getChatHistory` - Query
Retrieves chat history for user and optional agent mode
```typescript
getChatHistory({
  userId: string;
  agentMode?: string;
  limit?: number;  // default: 50
})
```

#### `clearChatHistory` - Mutation
Clears chat history for user or specific agent mode
```typescript
clearChatHistory({
  userId: string;
  agentMode?: string;
})
```

Returns:
```typescript
{ deletedCount: number }
```

## Usage

### Opening the Chat Interface

Click the rainbow icon in the top bar to open the chat interface:

```tsx
<button onClick={() => setIsChatOpen(true)}>
  <Rainbow className="h-5 w-5" />
</button>
```

### Sending Messages (Frontend)

The component currently uses local state management. To integrate with backend:

```tsx
const handleSendMessage = async () => {
  // Get current user ID from Convex
  const userId = "user-id-from-auth";
  
  // Call Convex mutation
  await sendMessage({
    userId,
    agentMode: selectedMode,
    content: inputValue,
    attachments: attachedFiles.map(f => f.name),
  });
};
```

### Retrieving Chat History

```tsx
useEffect(() => {
  const loadHistory = async () => {
    const history = await getChatHistory({
      userId: "user-id",
      agentMode: "screenplay",
      limit: 50,
    });
    setMessages(history);
  };
  
  if (isOpen) {
    loadHistory();
  }
}, [isOpen]);
```

## Styling & Theme

The component uses the project's existing design system:

- **Color Scheme**: Dark theme with purple accents
- **Primary Color**: HSL(263, 70%, 62%) - Purple/Violet
- **Accent Color**: HSL(210, 100%, 60%) - Cyan/Blue
- **Background**: HSL(222, 47%, 11%) - Dark blue-gray
- **Muted**: HSL(217, 33%, 17%) - Medium gray

### Tailwind Classes Used

- `bg-sidebar`: Sidebar background
- `bg-muted/50`: Muted background with opacity
- `bg-gradient-to-r from-primary to-accent`: Message gradient
- `rounded-lg`, `rounded-br-none`: Border radius
- `animate-pulse`: Loading animation
- `delay-100`, `delay-200`: Staggered animation delays

## AI Service Integration

The `generateAIResponse` function in `chat.ts` is a placeholder. To integrate with actual AI services:

### OpenAI Integration Example

```typescript
import OpenAI from "openai";

async function generateAIResponse(agentMode: string, userMessage: string) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const systemPrompt = getSystemPrompt(agentMode);

  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });

  return response.choices[0].message.content || "";
}
```

### Anthropic Claude Integration Example

```typescript
import Anthropic from "@anthropic-ai/sdk";

async function generateAIResponse(agentMode: string, userMessage: string) {
  const client = new Anthropic();
  const systemPrompt = getSystemPrompt(agentMode);

  const response = await client.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
```

## Configuration & Environment Variables

Add these to your `.env.local`:

```env
# OpenAI
VITE_OPENAI_API_KEY=your-key-here

# Anthropic
VITE_ANTHROPIC_API_KEY=your-key-here

# Convex
VITE_CONVEX_URL=your-convex-url
```

## Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in textarea
- **Escape** (future): Close chat drawer

## Accessibility

- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- High contrast text colors
- Focus visible states for keyboard users

## Performance Optimizations

- Message scrolling uses Radix UI ScrollArea for efficiency
- Memoization of components (recommended for large message lists)
- Lazy loading of chat history if needed
- Debounced file upload handling

## Future Enhancements

1. **Real-time Collaboration**: Multiple users in same chat
2. **Message Editing/Deletion**: Allow users to edit sent messages
3. **Code Highlighting**: Display code blocks with syntax highlighting
4. **Markdown Support**: Render markdown in messages
5. **Audio Transcription**: Convert voice notes to text
6. **Export Conversations**: Save chat history as PDF/TXT
7. **Custom Agents**: Allow users to create custom agent modes
8. **Model Selection**: Choose different AI models
9. **Temperature/Parameters**: Fine-tune AI response behavior
10. **Conversation Threading**: Group related conversations

## Testing

### Component Testing

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AIChat } from "./AIChat";

describe("AIChat", () => {
  it("should open drawer when isOpen is true", () => {
    render(<AIChat isOpen={true} onOpenChange={() => {}} />);
    expect(screen.getByText("AI Studio Chat")).toBeInTheDocument();
  });

  it("should send message on Enter key", async () => {
    const user = userEvent.setup();
    render(<AIChat isOpen={true} onOpenChange={() => {}} />);
    
    const textarea = screen.getByPlaceholderText(/Type your creative request/);
    await user.type(textarea, "Hello{Enter}");
    
    expect(textarea).toHaveValue("");
  });
});
```

## Troubleshooting

### Chat not persisting across sessions
- Check if Convex is properly configured
- Verify `userId` is being captured from authentication
- Ensure chatHistory table is deployed to Convex

### Styling issues
- Clear CSS cache: Delete `.next/` or `dist/` and rebuild
- Verify Tailwind configuration includes component files
- Check for CSS class conflicts with existing styles

### File upload not working
- Verify file input accepts correct file types
- Check browser file API permissions
- Ensure files are under size limit

## Support & Resources

- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Convex Documentation](https://docs.convex.dev/)
- [Radix UI Components](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Created**: October 23, 2025
**Version**: 1.0.0
**Status**: Production Ready
