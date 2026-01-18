import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ensureTokenOwnership, requireUser } from "./utils";

// Query: Get all tokens for a user (optionally filtered by project)
export const getTokens = query({
  args: {
    projectId: v.optional(v.id("projects")),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    
    if (args.projectId && args.type) {
      // Filter by both project and type
      return await ctx.db
        .query("tokens")
        .withIndex("by_project_type", (q) =>
          q.eq("projectId", args.projectId).eq("type", args.type!)
        )
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .collect();
    } else if (args.projectId) {
      // Filter by project only
      return await ctx.db
        .query("tokens")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .collect();
    } else if (args.type) {
      // Filter by type only
      return await ctx.db
        .query("tokens")
        .withIndex("by_user_type", (q) =>
          q.eq("userId", identity.subject).eq("type", args.type!)
        )
        .collect();
    } else {
      // Get all user tokens
      return await ctx.db
        .query("tokens")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .collect();
    }
  },
});

// Query: Get a single token by ID
export const getToken = query({
  args: { id: v.id("tokens") },
  handler: async (ctx, args) => {
    const { token } = await ensureTokenOwnership(ctx, args.id);
    return token;
  },
});

// Query: Search tokens by name
export const searchTokens = query({
  args: {
    projectId: v.optional(v.id("projects")),
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    
    let allTokens;
    if (args.projectId) {
      allTokens = await ctx.db
        .query("tokens")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .collect();
    } else {
      allTokens = await ctx.db
        .query("tokens")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .collect();
    }
    
    return allTokens.filter((token) =>
      token.name.toLowerCase().includes(args.searchTerm.toLowerCase())
    );
  },
});

// Mutation: Create a new token
export const createToken = mutation({
  args: {
    projectId: v.optional(v.id("projects")),
    type: v.string(),
    name: v.string(),
    description: v.string(),
    promptTemplate: v.optional(v.string()),
    primaryImageUrl: v.optional(v.string()),
    visualSeed: v.optional(v.string()),
    metadata: v.optional(v.any()),
    // Media fields for image tokens
    source: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    mimeType: v.optional(v.string()),
    dimensions: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
    // AI generation fields for ai-generated-image type
    prompt: v.optional(v.string()),
    modelUsed: v.optional(v.string()),
    settings: v.optional(v.object({
      size: v.optional(v.string()),
      quality: v.optional(v.string()),
      style: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const now = Date.now();
    const tokenId = await ctx.db.insert("tokens", {
      userId: identity.subject,
      projectId: args.projectId,
      type: args.type,
      name: args.name,
      description: args.description,
      promptTemplate: args.promptTemplate,
      primaryImageUrl: args.primaryImageUrl,
      visualSeed: args.visualSeed,
      metadata: args.metadata ? { customFields: args.metadata, tags: [] } : undefined,
      // Media fields
      source: args.source,
      fileUrl: args.fileUrl,
      thumbnailUrl: args.thumbnailUrl,
      fileName: args.fileName,
      fileSize: args.fileSize,
      mimeType: args.mimeType,
      dimensions: args.dimensions,
      // AI generation fields
      prompt: args.prompt,
      modelUsed: args.modelUsed,
      settings: args.settings,
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
    // Media fields
    source: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    mimeType: v.optional(v.string()),
    dimensions: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
    // AI generation fields
    prompt: v.optional(v.string()),
    modelUsed: v.optional(v.string()),
    settings: v.optional(v.object({
      size: v.optional(v.string()),
      quality: v.optional(v.string()),
      style: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    await ensureTokenOwnership(ctx, args.id);
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
    await ensureTokenOwnership(ctx, args.id);
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
    await ensureTokenOwnership(ctx, args.tokenId);
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
    const { token: fromToken } = await ensureTokenOwnership(
      ctx,
      args.fromTokenId,
    );
    const { token: toToken } = await ensureTokenOwnership(
      ctx,
      args.toTokenId,
    );

    if (fromToken.projectId !== toToken.projectId) {
      throw new Error("Tokens must belong to the same project");
    }

    return await ctx.db.insert("tokenRelationships", {
      fromTokenId: args.fromTokenId,
      toTokenId: args.toTokenId,
      relationshipType: args.relationshipType,
      description: args.description,
    });
  },
});

// ====================
// UNIFIED MEDIA HANDLING FUNCTIONS
// ====================

// Mutation: Upload reference image (uploaded anywhere automatically stored as reference-image)
export const uploadReferenceImage = mutation({
  args: {
    projectId: v.optional(v.id("projects")),
    name: v.string(),
    description: v.optional(v.string()),
    fileUrl: v.string(), // Convex storage ID
    thumbnailUrl: v.optional(v.string()),
    fileName: v.string(),
    fileSize: v.optional(v.number()),
    mimeType: v.optional(v.string()),
    dimensions: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const now = Date.now();
    
    return await ctx.db.insert("tokens", {
      userId: identity.subject,
      projectId: args.projectId,
      type: "reference-image",
      name: args.name,
      description: args.description || "",
      source: "uploaded",
      fileUrl: args.fileUrl,
      thumbnailUrl: args.thumbnailUrl,
      fileName: args.fileName,
      fileSize: args.fileSize,
      mimeType: args.mimeType,
      dimensions: args.dimensions,
      metadata: args.metadata ? { customFields: args.metadata, tags: [] } : undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Mutation: Save AI-generated image (automatically stored as ai-generated-image)
export const saveAIGeneratedImage = mutation({
  args: {
    projectId: v.optional(v.id("projects")),
    tokenId: v.optional(v.id("tokens")), // Optional link to existing token (character, location, etc.)
    name: v.string(),
    description: v.optional(v.string()),
    prompt: v.string(), // Full AI prompt
    fileUrl: v.string(), // Image URL from AI service
    modelUsed: v.optional(v.string()),
    settings: v.optional(v.object({
      size: v.optional(v.string()),
      quality: v.optional(v.string()),
      style: v.optional(v.string()),
    })),
    dimensions: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    
    // If linked to a token, verify it exists and belongs to user
    if (args.tokenId) {
      const { token } = await ensureTokenOwnership(ctx, args.tokenId);
      if (args.projectId && token.projectId !== args.projectId) {
        throw new Error("Token must belong to the same project");
      }
    }
    
    const now = Date.now();
    
    return await ctx.db.insert("tokens", {
      userId: identity.subject,
      projectId: args.projectId,
      type: "ai-generated-image",
      name: args.name,
      description: args.description || args.prompt.substring(0, 200), // Use prompt snippet as description
      source: "ai-generated",
      fileUrl: args.fileUrl,
      fileName: `${args.name}.png`, // Default to PNG
      mimeType: "image/png",
      dimensions: args.dimensions,
      prompt: args.prompt,
      modelUsed: args.modelUsed,
      settings: args.settings,
      metadata: args.tokenId ? { customFields: { linkedTokenId: args.tokenId }, tags: [] } : undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Query: Get all media tokens (reference and AI-generated images)
export const getMediaTokens = query({
  args: {
    projectId: v.optional(v.id("projects")),
    type: v.optional(v.union(v.literal("reference-image"), v.literal("ai-generated-image"), v.literal("all"))),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    
    if (!args.type || args.type === "all") {
      // Get both types
      let referenceImages, aiImages;
      
      if (args.projectId) {
        referenceImages = await ctx.db
          .query("tokens")
          .withIndex("by_project_type", (q) =>
            q.eq("projectId", args.projectId).eq("type", "reference-image")
          )
          .filter((q) => q.eq(q.field("userId"), identity.subject))
          .order("desc")
          .collect();
        
        aiImages = await ctx.db
          .query("tokens")
          .withIndex("by_project_type", (q) =>
            q.eq("projectId", args.projectId).eq("type", "ai-generated-image")
          )
          .filter((q) => q.eq(q.field("userId"), identity.subject))
          .order("desc")
          .collect();
      } else {
        referenceImages = await ctx.db
          .query("tokens")
          .withIndex("by_user_type", (q) =>
            q.eq("userId", identity.subject).eq("type", "reference-image")
          )
          .order("desc")
          .collect();
        
        aiImages = await ctx.db
          .query("tokens")
          .withIndex("by_user_type", (q) =>
            q.eq("userId", identity.subject).eq("type", "ai-generated-image")
          )
          .order("desc")
          .collect();
      }
      
      return [...referenceImages, ...aiImages].sort((a, b) => b.createdAt - a.createdAt);
    }
    
    if (args.projectId) {
      return await ctx.db
        .query("tokens")
        .withIndex("by_project_type", (q) =>
          q.eq("projectId", args.projectId).eq("type", args.type!)
        )
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .order("desc")
        .collect();
    } else {
      return await ctx.db
        .query("tokens")
        .withIndex("by_user_type", (q) =>
          q.eq("userId", identity.subject).eq("type", args.type!)
        )
        .order("desc")
        .collect();
    }
  },
});

// Query: Get recent AI-generated images (replacement for generatedImages.getRecentImages)
export const getRecentAIImages = query({
  args: {
    projectId: v.optional(v.id("projects")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const limit = args.limit || 20;
    
    if (args.projectId) {
      return await ctx.db
        .query("tokens")
        .withIndex("by_project_type", (q) =>
          q.eq("projectId", args.projectId).eq("type", "ai-generated-image")
        )
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .order("desc")
        .take(limit);
    } else {
      return await ctx.db
        .query("tokens")
        .withIndex("by_user_type", (q) =>
          q.eq("userId", identity.subject).eq("type", "ai-generated-image")
        )
        .order("desc")
        .take(limit);
    }
  },
});

// Mutation: Generate storage upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
