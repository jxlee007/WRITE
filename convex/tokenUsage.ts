import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const trackTokenUsage = mutation({
  args: {
    documentId: v.id("documents"),
    tokenId: v.id("tokens"),
    position: v.number(),
    context: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if this usage already exists
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .filter((q) => q.eq(q.field("tokenId"), args.tokenId))
      .first();

    if (existing) {
      // Update position and context
      await ctx.db.patch(existing._id, {
        position: args.position,
        context: args.context,
      });
      return existing._id;
    }

    // Create new usage record
    return await ctx.db.insert("tokenUsage", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const removeTokenUsage = mutation({
  args: {
    documentId: v.id("documents"),
    tokenId: v.id("tokens"),
  },
  handler: async (ctx, args) => {
    const usage = await ctx.db
      .query("tokenUsage")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .filter((q) => q.eq(q.field("tokenId"), args.tokenId))
      .first();

    if (usage) {
      await ctx.db.delete(usage._id);
    }
  },
});

export const getDocumentTokens = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const usages = await ctx.db
      .query("tokenUsage")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    // Get full token details
    const tokens = await Promise.all(
      usages.map(async (usage) => {
        const token = await ctx.db.get(usage.tokenId);
        return {
          ...token,
          position: usage.position,
          context: usage.context,
        };
      })
    );

    return tokens.filter((t) => t !== null);
  },
});
