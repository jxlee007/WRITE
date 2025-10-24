import { mutation, query, action, internalMutation, internalAction } from "./_generated/server";
import { v } from "convex/values";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import {
  generateAIResponse,
  getSystemPrompt,
  AVAILABLE_MODELS,
  getRecommendedModel,
} from "./openrouter";

/**
 * Action to call OpenRouter API (actions can use fetch)
 * Stores the assistant response after getting result
 */
export const callOpenRouterAction = internalAction({
  args: {
    userId: v.string(),
    agentMode: v.string(),
    content: v.string(),
    conversationHistory: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
        content: v.string(),
      })
    ),
    model: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY environment variable not set");
    }

    try {
      const aiResult = await generateAIResponse(
        apiKey,
        args.agentMode,
        args.content,
        args.conversationHistory,
        args.model
      );

      // Store AI message with usage info
      await ctx.runMutation(internal.chat.storeAssistantMessage, {
        userId: args.userId,
        agentMode: args.agentMode,
        content: aiResult.response,
        model: aiResult.model,
        usage: {
          promptTokens: aiResult.usage.prompt_tokens,
          completionTokens: aiResult.usage.completion_tokens,
          totalTokens: aiResult.usage.total_tokens,
        },
      });

      return aiResult;
    } catch (error) {
      // Store error message
      await ctx.runMutation(internal.chat.storeAssistantMessage, {
        userId: args.userId,
        agentMode: args.agentMode,
        content: `I encountered an error processing your request: ${
          error instanceof Error ? error.message : String(error)
        }. Please try again or contact support.`,
        model: args.model,
        isError: true,
      });
      
      throw error;
    }
  },
});

/**
 * Internal mutation to store assistant message
 */
export const storeAssistantMessage = internalMutation({
  args: {
    userId: v.string(),
    agentMode: v.string(),
    content: v.string(),
    model: v.string(),
    usage: v.optional(
      v.object({
        promptTokens: v.number(),
        completionTokens: v.number(),
        totalTokens: v.number(),
      })
    ),
    isError: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("chatHistory", {
      userId: args.userId,
      agentMode: args.agentMode,
      role: "assistant",
      content: args.content,
      createdAt: now,
      model: args.model,
      usage: args.usage,
      isError: args.isError,
    });
  },
});

/**
 * Send a message in the AI chat
 * Integrates with OpenRouter API for AI responses
 * Stores both user and AI responses in chat history
 */
export const sendMessage = mutation({
  args: {
    userId: v.string(),
    agentMode: v.string(),
    content: v.string(),
    attachments: v.optional(v.array(v.string())),
    model: v.optional(v.string()),
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
      model: args.model,
    });

    try {
      // Get conversation history for context
      const previousMessages = await ctx.db
        .query("chatHistory")
        .withIndex("by_user_mode", (q) =>
          q.eq("userId", args.userId).eq("agentMode", args.agentMode)
        )
        .order("desc")
        .take(10);

      // Reverse to get chronological order (oldest first)
      const conversationHistory = previousMessages
        .reverse()
        .map((msg: any) => ({
          role: msg.role as "user" | "assistant" | "system",
          content: msg.content,
        }));

      // Use specified model or get recommended one
      const modelToUse =
        args.model || getRecommendedModel(args.agentMode) || "openai/gpt-3.5-turbo";

      // Schedule action to generate AI response using OpenRouter
      ctx.scheduler.runAfter(0, internal.chat.callOpenRouterAction, {
        userId: args.userId,
        agentMode: args.agentMode,
        content: args.content,
        conversationHistory,
        model: modelToUse,
      });

      // Return immediately - the action will run asynchronously
      return {
        userMessageId,
        message: "Processing your request...",
      };
    } catch (error) {
      // Store error message in assistant role for reference
      const errorMessage = `I encountered an error processing your request: ${
        error instanceof Error ? error.message : String(error)
      }. Please try again or contact support.`;

      await ctx.db.insert("chatHistory", {
        userId: args.userId,
        agentMode: args.agentMode,
        role: "assistant",
        content: errorMessage,
        createdAt: now + 1,
        isError: true,
      });

      throw new Error(
        `Failed to generate AI response: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  },
});

/**
 * Get chat history for a user and specific agent mode
 */
export const getChatHistory = query({
  args: {
    userId: v.string(),
    agentMode: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    if (args.agentMode && args.agentMode.length > 0) {
      const messages = await ctx.db
        .query("chatHistory")
        .withIndex("by_user_mode", (q) =>
          q.eq("userId", args.userId).eq("agentMode", args.agentMode!)
        )
        .order("desc")
        .take(limit);

      return messages.reverse();
    } else {
      const messages = await ctx.db
        .query("chatHistory")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .order("desc")
        .take(limit);

      return messages.reverse();
    }
  },
});

/**
 * Clear chat history for a user (optional)
 */
export const clearChatHistory = mutation({
  args: {
    userId: v.string(),
    agentMode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.agentMode && args.agentMode.length > 0) {
      const messages = await ctx.db
        .query("chatHistory")
        .withIndex("by_user_mode", (q) =>
          q.eq("userId", args.userId).eq("agentMode", args.agentMode!)
        )
        .collect();

      for (const message of messages) {
        await ctx.db.delete(message._id);
      }

      return { deletedCount: messages.length };
    } else {
      const messages = await ctx.db
        .query("chatHistory")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect();

      for (const message of messages) {
        await ctx.db.delete(message._id);
      }

      return { deletedCount: messages.length };
    }
  },
});

/**
 * Helper function to export available models for the frontend
 */
export const getAvailableModels = query({
  args: {},
  handler: async (ctx) => {
    return Object.entries(AVAILABLE_MODELS).map(([id, label]) => ({
      id,
      label,
      recommended: id.startsWith("openai/gpt-4"),
    }));
  },
});

export { AVAILABLE_MODELS, getRecommendedModel, getSystemPrompt };

