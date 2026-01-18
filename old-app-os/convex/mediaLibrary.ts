/**
 * @deprecated This file is DEPRECATED as of the unified token/media system.
 * All uploaded images are now stored as tokens with type "reference-image".
 * Use api.tokens.uploadReferenceImage() instead of api.mediaLibrary.addMedia()
 * Use api.tokens.getMediaTokens() instead of api.mediaLibrary.getProjectMedia()
 * Use api.tokens.generateUploadUrl() instead of api.mediaLibrary.generateUploadUrl()
 * 
 * This file is kept temporarily for backward compatibility but should not be used
 * in new code. It will be removed in a future update.
 * 
 * Note: Video and audio support will be added to the token system in a future update.
 */

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all media for a project
export const getProjectMedia = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const media = await ctx.db
      .query("mediaLibrary")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
    
    return media;
  },
});

// Get media by type
export const getMediaByType = query({
  args: { 
    projectId: v.id("projects"),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const media = await ctx.db
      .query("mediaLibrary")
      .withIndex("by_project_type", (q) => 
        q.eq("projectId", args.projectId).eq("type", args.type)
      )
      .order("desc")
      .collect();
    
    return media;
  },
});

// Add media to library
export const addMedia = mutation({
  args: {
    projectId: v.id("projects"),
    userId: v.string(),
    type: v.string(),
    source: v.string(),
    fileUrl: v.string(),
    thumbnailUrl: v.optional(v.string()),
    fileName: v.string(),
    fileSize: v.optional(v.number()),
    mimeType: v.optional(v.string()),
    duration: v.optional(v.number()),
    dimensions: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
    metadata: v.optional(v.object({
      prompt: v.optional(v.string()),
      tokenId: v.optional(v.id("tokens")),
      transcription: v.optional(v.string()),
      description: v.optional(v.string()),
      tags: v.optional(v.array(v.string())),
    })),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const mediaId = await ctx.db.insert("mediaLibrary", {
      projectId: args.projectId,
      userId: args.userId,
      type: args.type,
      source: args.source,
      fileUrl: args.fileUrl,
      thumbnailUrl: args.thumbnailUrl,
      fileName: args.fileName,
      fileSize: args.fileSize,
      mimeType: args.mimeType,
      duration: args.duration,
      dimensions: args.dimensions,
      metadata: args.metadata,
      createdAt: now,
      updatedAt: now,
    });
    
    return mediaId;
  },
});

// Update media metadata
export const updateMedia = mutation({
  args: {
    mediaId: v.id("mediaLibrary"),
    metadata: v.optional(v.object({
      prompt: v.optional(v.string()),
      tokenId: v.optional(v.id("tokens")),
      transcription: v.optional(v.string()),
      description: v.optional(v.string()),
      tags: v.optional(v.array(v.string())),
    })),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.mediaId, {
      metadata: args.metadata,
      updatedAt: Date.now(),
    });
  },
});

// Delete media
export const deleteMedia = mutation({
  args: { mediaId: v.id("mediaLibrary") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.mediaId);
  },
});

// Generate storage upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
