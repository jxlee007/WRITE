import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get suggestions for a document
export const getSuggestions = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("suggestions")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();
  },
});

// Create a new suggestion
export const createSuggestion = mutation({
  args: {
    documentId: v.id("documents"),
    type: v.string(),
    range: v.object({ from: v.number(), to: v.number() }),
    originalText: v.string(),
    suggestedText: v.string(),
    explanation: v.string(),
    confidence: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("suggestions", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

// Accept a suggestion
export const acceptSuggestion = mutation({
  args: { suggestionId: v.id("suggestions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.suggestionId, { status: "accepted" });
  },
});

// Reject a suggestion
export const rejectSuggestion = mutation({
  args: { suggestionId: v.id("suggestions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.suggestionId, { status: "rejected" });
  },
});

// Delete a suggestion
export const deleteSuggestion = mutation({
  args: { suggestionId: v.id("suggestions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.suggestionId);
  },
});
