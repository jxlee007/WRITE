import type { AuthConfig } from "convex/server";

const clerkDomain = "https://fleet-drum-98.clerk.accounts.dev";

export default {
  providers: [
    {
      domain: clerkDomain,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
