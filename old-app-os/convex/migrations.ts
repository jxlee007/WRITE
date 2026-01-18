import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Migration: Add userId to all documents based on their projectId
export const migrateDocumentsUserId = internalMutation({
  args: {},
  handler: async (ctx) => {
    const documents = await ctx.db.query("documents").collect();
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const doc of documents) {
      // Skip if already has userId
      if (doc.userId) {
        skipped++;
        continue;
      }

      try {
        // Get the project to find userId
        if (doc.projectId) {
          const project = await ctx.db.get(doc.projectId);
          if (project && project.userId) {
            await ctx.db.patch(doc._id, { userId: project.userId });
            updated++;
          } else {
            console.log(`No project found for document ${doc._id}`);
            errors++;
          }
        } else {
          console.log(`Document ${doc._id} has no projectId`);
          errors++;
        }
      } catch (error) {
        console.error(`Error migrating document ${doc._id}:`, error);
        errors++;
      }
    }

    return {
      total: documents.length,
      updated,
      skipped,
      errors,
    };
  },
});

// Migration: Add userId to all tokens based on their projectId
export const migrateTokensUserId = internalMutation({
  args: {},
  handler: async (ctx) => {
    const tokens = await ctx.db.query("tokens").collect();
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const token of tokens) {
      // Skip if already has userId
      if (token.userId) {
        skipped++;
        continue;
      }

      try {
        // Get the project to find userId
        if (token.projectId) {
          const project = await ctx.db.get(token.projectId);
          if (project && project.userId) {
            await ctx.db.patch(token._id, { userId: project.userId });
            updated++;
          } else {
            console.log(`No project found for token ${token._id}`);
            errors++;
          }
        } else {
          console.log(`Token ${token._id} has no projectId`);
          errors++;
        }
      } catch (error) {
        console.error(`Error migrating token ${token._id}:`, error);
        errors++;
      }
    }

    return {
      total: tokens.length,
      updated,
      skipped,
      errors,
    };
  },
});

// Migration: Add userId to all generatedImages based on their projectId
export const migrateGeneratedImagesUserId = internalMutation({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query("generatedImages").collect();
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const image of images) {
      // Skip if already has userId
      if (image.userId) {
        skipped++;
        continue;
      }

      try {
        // Get the project to find userId
        if (image.projectId) {
          const project = await ctx.db.get(image.projectId);
          if (project && project.userId) {
            await ctx.db.patch(image._id, { userId: project.userId });
            updated++;
          } else {
            console.log(`No project found for image ${image._id}`);
            errors++;
          }
        } else {
          console.log(`Image ${image._id} has no projectId`);
          errors++;
        }
      } catch (error) {
        console.error(`Error migrating image ${image._id}:`, error);
        errors++;
      }
    }

    return {
      total: images.length,
      updated,
      skipped,
      errors,
    };
  },
});

// Check migration status
export const checkMigrationStatus = internalQuery({
  args: {},
  handler: async (ctx) => {
    const documents = await ctx.db.query("documents").collect();
    const tokens = await ctx.db.query("tokens").collect();
    const images = await ctx.db.query("generatedImages").collect();

    return {
      documents: {
        total: documents.length,
        withUserId: documents.filter((d) => d.userId).length,
        withoutUserId: documents.filter((d) => !d.userId).length,
      },
      tokens: {
        total: tokens.length,
        withUserId: tokens.filter((t) => t.userId).length,
        withoutUserId: tokens.filter((t) => !t.userId).length,
      },
      generatedImages: {
        total: images.length,
        withUserId: images.filter((i) => i.userId).length,
        withoutUserId: images.filter((i) => !i.userId).length,
      },
    };
  },
});
