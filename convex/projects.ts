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
