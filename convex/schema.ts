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
    userId: v.optional(v.string()), // User identifier from auth - optional for migration
    projectId: v.optional(v.id("projects")), // Optional project association
    title: v.string(), // Chapter/Scene name
    content: v.string(), // Rich text as JSON string from TipTap
    documentOrder: v.number(), // For sorting
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_project_order", ["projectId", "documentOrder"])
    .index("by_user_order", ["userId", "documentOrder"]),

  // Tokens table - Unified system for world-building elements AND media
  // Includes: characters, locations, objects, creatures, factions, events, reference images, AI-generated images
  tokens: defineTable({
    userId: v.optional(v.string()), // User identifier from auth - optional for migration
    projectId: v.optional(v.id("projects")), // Optional project association
    type: v.string(), // character, location, object, creature, faction, event, reference-image, ai-generated-image
    name: v.string(),
    description: v.string(), // Rich text description
    
    // Traditional token fields
    promptTemplate: v.optional(v.string()), // AI generation prompt
    primaryImageUrl: v.optional(v.string()), // Main image URL (deprecated in favor of fileUrl)
    visualSeed: v.optional(v.string()), // For consistency in generation
    
    // Media fields (for reference-image and ai-generated-image types)
    source: v.optional(v.string()), // "uploaded", "ai-generated"
    fileUrl: v.optional(v.string()), // Storage URL or Convex storage ID
    thumbnailUrl: v.optional(v.string()), // Preview thumbnail
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()), // in bytes
    mimeType: v.optional(v.string()),
    dimensions: v.optional(
      v.object({
        width: v.number(),
        height: v.number(),
      })
    ),
    
    // AI generation specific fields (for ai-generated-image type)
    prompt: v.optional(v.string()), // Full prompt used for AI generation
    modelUsed: v.optional(v.string()), // AI model name
    settings: v.optional(
      v.object({
        size: v.optional(v.string()),
        quality: v.optional(v.string()),
        style: v.optional(v.string()),
      })
    ),
    
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
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_project_type", ["projectId", "type"])
    .index("by_user_type", ["userId", "type"])
    .index("by_name", ["name"])
    .index("by_source", ["source"])
    .index("by_created", ["createdAt"]),

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
  // DEPRECATED: Now using tokens table with type "ai-generated-image"
  // Keeping for migration purposes
  generatedImages: defineTable({
    userId: v.optional(v.string()), // User identifier from auth - optional for migration
    projectId: v.optional(v.id("projects")), // Optional project association
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
    .index("by_user", ["userId"])
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

  // AI Chat history - Track conversations with AI agents
  chatHistory: defineTable({
    userId: v.string(),
    agentMode: v.string(), // screenplay, script, story, dialogue, character, worldbuilding
    role: v.string(), // user or assistant
    content: v.string(),
    attachments: v.optional(v.array(v.string())),
    model: v.optional(v.string()), // AI model used for assistant responses
    usage: v.optional(
      v.object({
        promptTokens: v.optional(v.number()),
        completionTokens: v.optional(v.number()),
        totalTokens: v.optional(v.number()),
      })
    ),
    isError: v.optional(v.boolean()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_mode", ["userId", "agentMode"])
    .index("by_created", ["createdAt"]),

  // Media Library - All media files (images, videos, audio)
  // DEPRECATED: Now using tokens table with type "reference-image" for images
  // Keeping for migration purposes
  mediaLibrary: defineTable({
    projectId: v.id("projects"),
    userId: v.string(),
    type: v.string(), // image, video, audio
    source: v.string(), // ai-generated, uploaded
    fileUrl: v.string(), // Storage URL or Convex storage ID
    thumbnailUrl: v.optional(v.string()), // Preview thumbnail
    fileName: v.string(),
    fileSize: v.optional(v.number()), // in bytes
    mimeType: v.optional(v.string()),
    duration: v.optional(v.number()), // For audio/video in seconds
    dimensions: v.optional(
      v.object({
        width: v.number(),
        height: v.number(),
      })
    ),
    metadata: v.optional(
      v.object({
        prompt: v.optional(v.string()), // For AI-generated
        tokenId: v.optional(v.id("tokens")), // Linked token
        transcription: v.optional(v.string()), // For audio
        description: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"])
    .index("by_type", ["type"])
    .index("by_source", ["source"])
    .index("by_project_type", ["projectId", "type"])
    .index("by_created", ["createdAt"]),

  // AI Suggestions - Writing improvement suggestions
  suggestions: defineTable({
    documentId: v.id("documents"),
    type: v.string(), // grammar, spelling, style, clarity, tone, consistency
    range: v.object({ from: v.number(), to: v.number() }),
    originalText: v.string(),
    suggestedText: v.string(),
    explanation: v.string(),
    status: v.string(), // pending, accepted, rejected
    confidence: v.optional(v.number()), // 0-1 confidence score
    createdAt: v.number(),
  })
    .index("by_document", ["documentId"])
    .index("by_document_status", ["documentId", "status"])
    .index("by_created", ["createdAt"]),
});
