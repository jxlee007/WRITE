/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as chat from "../chat.js";
import type * as documents from "../documents.js";
import type * as generatedImages from "../generatedImages.js";
import type * as mediaLibrary from "../mediaLibrary.js";
import type * as openrouter from "../openrouter.js";
import type * as projects from "../projects.js";
import type * as tokenUsage from "../tokenUsage.js";
import type * as tokens from "../tokens.js";
import type * as utils from "../utils.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  chat: typeof chat;
  documents: typeof documents;
  generatedImages: typeof generatedImages;
  mediaLibrary: typeof mediaLibrary;
  openrouter: typeof openrouter;
  projects: typeof projects;
  tokenUsage: typeof tokenUsage;
  tokens: typeof tokens;
  utils: typeof utils;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
