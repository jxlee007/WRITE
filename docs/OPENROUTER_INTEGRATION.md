# OpenRouter AI Chat Integration Guide

## Overview

This document describes the implementation of OpenRouter AI integration for the Creative OS AI Chat feature. The implementation leverages OpenRouter's unified API to access multiple AI models (GPT-4, Claude 3, Llama 2, etc.) for creative writing assistance.

## Architecture

### Components

#### 1. **convex/openrouter.ts** - OpenRouter Module
Provides utility functions and types for OpenRouter API integration:
- `callOpenRouterAPI()` - Make requests to OpenRouter API
- `generateAIResponse()` - Generate AI responses with context
- `getSystemPrompt()` - Get agent-specific system prompts
- `getRecommendedModel()` - Get optimal model for each agent mode
- Model constants and type definitions

#### 2. **convex/chat.ts** - Chat Mutations & Queries
Convex backend functions for chat operations:
- `sendMessage()` - Mutation: Send message and get AI response
- `getChatHistory()` - Query: Retrieve conversation history
- `clearChatHistory()` - Mutation: Clear chat history
- `getAvailableModels()` - Query: List available AI models

#### 3. **convex/schema.ts** - Database Schema
Updated Convex schema with new chatHistory table:
```typescript
chatHistory: {
  userId: string,
  agentMode: string,
  role: "user" | "assistant",
  content: string,
  attachments?: string[],
  model?: string,
  usage?: {
    promptTokens: number,
    completionTokens: number,
    totalTokens: number
  },
  isError?: boolean,
  createdAt: number
}
```

#### 4. **src/hooks/useOpenRouterChat.ts** - React Hook
Custom hook for frontend integration (prepared for future use with Convex hooks).

#### 5. **src/components/AIChat/AIChat.tsx** - UI Component
Chat interface component (existing, can be enhanced with Convex mutations).

## Setup Instructions

### 1. Configure Environment Variables

Add to your Convex deployment:

```bash
npx convex env set OPENROUTER_API_KEY "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"
```

Or add to `.env.local` for local development:

```env
CONVEX_DEPLOYMENT=ownDev:eyJwcm9qZWN0RGlyIjoiZDpcXFZDXFxPUyIsImRlcGxveW1lbnQiOnsia2luZCI6Im93bkRldiJ9fQ==
OPENROUTER_API_KEY=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
```

### 2. Deploy Convex Schema

```bash
npx convex deploy
```

This will:
- Update the database schema with chatHistory table
- Deploy the new chat functions
- Deploy the openrouter module

### 3. Update Components (if needed)

The AIChat component can be enhanced with:

```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// In component:
const sendMessage = useMutation(api.chat.sendMessage);

// Usage:
const result = await sendMessage({
  userId: currentUser.id,
  agentMode: selectedMode,
  content: messageText,
  model: selectedModel,
});
```

## API Reference

### OpenRouter Module Functions

#### `callOpenRouterAPI(apiKey, request)`
Make a direct API call to OpenRouter.

**Parameters:**
- `apiKey` (string): OpenRouter API key
- `request` (OpenRouterRequest): Chat completion request

**Returns:** Promise<OpenRouterResponse>

**Example:**
```typescript
const response = await callOpenRouterAPI(apiKey, {
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a screenplay writer." },
    { role: "user", content: "Write a scene..." }
  ]
});
```

#### `generateAIResponse(apiKey, agentMode, userMessage, conversationHistory, model)`
Generate an AI response with context awareness.

**Parameters:**
- `apiKey` (string): OpenRouter API key
- `agentMode` (string): Agent mode (screenplay, script, story, dialogue, character, worldbuilding)
- `userMessage` (string): User's input
- `conversationHistory` (OpenRouterMessage[]): Previous messages (optional)
- `model` (string): AI model to use (default: gpt-3.5-turbo)

**Returns:** Promise<{ response, model, usage }>

**Example:**
```typescript
const result = await generateAIResponse(
  apiKey,
  "screenplay",
  "Write a dramatic confrontation scene",
  [],
  "gpt-4"
);

console.log(result.response);      // Generated response
console.log(result.usage.totalTokens); // Token count
```

#### `getSystemPrompt(agentMode)`
Get the system prompt for a specific agent mode.

**Parameters:**
- `agentMode` (string): Agent mode identifier

**Returns:** string (System prompt)

#### `getRecommendedModel(agentMode)`
Get the recommended AI model for an agent mode.

**Parameters:**
- `agentMode` (string): Agent mode identifier

**Returns:** string (Model ID)

**Recommendations:**
- `screenplay` → gpt-4 (complex storytelling)
- `script` → gpt-3.5-turbo (balance of quality/speed)
- `story` → gpt-4 (creative writing)
- `dialogue` → gpt-3.5-turbo (conversational)
- `character` → gpt-4 (complex character work)
- `worldbuilding` → gpt-4 (intricate systems)

### Chat Mutation/Query Functions

#### `sendMessage(args)`
Send a message and get AI response.

**Arguments:**
```typescript
{
  userId: string,
  agentMode: string,
  content: string,
  attachments?: string[],
  model?: string
}
```

**Returns:**
```typescript
{
  userMessageId: string,
  assistantMessageId: string,
  response: string,
  model: string,
  usage: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
  }
}
```

#### `getChatHistory(args)`
Retrieve chat history.

**Arguments:**
```typescript
{
  userId: string,
  agentMode?: string,
  limit?: number  // default: 50
}
```

**Returns:** ChatMessage[]

#### `clearChatHistory(args)`
Clear chat history.

**Arguments:**
```typescript
{
  userId: string,
  agentMode?: string
}
```

**Returns:** { deletedCount: number }

#### `getAvailableModels()`
Get list of available AI models.

**Returns:** Array<{ id, label, recommended }>

## Available AI Models

### GPT Models (OpenAI)
- `gpt-3.5-turbo` - Fast, efficient
- `gpt-4` - Advanced reasoning
- `gpt-4-turbo` - Latest GPT-4 version
- `gpt-4o` - Latest, multimodal

### Claude Models (Anthropic)
- `claude-3-opus` - Most capable
- `claude-3-sonnet` - Balanced

### Llama Models (Meta)
- `llama-2-70b-chat` - Open source

### Gemini Models (Google)
- `gemini-pro` - Multimodal

## Agent Modes & System Prompts

### Screenplay Writer
Expertise in visual storytelling, formatting, pacing, and character development.
- Recommended Model: GPT-4
- Best For: Scene writing, story structure, dialogue

### Script Writer
Specializes in dialogue, comedic timing, and dramatic tension.
- Recommended Model: GPT-3.5-Turbo
- Best For: Script formatting, dialogue polish, character voice

### Story Writer
Expertise in narrative structure, plot development, character arcs.
- Recommended Model: GPT-4
- Best For: Plot development, narrative structure, storytelling

### Dialogue Writer
Specializes in natural speech patterns and character differentiation.
- Recommended Model: GPT-3.5-Turbo
- Best For: Creating authentic dialogue, character voices

### Character Developer
Helps create compelling, multi-dimensional characters.
- Recommended Model: GPT-4
- Best For: Character development, backstories, motivations

### World Builder
Assists with creating immersive, consistent fictional worlds.
- Recommended Model: GPT-4
- Best For: Setting details, world systems, cultural development

## Error Handling

### Common Errors

**OPENROUTER_API_KEY not set:**
- Solution: Set the environment variable in Convex deployment

**API Rate Limiting:**
- Solution: Implement exponential backoff retry logic
- OpenRouter default: 100 requests/minute

**Token Limit Exceeded:**
- Solution: Reduce conversation history or max_tokens
- Default max_tokens: 2048

**Model Not Available:**
- Solution: Check model availability on OpenRouter dashboard
- Fallback to gpt-3.5-turbo

### Error Response Example

```typescript
{
  "error": "Failed to generate AI response: 401 Unauthorized",
  "message": "API key is invalid or expired"
}
```

## Performance Considerations

### Conversation History
- Limited to last 10 messages for context
- Balances context awareness with token usage
- Customize in `sendMessage()` mutation

### Token Usage Tracking
- Stored in chatHistory.usage
- Use for cost tracking and rate limiting
- Different pricing per model on OpenRouter

### Response Time
- GPT-3.5-Turbo: ~1-2 seconds
- GPT-4: ~3-5 seconds
- Claude: ~2-4 seconds

## Testing

### Using Convex Dashboard

1. Navigate to http://localhost:8100 (Convex dev dashboard)
2. Go to "Chat" table
3. Run sendMessage mutation with test data:

```json
{
  "userId": "test-user-123",
  "agentMode": "screenplay",
  "content": "Write a dramatic opening scene",
  "model": "gpt-3.5-turbo"
}
```

### Using API Endpoint

```typescript
// Test in browser console or Node.js
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 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',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: 'Hello, can you help with creative writing?' }
    ]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

## Future Enhancements

1. **Streaming Responses**
   - Real-time text streaming using SSE
   - Better UX for long responses

2. **Multi-modal Support**
   - Image input/output support
   - Audio transcription

3. **Tool Calling**
   - Function execution via AI
   - Code generation and execution

4. **Fine-tuning**
   - Custom models trained on project data
   - Improved domain-specific responses

5. **Cost Optimization**
   - Implement smart model routing
   - Cache frequently used responses

## Troubleshooting

### Issue: "OPENROUTER_API_KEY environment variable not set"
**Solution:**
```bash
npx convex env set OPENROUTER_API_KEY "your-key-here"
```

### Issue: "Cannot find module '@/convex/_generated/api'"
**Solution:** Regenerate Convex client:
```bash
npx convex dev
```

### Issue: Chat history not persisting
**Solution:** Verify chatHistory table exists:
```bash
npx convex env list
# Check database in Convex dashboard
```

### Issue: Rate limiting (429 errors)
**Solution:** Implement retry logic with backoff:
```typescript
const maxRetries = 3;
let retries = 0;
while (retries < maxRetries) {
  try {
    return await generateAIResponse(...);
  } catch (error) {
    if (error.status === 429) {
      await new Promise(r => setTimeout(r, Math.pow(2, retries) * 1000));
      retries++;
    } else {
      throw error;
    }
  }
}
```

## Resources

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [OpenRouter API Reference](https://openrouter.ai/docs/api-reference)
- [Convex Documentation](https://docs.convex.dev)
- [Convex Environment Variables](https://docs.convex.dev/production/environment-variables)

## Support

For issues or questions:
1. Check the Convex dashboard logs
2. Review OpenRouter API status
3. Verify API key and permissions
4. Check token usage and rate limits
