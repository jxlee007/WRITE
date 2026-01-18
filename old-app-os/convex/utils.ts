import type { MutationCtx, QueryCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

type ConvexCtx = QueryCtx | MutationCtx;

export async function requireUser(ctx: ConvexCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity;
}

export async function ensureProjectOwnership(
  ctx: ConvexCtx,
  projectId: Id<"projects">,
) {
  const identity = await requireUser(ctx);
  const project = await ctx.db.get(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.userId !== identity.subject) {
    throw new Error("Unauthorized");
  }

  return { identity, project } as const;
}

export async function ensureDocumentOwnership(
  ctx: ConvexCtx,
  documentId: Id<"documents">,
) {
  const identity = await requireUser(ctx);
  const document = await ctx.db.get(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  // Check user ownership directly
  if (document.userId !== identity.subject) {
    throw new Error("Unauthorized");
  }

  // Optionally get project if it exists
  let project = null;
  if (document.projectId) {
    project = await ctx.db.get(document.projectId);
  }

  return { identity, project, document } as const;
}

export async function ensureTokenOwnership(
  ctx: ConvexCtx,
  tokenId: Id<"tokens">,
) {
  const identity = await requireUser(ctx);
  const token = await ctx.db.get(tokenId);

  if (!token) {
    throw new Error("Token not found");
  }

  // Check user ownership directly
  if (token.userId !== identity.subject) {
    throw new Error("Unauthorized");
  }

  // Optionally get project if it exists
  let project = null;
  if (token.projectId) {
    project = await ctx.db.get(token.projectId);
  }

  return { identity, project, token } as const;
}

export async function ensureGeneratedImageOwnership(
  ctx: ConvexCtx,
  imageId: Id<"generatedImages">,
) {
  const identity = await requireUser(ctx);
  const image = await ctx.db.get(imageId);

  if (!image) {
    throw new Error("Generated image not found");
  }

  // Check user ownership directly
  if (image.userId !== identity.subject) {
    throw new Error("Unauthorized");
  }

  // Optionally get project if it exists
  let project = null;
  if (image.projectId) {
    project = await ctx.db.get(image.projectId);
  }

  return { identity, project, image } as const;
}
