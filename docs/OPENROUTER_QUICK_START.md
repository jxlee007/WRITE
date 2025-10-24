# OpenRouter AI Chat - Quick Start Guide

## 1-Minute Setup

### Step 1: Set Environment Variable
```bash
npx convex env set OPENROUTER_API_KEY "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"
```

### Step 2: Deploy
```bash
npx convex deploy
```

### Step 3: Done! 🎉

## Testing the Integration

### Quick Test in Convex Dashboard

1. Go to http://localhost:8100
2. Click on "Chat" mutations
3. Call `sendMessage` with:
```json
{
  "userId": "user-test",
  "agentMode": "screenplay",
  "content": "Write a dramatic scene between two characters"
}
```

### Expected Response
```json
{
  "userMessageId": "...",
  "assistantMessageId": "...",
  "response": "[Generated screenplay scene]",
  "model": "gpt-4",
  "usage": {
    "prompt_tokens": 123,
    "completion_tokens": 456,
    "total_tokens": 579
  }
}
```

## Using in Components

### Basic Usage
```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export function ChatComponent() {
  const sendMessage = useMutation(api.chat.sendMessage);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      const result = await sendMessage({
        userId: currentUser.id,
        agentMode: "screenplay",
        content: message
      });
      console.log("AI Response:", result.response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
```

### Getting Chat History
```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ChatHistoryComponent() {
  const history = useQuery(api.chat.getChatHistory, {
    userId: currentUser.id,
    agentMode: "screenplay",
    limit: 50
  });

  return (
    <div>
      {history?.map(msg => (
        <div key={msg._id}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
}
```

### Selecting Models
```typescript
const models = useQuery(api.chat.getAvailableModels);

<select onChange={(e) => sendMessage({
  userId,
  agentMode,
  content: message,
  model: e.target.value
})}>
  {models?.map(m => (
    <option key={m.id} value={m.id}>
      {m.label} {m.recommended ? '⭐' : ''}
    </option>
  ))}
</select>
```

## Agent Modes Quick Reference

| Mode | Icon | Best For | Model |
|------|------|----------|-------|
| Screenplay | 🎬 | Scene writing, structure | GPT-4 |
| Script | 📝 | Dialogue, formatting | GPT-3.5-Turbo |
| Story | 📖 | Plot, narrative | GPT-4 |
| Dialogue | 💬 | Character voices | GPT-3.5-Turbo |
| Character | 👤 | Character development | GPT-4 |
| World Builder | 🌍 | Settings, world systems | GPT-4 |

## Common Tasks

### Generate a Screenplay Scene
```typescript
await sendMessage({
  userId: "user-1",
  agentMode: "screenplay",
  content: "Write a tense confrontation scene between a detective and a suspect in an interrogation room"
});
```

### Get Dialogue Suggestions
```typescript
await sendMessage({
  userId: "user-1",
  agentMode: "dialogue",
  content: "The protagonist needs to convince their friend to help with a risky plan. Write natural dialogue."
});
```

### Develop a Character
```typescript
await sendMessage({
  userId: "user-1",
  agentMode: "character",
  content: "Create a complex antagonist: a wealthy businessman with a hidden past and conflicting loyalties"
});
```

### Build a World
```typescript
await sendMessage({
  userId: "user-1",
  agentMode: "worldbuilding",
  content: "Design a futuristic city with unique architecture, culture, and technology"
});
```

## Troubleshooting

### "API key not set" error
```bash
# Check if environment variable is set
npx convex env list

# Set it if missing
npx convex env set OPENROUTER_API_KEY "your-key-here"
```

### "Cannot find module" error
```bash
# Regenerate Convex client
npx convex dev
```

### Slow responses
- Try `gpt-3.5-turbo` instead of `gpt-4`
- Reduce conversation history (less context = faster)
- Check rate limits

## Next Steps

1. **Enhance the UI**: Update AIChat.tsx component to use Convex mutations
2. **Add streaming**: Implement real-time response streaming
3. **Track costs**: Monitor token usage for billing
4. **Fine-tune prompts**: Customize system prompts for your use cases
5. **Add context**: Include project/document context in messages

## File Structure

```
convex/
  ├── openrouter.ts      # OpenRouter utilities
  ├── chat.ts            # Chat mutations/queries
  └── schema.ts          # Database schema

src/
  ├── components/
  │   └── AIChat/
  │       └── AIChat.tsx # Chat UI
  └── hooks/
      └── useOpenRouterChat.ts # React hook

docs/
  ├── OPENROUTER_INTEGRATION.md  # Full documentation
  └── OPENROUTER_QUICK_START.md  # This file
```

## API Limits

- **Rate Limit**: 100 requests/minute
- **Timeout**: 60 seconds per request
- **Max Tokens**: Varies by model (2048 default)
- **Concurrent**: 10 concurrent requests

## Cost Estimation

Approximate costs per 1M tokens:
- GPT-3.5-Turbo: $0.50-$1.50
- GPT-4: $5-$15
- Claude 3: $3-$20
- Llama 2: Free-$1

Check [OpenRouter Pricing](https://openrouter.ai/models) for current rates.

## Support

- 📚 [Documentation](./OPENROUTER_INTEGRATION.md)
- 🔗 [OpenRouter Docs](https://openrouter.ai/docs)
- 📧 Contact support if issues persist
