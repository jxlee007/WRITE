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

  const project = await ctx.db.get(document.projectId);
  if (!project || project.userId !== identity.subject) {
    throw new Error("Unauthorized");
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

  const project = await ctx.db.get(token.projectId);
  if (!project || project.userId !== identity.subject) {
    throw new Error("Unauthorized");
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

  const project = await ctx.db.get(image.projectId);
  if (!project || project.userId !== identity.subject) {
    throw new Error("Unauthorized");
  }

  return { identity, project, image } as const;
}
