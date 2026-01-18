import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ensureDocumentOwnership, requireUser } from "./utils";

// Query: Get all documents for a user (optionally filtered by project)
export const getDocuments = query({
  args: { projectId: v.optional(v.id("projects")) },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    
    if (args.projectId) {
      // Filter by project if provided
      return await ctx.db
        .query("documents")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .order("asc")
        .collect();
    } else {
      // Get all user documents
      return await ctx.db
        .query("documents")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .order("desc")
        .collect();
    }
  },
});

// Query: Get a single document by ID
export const getDocument = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const { document } = await ensureDocumentOwnership(ctx, args.id);
    return document;
  },
});

// Mutation: Create a new document
export const createDocument = mutation({
  args: {
    projectId: v.optional(v.id("projects")),
    title: v.string(),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const now = Date.now();
    
    // Get the count of existing documents to set order
    const existingDocs = args.projectId
      ? await ctx.db
          .query("documents")
          .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
          .collect()
      : await ctx.db
          .query("documents")
          .withIndex("by_user", (q) => q.eq("userId", identity.subject))
          .collect();
    
    const documentId = await ctx.db.insert("documents", {
      userId: identity.subject,
      projectId: args.projectId,
      title: args.title,
      content: args.content || '{"type":"doc","content":[{"type":"paragraph"}]}',
      documentOrder: existingDocs.length,
      createdAt: now,
      updatedAt: now,
    });
    
    // Update project's chapter count if project is specified
    if (args.projectId) {
      const project = await ctx.db.get(args.projectId);
      if (project) {
        await ctx.db.patch(args.projectId, {
          metadata: {
            ...project.metadata,
            chapterCount: (project.metadata?.chapterCount || 0) + 1,
          },
          updatedAt: now,
        });
      }
    }
    
    return documentId;
  },
});

// Mutation: Update a document
export const updateDocument = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    documentOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ensureDocumentOwnership(ctx, args.id);
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Mutation: Delete a document
export const deleteDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const { document: doc } = await ensureDocumentOwnership(ctx, args.id);
    
    // Delete related token usages
    const usages = await ctx.db
      .query("tokenUsage")
      .withIndex("by_document", (q) => q.eq("documentId", args.id))
      .collect();
    for (const usage of usages) {
      await ctx.db.delete(usage._id);
    }
    
    // Delete the document
    await ctx.db.delete(args.id);
    
    // Update project's chapter count if project is associated
    if (doc.projectId) {
      const project = await ctx.db.get(doc.projectId);
      if (project && project.metadata) {
        await ctx.db.patch(doc.projectId, {
          metadata: {
            ...project.metadata,
            chapterCount: Math.max(0, (project.metadata.chapterCount || 0) - 1),
          },
          updatedAt: Date.now(),
        });
      }
    }
  },
});
