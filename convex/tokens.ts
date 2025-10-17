import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get all tokens for a project
export const getTokens = query({
  args: {
    projectId: v.id("projects"),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.type !== undefined) {
      return await ctx.db
        .query("tokens")
        .withIndex("by_project_type", (q) =>
          q.eq("projectId", args.projectId).eq("type", args.type!)
        )
        .collect();
    }
    
    return await ctx.db
      .query("tokens")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

// Query: Get a single token by ID
export const getToken = query({
  args: { id: v.id("tokens") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Query: Search tokens by name
export const searchTokens = query({
  args: {
    projectId: v.id("projects"),
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const allTokens = await ctx.db
      .query("tokens")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    return allTokens.filter((token) =>
      token.name.toLowerCase().includes(args.searchTerm.toLowerCase())
    );
  },
});

// Mutation: Create a new token
export const createToken = mutation({
  args: {
    projectId: v.id("projects"),
    type: v.string(),
    name: v.string(),
    description: v.string(),
    promptTemplate: v.optional(v.string()),
    primaryImageUrl: v.optional(v.string()),
    visualSeed: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const tokenId = await ctx.db.insert("tokens", {
      projectId: args.projectId,
      type: args.type,
      name: args.name,
      description: args.description,
      promptTemplate: args.promptTemplate,
      primaryImageUrl: args.primaryImageUrl,
      visualSeed: args.visualSeed,
      metadata: args.metadata ? { customFields: args.metadata, tags: [] } : undefined,
      createdAt: now,
      updatedAt: now,
    });
    return tokenId;
  },
});

// Mutation: Update a token
export const updateToken = mutation({
  args: {
    id: v.id("tokens"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    promptTemplate: v.optional(v.string()),
    primaryImageUrl: v.optional(v.string()),
    visualSeed: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Mutation: Delete a token
export const deleteToken = mutation({
  args: { id: v.id("tokens") },
  handler: async (ctx, args) => {
    // Delete related token relationships
    const fromRelationships = await ctx.db
      .query("tokenRelationships")
      .withIndex("by_from_token", (q) => q.eq("fromTokenId", args.id))
      .collect();
    const toRelationships = await ctx.db
      .query("tokenRelationships")
      .withIndex("by_to_token", (q) => q.eq("toTokenId", args.id))
      .collect();
    
    for (const rel of [...fromRelationships, ...toRelationships]) {
      await ctx.db.delete(rel._id);
    }
    
    // Delete related token usages
    const usages = await ctx.db
      .query("tokenUsage")
      .withIndex("by_token", (q) => q.eq("tokenId", args.id))
      .collect();
    for (const usage of usages) {
      await ctx.db.delete(usage._id);
    }
    
    // Delete the token
    await ctx.db.delete(args.id);
  },
});

// Query: Get token relationships
export const getTokenRelationships = query({
  args: { tokenId: v.id("tokens") },
  handler: async (ctx, args) => {
    const from = await ctx.db
      .query("tokenRelationships")
      .withIndex("by_from_token", (q) => q.eq("fromTokenId", args.tokenId))
      .collect();
    
    const to = await ctx.db
      .query("tokenRelationships")
      .withIndex("by_to_token", (q) => q.eq("toTokenId", args.tokenId))
      .collect();
    
    return { from, to };
  },
});

// Mutation: Create token relationship
export const createTokenRelationship = mutation({
  args: {
    fromTokenId: v.id("tokens"),
    toTokenId: v.id("tokens"),
    relationshipType: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tokenRelationships", {
      fromTokenId: args.fromTokenId,
      toTokenId: args.toTokenId,
      relationshipType: args.relationshipType,
      description: args.description,
    });
  },
});
