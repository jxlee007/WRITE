// Example: Integrating AI Chat with Convex and OpenAI
// File: convex/chat.ts - Enhanced version with actual AI integration

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { QueryCtx, MutationCtx } from "./_generated/server";

/**
 * Example: Send message with OpenAI integration
 * You would need to set up your OpenAI API key in Convex environment variables
 */

// System prompts for each agent mode
const SYSTEM_PROMPTS: Record<string, string> = {
  screenplay: `You are an expert screenwriter with 20+ years of experience. You help writers craft compelling screenplays, 
    including dialogue, action sequences, scene structure, and story formatting. Always follow standard screenplay format 
    (Courier 12pt font rules apply to actual scripts). Provide practical, professional advice.`,

  script: `You are a professional script writer specializing in dialogue and character interactions. You create authentic,
    engaging dialogue that fits characters perfectly. You understand different dialogue styles (formal, casual, regional accents, etc.)
    and help writers match dialogue to character voice. Provide examples and explain your choices.`,

  story: `You are a master storyteller with expertise in narrative structure, plot development, and character arcs. You help 
    writers develop compelling stories with strong hooks, well-paced plots, meaningful conflicts, and satisfying resolutions.
    You understand different genres and story structures (three-act, hero's journey, etc.).`,

  dialogue: `You are a dialogue specialist who creates authentic, compelling character conversations. You understand how people 
    really speak, different communication styles, subtext, tension, and emotional authenticity. You create dialogue that reveals 
    character, advances plot, and engages readers. Provide multiple variations and explain the choices.`,

  character: `You are a character development expert who helps create deep, complex, believable characters. You understand 
    character psychology, motivation, backstory, character arcs, and how characters grow through a story. You help writers 
    create characters with depth, contradictions, and realistic complexity. Provide detailed character sheets and explanations.`,

  worldbuilding: `You are a world-builder and creative consultant specializing in fictional universe creation. You understand 
    geography, culture, history, politics, economics, technology levels, magic systems, and how all these elements interact.
    You help create internally consistent, immersive worlds that enhance stories. Provide comprehensive world-building details.`,
};

/**
 * Example implementation with actual AI service
 * This is a template - replace with your preferred AI service
 */

// ============================================================
// OPTION 1: Using OpenAI API (Node.js/Convex backend)
// ============================================================

export const sendMessageWithOpenAI = mutation({
  args: {
    userId: v.string(),
    agentMode: v.string(),
    content: v.string(),
    attachments: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Store user message
    const userMessageId = await ctx.db.insert("chatHistory", {
      userId: args.userId,
      agentMode: args.agentMode,
      role: "user",
      content: args.content,
      attachments: args.attachments,
      createdAt: now,
    });

    // Call OpenAI API
    const aiResponse = await callOpenAI(args.agentMode, args.content);

    // Store AI response
    const assistantMessageId = await ctx.db.insert("chatHistory", {
      userId: args.userId,
      agentMode: args.agentMode,
      role: "assistant",
      content: aiResponse,
      createdAt: now + 1,
    });

    return {
      userMessageId,
      assistantMessageId,
      response: aiResponse,
    };
  },
});

async function callOpenAI(agentMode: string, userMessage: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[agentMode] || SYSTEM_PROMPTS.story;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview", // or "gpt-3.5-turbo" for faster/cheaper responses
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error.message}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// ============================================================
// OPTION 2: Using Anthropic Claude API
// ============================================================

export const sendMessageWithClaude = mutation({
  args: {
    userId: v.string(),
    agentMode: v.string(),
    content: v.string(),
    attachments: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const userMessageId = await ctx.db.insert("chatHistory", {
      userId: args.userId,
      agentMode: args.agentMode,
      role: "user",
      content: args.content,
      attachments: args.attachments,
      createdAt: now,
    });

    const aiResponse = await callClaude(args.agentMode, args.content);

    const assistantMessageId = await ctx.db.insert("chatHistory", {
      userId: args.userId,
      agentMode: args.agentMode,
      role: "assistant",
      content: aiResponse,
      createdAt: now + 1,
    });

    return {
      userMessageId,
      assistantMessageId,
      response: aiResponse,
    };
  },
});

async function callClaude(agentMode: string, userMessage: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[agentMode] || SYSTEM_PROMPTS.story;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not configured");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Claude API error: ${error.error.message}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// ============================================================
// OPTION 3: Stream responses for real-time chat (Advanced)
// ============================================================

export const sendMessageStream = mutation({
  args: {
    userId: v.string(),
    agentMode: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Store user message
    const userMessageId = await ctx.db.insert("chatHistory", {
      userId: args.userId,
      agentMode: args.agentMode,
      role: "user",
      content: args.content,
      createdAt: now,
    });

    // Create placeholder for AI response
    const assistantMessageId = await ctx.db.insert("chatHistory", {
      userId: args.userId,
      agentMode: args.agentMode,
      role: "assistant",
      content: "[Generating response...]",
      createdAt: now + 1,
    });

    return {
      userMessageId,
      assistantMessageId,
      streamingResponse: true,
    };
  },
});

// ============================================================
// USAGE IN FRONTEND
// ============================================================

/*
// In your AIChat.tsx component:

import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";

export const AIChat = ({ isOpen, onOpenChange }: AIChatProps) => {
  const sendMessage = useAction(api.chat.sendMessageWithOpenAI);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get current user (from Convex auth)
  const user = useQuery(api.users.getCurrentUser);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const result = await sendMessage({
        userId: user._id,
        agentMode: selectedMode,
        content: inputValue,
      });

      const assistantMessage: Message = {
        id: result.assistantMessageId,
        role: "assistant",
        content: result.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of component
};
*/

// ============================================================
// ENVIRONMENT VARIABLES (add to Convex production settings)
// ============================================================

/*
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

// Set in Convex dashboard: https://dashboard.convex.dev
*/

// ============================================================
// TESTING
// ============================================================

/*
// Test with mock data
import { test, expect } from "vitest";

test("sendMessage stores user and assistant messages", async () => {
  // Create mock context
  const mockDb = {
    insert: vi.fn().mockResolvedValue("message-id"),
  };
  
  const result = await sendMessageWithOpenAI.handler(
    { db: mockDb },
    {
      userId: "test-user",
      agentMode: "screenplay",
      content: "Help me write a scene",
    }
  );

  expect(mockDb.insert).toHaveBeenCalledTimes(2);
  expect(result.userMessageId).toBe("message-id");
  expect(result.assistantMessageId).toBe("message-id");
});
*/
