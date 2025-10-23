import { createRoot } from "react-dom/client";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import App from "./App.tsx";
import "./index.css";

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL || "https://good-bloodhound-442.convex.cloud"
);

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing Clerk publishable key. Set VITE_CLERK_PUBLISHABLE_KEY in your environment.");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/sign-in">
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <App />
    </ConvexProviderWithClerk>
  </ClerkProvider>
);
