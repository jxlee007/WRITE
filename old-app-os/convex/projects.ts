import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ensureProjectOwnership, requireUser } from "./utils";

// Query: Get all projects for a user
export const getProjects = query({
  handler: async (ctx) => {
    const identity = await requireUser(ctx);
    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
  },
});

// Query: Get a single project by ID
export const getProject = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const { project } = await ensureProjectOwnership(ctx, args.id);
    return project;
  },
});

// Mutation: Create a new project
export const createProject = mutation({
  args: {
    title: v.string(),
    genre: v.optional(v.string()),
    format: v.string(),
    description: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      userId: identity.subject,
      title: args.title,
      genre: args.genre,
      format: args.format,
      createdAt: now,
      updatedAt: now,
      coverImageUrl: args.coverImageUrl,
      metadata: {
        wordCount: 0,
        chapterCount: 0,
        ...(args.description ? { description: args.description } : {}),
      },
    });
    return projectId;
  },
});

// Mutation: Update a project
export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    genre: v.optional(v.string()),
    format: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    metadata: v.optional(
      v.object({
        wordCount: v.optional(v.number()),
        chapterCount: v.optional(v.number()),
        description: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { project } = await ensureProjectOwnership(ctx, args.id);
    const { id, ...updates } = args;
    const metadataUpdate = updates.metadata
      ? {
          metadata: {
            ...(project?.metadata || {}),
            ...updates.metadata,
          },
        }
      : {};

    const { metadata, ...rest } = updates;

    await ctx.db.patch(id, {
      ...rest,
      ...metadataUpdate,
      updatedAt: Date.now(),
    });
  },
});

// Mutation: Delete a project
export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ensureProjectOwnership(ctx, args.id);
    // Delete all related documents
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();
    for (const doc of documents) {
      await ctx.db.delete(doc._id);
    }

    // Delete all related tokens
    const tokens = await ctx.db
      .query("tokens")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();
    for (const token of tokens) {
      await ctx.db.delete(token._id);
    }

    // Delete the project
    await ctx.db.delete(args.id);
  },
});

// Query: Get project overview with aggregated statistics and token preview
export const getProjectOverview = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const { project } = await ensureProjectOwnership(ctx, args.projectId);
    
    // Get all documents for this project
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    // Calculate document count and word count
    const documentCount = documents.length;
    const wordCount = documents.reduce((sum, doc) => {
      const words = doc.content
        ? doc.content
            .split(/\s+/)
            .filter((word) => word.length > 0).length
        : 0;
      return sum + words;
    }, 0);
    
    // Get all tokens for this project
    const tokens = await ctx.db
      .query("tokens")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    // Count tokens and group by type
    const tokenCount = tokens.length;
    const tokensByType: { [key: string]: number } = {};
    
    tokens.forEach((token) => {
      const type = token.type;
      tokensByType[type] = (tokensByType[type] || 0) + 1;
    });
    
    const recentDocuments = documents
      .slice()
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 3);

    const recentTokens = tokens
      .slice()
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 3);
    
    return {
      project,
      stats: {
        documentCount,
        wordCount,
        tokenCount,
        tokensByType,
      },
      recentDocuments,
      recentTokens,
    };
  },
});

// Mutation: Update project description
export const updateProjectDescription = mutation({
  args: {
    projectId: v.id("projects"),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const { project } = await ensureProjectOwnership(ctx, args.projectId);
    
    // Update with new description
    await ctx.db.patch(args.projectId, {
      metadata: {
        ...(project.metadata || {}),
        description: args.description,
      },
      updatedAt: Date.now(),
    });
    
    // Return updated project
    return await ctx.db.get(args.projectId);
  },
});

// Mutation: Update project cover image URL
export const updateProjectCoverImage = mutation({
  args: {
    projectId: v.id("projects"),
    coverImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ensureProjectOwnership(ctx, args.projectId);

    await ctx.db.patch(args.projectId, {
      coverImageUrl: args.coverImageUrl ?? undefined,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.projectId);
  },
});
