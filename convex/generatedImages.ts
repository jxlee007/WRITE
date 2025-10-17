import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get recent generated images for a project
export const getRecentImages = query({
  args: {
    projectId: v.id("projects"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    
    return await ctx.db
      .query("generatedImages")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .take(limit);
  },
});

// Query: Get generated image by ID
export const getImage = query({
  args: { id: v.id("generatedImages") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation: Save a generated image
export const saveImage = mutation({
  args: {
    projectId: v.id("projects"),
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
    return await ctx.db.insert("generatedImages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Mutation: Delete a generated image
export const deleteImage = mutation({
  args: { id: v.id("generatedImages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
