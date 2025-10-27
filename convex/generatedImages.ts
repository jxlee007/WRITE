/**
 * @deprecated This file is DEPRECATED as of the unified token/media system.
 * All AI-generated images are now stored as tokens with type "ai-generated-image".
 * Use api.tokens.saveAIGeneratedImage() instead of api.generatedImages.saveImage()
 * Use api.tokens.getRecentAIImages() instead of api.generatedImages.getRecentImages()
 * 
 * This file is kept temporarily for backward compatibility but should not be used
 * in new code. It will be removed in a future update.
 */

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import {
  ensureGeneratedImageOwnership,
  requireUser,
} from "./utils";

// Query: Get recent generated images for a user (optionally filtered by project)
export const getRecentImages = query({
  args: {
    projectId: v.optional(v.id("projects")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const limit = args.limit || 20;
    
    if (args.projectId) {
      return await ctx.db
        .query("generatedImages")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .order("desc")
        .take(limit);
    } else {
      return await ctx.db
        .query("generatedImages")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .order("desc")
        .take(limit);
    }
  },
});

// Query: Get generated image by ID
export const getImage = query({
  args: { id: v.id("generatedImages") },
  handler: async (ctx, args) => {
    const { image } = await ensureGeneratedImageOwnership(ctx, args.id);
    return image;
  },
});

// Mutation: Save a generated image
export const saveImage = mutation({
  args: {
    projectId: v.optional(v.id("projects")),
    tokenId: v.optional(v.id("tokens")),
    prompt: v.string(),
    imageUrl: v.string(),
    modelUsed: v.optional(v.string()),
    settings: v.optional(
      v.object({
        size: v.optional(v.string()),
        quality: v.optional(v.string()),
        style: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    return await ctx.db.insert("generatedImages", {
      ...args,
      userId: identity.subject,
      createdAt: Date.now(),
    });
  },
});

// Mutation: Delete a generated image
export const deleteImage = mutation({
  args: { id: v.id("generatedImages") },
  handler: async (ctx, args) => {
    await ensureGeneratedImageOwnership(ctx, args.id);
    await ctx.db.delete(args.id);
  },
});
