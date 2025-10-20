import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get all projects for a user
export const getProjects = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Query: Get a single project by ID
export const getProject = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation: Create a new project
export const createProject = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    genre: v.optional(v.string()),
    format: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      userId: args.userId,
      title: args.title,
      genre: args.genre,
      format: args.format,
      createdAt: now,
      updatedAt: now,
      metadata: {
        wordCount: 0,
        chapterCount: 0,
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
    metadata: v.optional(
      v.object({
        wordCount: v.optional(v.number()),
        chapterCount: v.optional(v.number()),
        description: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Mutation: Delete a project
export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
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

// Query: Get project overview with aggregated statistics
export const getProjectOverview = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    // Get the project
    const project = await ctx.db.get(args.projectId);
    
    if (!project) {
      throw new Error("Project not found");
    }
    
    // Get all documents for this project
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    // Calculate document count and word count
    const documentCount = documents.length;
    const wordCount = documents.reduce((sum, doc) => {
      const words = doc.content?.split(/\s+/).length || 0;
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
    
    // Get top 8 tokens for preview
    const previewTokens = tokens.slice(0, 8);
    
    return {
      project,
      stats: {
        documentCount,
        wordCount,
        tokenCount,
        tokensByType,
      },
      tokens: previewTokens,
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
    // Get current project
    const currentProject = await ctx.db.get(args.projectId);
    
    if (!currentProject) {
      throw new Error("Project not found");
    }
    
    // Update with new description
    await ctx.db.patch(args.projectId, {
      metadata: {
        wordCount: currentProject.metadata?.wordCount,
        chapterCount: currentProject.metadata?.chapterCount,
        description: args.description,
      },
      updatedAt: Date.now(),
    });
    
    // Return updated project
    return await ctx.db.get(args.projectId);
  },
});
