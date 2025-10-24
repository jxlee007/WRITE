# OpenRouter AI Chat - Quick Reference Card

## 🚀 Quick Deploy

```bash
# 1. Set API Key
npx convex env set OPENROUTER_API_KEY "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"

# 2. Deploy
npx convex deploy

# 3. Test
npx convex run chat:sendMessage '{
  "userId": "user-1",
  "agentMode": "screenplay",
  "content": "Test message"
}'
```

---

## 📚 Documentation Files

| File | Purpose | Link |
|------|---------|------|
| Quick Start | 1-minute setup | `OPENROUTER_QUICK_START.md` |
| Full API | Complete reference | `OPENROUTER_INTEGRATION.md` |
| Deployment | Production guide | `OPENROUTER_DEPLOYMENT.md` |
| Summary | Implementation overview | `OPENROUTER_IMPLEMENTATION_SUMMARY.md` |

---

## 🎭 Agent Modes

```typescript
// Screenplay Writer - visual storytelling
"screenplay" → GPT-4

// Script Writer - dialogue & formatting
"script" → GPT-3.5-Turbo

// Story Writer - narrative & plot
"story" → GPT-4

// Dialogue Writer - character voices
"dialogue" → GPT-3.5-Turbo

// Character Developer - character development
"character" → GPT-4

// World Builder - world systems
"worldbuilding" → GPT-4
```

---

## 💻 Code Snippets

### Basic Usage (React)
```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const sendMessage = useMutation(api.chat.sendMessage);

await sendMessage({
  userId: "user-123",
  agentMode: "screenplay",
  content: "Your message here",
  model: "gpt-4"  // optional
});
```

### Get Chat History
```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const history = useQuery(api.chat.getChatHistory, {
  userId: "user-123",
  agentMode: "screenplay",
  limit: 50
});
```

### Available Models
```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const models = useQuery(api.chat.getAvailableModels);
// Returns: [{ id, label, recommended }, ...]
```

---

## 🔌 Convex Mutations & Queries

### sendMessage
```
Args: {
  userId: string
  agentMode: string
  content: string
  attachments?: string[]
  model?: string
}

Returns: {
  userMessageId: string
  assistantMessageId: string
  response: string
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
```

### getChatHistory
```
Args: {
  userId: string
  agentMode?: string
  limit?: number
}

Returns: ChatMessage[]
```

### clearChatHistory
```
Args: {
  userId: string
  agentMode?: string
}

Returns: { deletedCount: number }
```

### getAvailableModels
```
Args: (none)

Returns: [{ id, label, recommended }, ...]
```

---

## 🛠️ File Structure

```
convex/
  ├── openrouter.ts      ← Core OpenRouter functions
  ├── chat.ts            ← Chat mutations/queries
  └── schema.ts          ← Database schema

src/
  ├── components/AIChat/
  │   └── AIChat.tsx     ← UI component
  └── hooks/
      └── useOpenRouterChat.ts

docs/
  ├── OPENROUTER_INTEGRATION.md
  ├── OPENROUTER_QUICK_START.md
  ├── OPENROUTER_DEPLOYMENT.md
  ├── OPENROUTER_IMPLEMENTATION_SUMMARY.md
  └── OPENROUTER_QUICK_REFERENCE.md (this file)
```

---

## 🎓 Example Prompts

### Screenplay
```
"Write a tense confrontation scene between a detective and a suspect 
in an interrogation room. Include dialogue, action, and emotional beats."
```

### Script
```
"Create a comedic exchange where a character tries to explain 
a mistake to their boss. Keep it light and relatable."
```

### Story
```
"Develop a plot complication where the protagonist discovers 
an unexpected ally is actually working against them."
```

### Dialogue
```
"Write authentic dialogue between two old friends reuniting after 
years apart. Include emotional depth and natural speech patterns."
```

### Character
```
"Create a complex antagonist: a charismatic leader with genuine 
ideals but ruthless methods. Include backstory and motivations."
```

### World Building
```
"Design a futuristic city with unique architecture, culture, 
and technology. Describe key locations and how society functions."
```

---

## ⚙️ Configuration

### Environment Variables
```bash
# Required
OPENROUTER_API_KEY=sk-or-v1-...

# Optional (defaults shown)
OPENROUTER_TEMPERATURE=0.7
OPENROUTER_MAX_TOKENS=2048
OPENROUTER_DEFAULT_MODEL=gpt-3.5-turbo
```

### Customization Points

**Change default model:**
```typescript
// In convex/chat.ts
const modelToUse = args.model || "gpt-4";
```

**Add custom agent mode:**
```typescript
// In convex/openrouter.ts
case "my-mode":
  return "Your system prompt...";
```

**Adjust conversation context:**
```typescript
// In convex/chat.ts
.take(20)  // More messages = more context
```

---

## 🔍 Debugging

### Check logs
```bash
npx convex logs --tail
```

### List environment variables
```bash
npx convex env list
```

### Run specific mutation
```bash
npx convex run chat:sendMessage '{...}'
```

### Test Convex status
```bash
npx convex status
```

---

## 📊 Models & Pricing

| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| GPT-3.5-Turbo | ⚡⚡⚡ | $ | Scripts, Dialogue |
| GPT-4 | ⚡⚡ | $$$ | Screenplay, Story |
| Claude 3 | ⚡⚡ | $$ | Narrative, Character |
| Llama 2 | ⚡⚡⚡ | Free | Budget-friendly |
| Gemini Pro | ⚡⚡ | $ | Multimodal |

---

## ⚠️ Common Issues

| Error | Fix |
|-------|-----|
| `API key not set` | `npx convex env set ...` |
| `Module not found` | `npx convex dev` |
| `401 Unauthorized` | Verify API key |
| `429 Too Many Requests` | Slow down request rate |
| `Model not found` | Check model name |

---

## 📈 Monitoring

### Track Usage
```typescript
// Each response includes token usage
const result = await sendMessage(...);
console.log(result.usage.totalTokens);
```

### Estimate Costs
```
Cost = (tokens × rate) / 1,000,000

Example: 1000 tokens × $0.75/1M = $0.00075
```

### Performance Monitoring
- GPT-3.5-Turbo: 1-2s per response
- GPT-4: 3-5s per response
- Average: 300 tokens per message

---

## 🎯 Next Steps

1. ✅ Deploy: `npx convex deploy`
2. ✅ Test: Try in Convex dashboard
3. ⬜ Integrate: Add to AIChat component
4. ⬜ Monitor: Track usage and costs
5. ⬜ Optimize: Fine-tune prompts
6. ⬜ Scale: Handle more users

---

## 📞 Help

- 📖 Full docs: `OPENROUTER_INTEGRATION.md`
- 🚀 Quick start: `OPENROUTER_QUICK_START.md`
- 📋 Deployment: `OPENROUTER_DEPLOYMENT.md`
- 🔍 API Reference: See full docs
- 💬 Support: Check Convex logs

---

## Useful Commands

```bash
# Deploy
npx convex deploy

# Development
npx convex dev

# View logs
npx convex logs

# Check environment
npx convex env list

# Set variable
npx convex env set KEY "value"

# Run function
npx convex run chat:sendMessage '{...}'

# Check status
npx convex status
```

---

**API Key**: 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
**Status**: ✅ Ready
**Version**: 1.0.0
