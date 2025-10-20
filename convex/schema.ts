import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Projects table - Main container for writing projects
  projects: defineTable({
    userId: v.string(), // User identifier from auth
    title: v.string(),
    genre: v.optional(v.string()), // Fantasy, Sci-Fi, Mystery, etc.
    format: v.string(), // novel, screenplay, stage_play, comic_script
    createdAt: v.number(),
    updatedAt: v.number(),
    coverImageUrl: v.optional(v.string()),
    metadata: v.optional(
      v.object({
        wordCount: v.optional(v.number()),
        chapterCount: v.optional(v.number()),
        description: v.optional(v.string()),
      })
    ),
  })
    .index("by_user", ["userId"])
    .index("by_updated", ["updatedAt"]),

  // Documents table - Chapters, scenes, acts within a project
  documents: defineTable({
    projectId: v.id("projects"),
    title: v.string(), // Chapter/Scene name
    content: v.string(), // Rich text as JSON string from TipTap
    documentOrder: v.number(), // For sorting
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_order", ["projectId", "documentOrder"]),

  // Tokens table - World-building elements (characters, locations, etc.)
  tokens: defineTable({
    projectId: v.id("projects"),
    type: v.string(), // character, location, object, creature, faction, event
    name: v.string(),
    description: v.string(), // Rich text description
    promptTemplate: v.optional(v.string()), // AI generation prompt
    primaryImageUrl: v.optional(v.string()), // Main image URL
    visualSeed: v.optional(v.string()), // For consistency in generation
    metadata: v.optional(
      v.object({
        // Flexible metadata based on token type
        // For characters: age, height, traits, etc.
        // For locations: atmosphere, geography, etc.
        tags: v.optional(v.array(v.string())),
        customFields: v.optional(v.any()),
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_type", ["projectId", "type"])
    .index("by_name", ["name"]),

  // Token relationships - How tokens relate to each other
  tokenRelationships: defineTable({
    fromTokenId: v.id("tokens"),
    toTokenId: v.id("tokens"),
    relationshipType: v.string(), // lives_in, works_for, owns, knows, opposes, etc.
    description: v.optional(v.string()),
  })
    .index("by_from_token", ["fromTokenId"])
    .index("by_to_token", ["toTokenId"]),

  // Generated images - AI-generated images linked to tokens/projects
  generatedImages: defineTable({
    projectId: v.id("projects"),
    tokenId: v.optional(v.id("tokens")),
    prompt: v.string(), // Full prompt used for generation
    imageUrl: v.string(), // Storage URL
    modelUsed: v.optional(v.string()), // AI model name
    settings: v.optional(
      v.object({
        size: v.optional(v.string()),
        quality: v.optional(v.string()),
        style: v.optional(v.string()),
      })
    ),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_token", ["tokenId"])
    .index("by_created", ["createdAt"]),

  // Token usage - Track where tokens are used in documents
  tokenUsage: defineTable({
    documentId: v.id("documents"),
    tokenId: v.id("tokens"),
    position: v.number(), // Character position in document
    context: v.optional(v.string()), // Surrounding text
    createdAt: v.number(),
  })
    .index("by_document", ["documentId"])
    .index("by_token", ["tokenId"]),
});
