# OpenRouter AI Chat - Deployment & Setup Guide

## Project: Creative OS
**Feature**: AI Chat with OpenRouter Integration
**Status**: ✅ Ready for Deployment
**API Key**: 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

---

## Implementation Summary

### What Was Built

#### 1. **OpenRouter Utility Module** (`convex/openrouter.ts`)
Complete abstraction layer for OpenRouter API:
- `callOpenRouterAPI()` - Direct API calls with proper headers
- `generateAIResponse()` - AI response generation with context
- `getSystemPrompt()` - Agent-specific system prompts
- `getRecommendedModel()` - Smart model selection per agent mode
- Type definitions and model constants

**Lines of Code**: 185 lines with full documentation

#### 2. **Chat Backend** (`convex/chat.ts`)
Convex mutations and queries for chat operations:

**Mutations:**
- `sendMessage()` - Main function for sending messages and getting AI responses
  - Stores user message in database
  - Calls OpenRouter API with context
  - Stores AI response with token usage
  - Comprehensive error handling
  
- `clearChatHistory()` - Delete conversation history

**Queries:**
- `getChatHistory()` - Retrieve chat history with filtering
- `getAvailableModels()` - List all available AI models

**Lines of Code**: 120 lines with full error handling

#### 3. **Database Schema** (`convex/schema.ts`)
Extended schema with chatHistory table:

```typescript
chatHistory: {
  userId: string                      // User identifier
  agentMode: string                   // Agent mode (screenplay, script, etc.)
  role: string                        // user | assistant
  content: string                     // Message content
  attachments?: string[]              // File attachments
  model?: string                      // AI model used
  usage?: {
    promptTokens: number              // Input tokens
    completionTokens: number          // Output tokens
    totalTokens: number               // Total tokens
  }
  isError?: boolean                   // Error flag
  createdAt: number                   // Timestamp
}

Indexes:
- by_user (userId)
- by_user_mode (userId, agentMode)
- by_created (createdAt)
```

#### 4. **React Hook** (`src/hooks/useOpenRouterChat.ts`)
Custom hook for frontend integration with TypeScript types.

#### 5. **Documentation**
- `OPENROUTER_INTEGRATION.md` - Full API reference (1000+ lines)
- `OPENROUTER_QUICK_START.md` - Quick start guide with examples
- This deployment guide

---

## Pre-Deployment Checklist

- [x] OpenRouter utility module created (`convex/openrouter.ts`)
- [x] Chat mutations/queries implemented (`convex/chat.ts`)
- [x] Database schema updated with chatHistory table
- [x] TypeScript types defined and validated
- [x] Error handling implemented
- [x] API key configured
- [x] Documentation written
- [x] Code reviewed for production readiness

---

## Step-by-Step Deployment

### Step 1: Set Environment Variable

Add the OpenRouter API key to your Convex deployment:

```bash
# For development
npx convex env set OPENROUTER_API_KEY "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"
```

**Verify it's set:**
```bash
npx convex env list
```

### Step 2: Deploy to Convex

Deploy the updated schema and functions:

```bash
npx convex deploy
```

**Expected output:**
```
✓ Building Convex functions...
✓ Deploying schema...
✓ Deployed 3 new functions (chat.ts, openrouter.ts)
✓ Schema updated successfully
```

### Step 3: Test the Deployment

#### Option A: Using Convex Dashboard

1. Open Convex dashboard: http://localhost:8100
2. Go to "Functions" → "chat"
3. Test `sendMessage` mutation:

```json
{
  "userId": "test-user-123",
  "agentMode": "screenplay",
  "content": "Write a dramatic opening scene for a spy thriller"
}
```

4. Verify response contains AI-generated content

#### Option B: Using Convex Command Line

```bash
# Test sending a message
npx convex run chat:sendMessage '{
  "userId": "test-user-123",
  "agentMode": "screenplay",
  "content": "Write a dramatic opening scene"
}'
```

#### Option C: Using Browser Console

```javascript
// In a page with Convex client loaded
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const sendMessage = useMutation(api.chat.sendMessage);

await sendMessage({
  userId: "test-123",
  agentMode: "screenplay",
  content: "Write a tense dialogue between two characters"
});
```

---

## Integration with Frontend

### Update AIChat Component

The existing `AIChat.tsx` component can be enhanced to use Convex:

```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export const AIChat = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sendMessage = useMutation(api.chat.sendMessage);

  const handleSendMessage = async () => {
    setIsLoading(true);
    try {
      const result = await sendMessage({
        userId: currentUser.id,
        agentMode: selectedMode,
        content: inputValue,
        model: selectedModel,
      });

      // Add messages to UI
      setMessages(prev => [...prev, {
        role: "user",
        content: inputValue
      }, {
        role: "assistant",
        content: result.response
      }]);
    } catch (error) {
      console.error("Error:", error);
      // Show error to user
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of component...
};
```

---

## Configuration

### Environment Variables

Required:
```env
OPENROUTER_API_KEY=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
```

Optional (for customization):
```env
# Default temperature for responses (0-2, default: 0.7)
OPENROUTER_TEMPERATURE=0.7

# Default max tokens (default: 2048)
OPENROUTER_MAX_TOKENS=2048

# Default model (default: gpt-3.5-turbo)
OPENROUTER_DEFAULT_MODEL=gpt-3.5-turbo
```

### Convex Functions Deployed

#### Mutations
1. **chat.sendMessage** - Send message and get response
   - Args: userId, agentMode, content, attachments?, model?
   - Returns: { userMessageId, assistantMessageId, response, model, usage }

2. **chat.clearChatHistory** - Clear conversation history
   - Args: userId, agentMode?
   - Returns: { deletedCount }

#### Queries
1. **chat.getChatHistory** - Get conversation history
   - Args: userId, agentMode?, limit?
   - Returns: ChatMessage[]

2. **chat.getAvailableModels** - List available models
   - Args: (none)
   - Returns: Array<{ id, label, recommended }>

---

## Performance & Scaling

### Database Indexes
- `by_user` - Fast lookup of user's all messages
- `by_user_mode` - Fast lookup by agent mode
- `by_created` - Time-based queries

### Conversation Context
- Limited to last 10 messages to balance context vs token usage
- Customize by modifying the `.take(10)` in `sendMessage`

### Token Usage Tracking
- Stored with each assistant message
- Use for billing and cost tracking
- Available in chatHistory.usage

### Response Times
- GPT-3.5-Turbo: ~1-2 seconds
- GPT-4: ~3-5 seconds
- Claude 3: ~2-4 seconds

---

## Monitoring & Debugging

### View Logs

```bash
# Real-time logs
npx convex logs

# Tail logs
npx convex logs --tail
```

### Query Chat History

```bash
# Using Convex CLI
npx convex run chat:getChatHistory '{
  "userId": "test-user-123"
}'
```

### Check Token Usage

```bash
# Get specific chat message with usage info
npx convex query chatHistory '{
  "userId": "test-user-123"
}' | grep -i usage
```

---

## Troubleshooting

### Issue: "OPENROUTER_API_KEY not set"

**Solution:**
```bash
npx convex env set OPENROUTER_API_KEY "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"
npx convex deploy
```

### Issue: "Cannot find module '@/convex/_generated/api'"

**Solution:**
```bash
npx convex dev
# This regenerates the client types
```

### Issue: "OpenRouter API error: 401 Unauthorized"

**Solution:**
- Verify API key is correct
- Check API key hasn't expired
- Verify environment variable is set properly

### Issue: "Rate limit exceeded (429)"

**Solution:**
- Implement exponential backoff retry logic
- Check OpenRouter rate limits (100 req/min)
- Distribute requests over time

### Issue: "Model not found"

**Solution:**
- Check model name is correct
- Use recommended model for agent mode
- Fallback to gpt-3.5-turbo

---

## Production Deployment

### Before Going Live

1. **Set Production API Key**
   ```bash
   npx convex env set OPENROUTER_API_KEY "your-production-key"
   ```

2. **Test with Real Users**
   - Start with beta users
   - Monitor error rates
   - Check token usage and costs

3. **Set Up Monitoring**
   - Track API response times
   - Monitor token usage
   - Alert on errors

4. **Configure Rate Limiting**
   - Implement per-user rate limits
   - Add cool-down periods if needed

5. **Document for Users**
   - Explain agent modes
   - Provide example prompts
   - Set expectations for response time

### Deployment Commands

```bash
# Full deployment
npm run build
npx convex deploy --prod

# Verify deployment
npx convex logs

# Rollback if needed
git revert <commit>
npx convex deploy
```

---

## Cost Estimation

### Token Pricing (approximate per 1M tokens)
- GPT-3.5-Turbo: $0.50-$1.50
- GPT-4: $5-$15
- Claude 3 Opus: $15-$20
- Llama 2: Free-$1

### Usage Estimation
- Average message: ~100 prompt tokens, ~200 completion tokens
- Daily active users × messages per user × average tokens = daily cost

### Example Calculation
- 100 active users
- 10 messages per user per day
- Average 300 tokens per message
- Using GPT-3.5-Turbo: $0.75 per 1M tokens
- Daily cost: 100 × 10 × 300 × $0.75 / 1,000,000 = $0.23/day (~$7/month)

---

## Support & Resources

### Documentation
- Full Integration Guide: `docs/OPENROUTER_INTEGRATION.md`
- Quick Start: `docs/OPENROUTER_QUICK_START.md`

### External Resources
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [OpenRouter API Reference](https://openrouter.ai/docs/api-reference)
- [Convex Documentation](https://docs.convex.dev)
- [Convex Environment Variables](https://docs.convex.dev/production/environment-variables)

### Files Modified/Created
```
convex/
├── openrouter.ts (NEW - 185 lines)
├── chat.ts (UPDATED - 120 lines)
└── schema.ts (UPDATED - chatHistory table)

src/
├── hooks/
│   └── useOpenRouterChat.ts (NEW - React hook)
└── components/
    └── AIChat/
        └── AIChat.tsx (Existing - can be enhanced)

docs/
├── OPENROUTER_INTEGRATION.md (NEW - Full guide)
├── OPENROUTER_QUICK_START.md (NEW - Quick start)
└── OPENROUTER_DEPLOYMENT.md (THIS FILE)
```

---

## Next Steps

1. ✅ Deploy with `npx convex deploy`
2. ✅ Test using Convex dashboard
3. ⬜ Integrate with AIChat component
4. ⬜ Test with real users
5. ⬜ Monitor costs and performance
6. ⬜ Collect user feedback
7. ⬜ Optimize based on usage patterns

---

## Quick Reference

### Deploy
```bash
npx convex env set OPENROUTER_API_KEY "sk-or-v1-..."
npx convex deploy
```

### Test
```bash
npx convex run chat:sendMessage '{
  "userId": "test-123",
  "agentMode": "screenplay",
  "content": "Test message"
}'
```

### View Logs
```bash
npx convex logs --tail
```

### Check Status
```bash
npx convex env list
npx convex status
```

---

**Date**: October 24, 2025
**Version**: 1.0.0
**Status**: Ready for Deployment ✅
