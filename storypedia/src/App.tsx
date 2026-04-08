import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WikiLayout from "./layouts/WikiLayout";
import ScriptsLayout from "./layouts/ScriptsLayout";
import Index from "./pages/Index";
import WikiPage from "./pages/WikiPage";
import ScriptsIndex from "./pages/ScriptsIndex";
import ScriptPage from "./pages/ScriptPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<WikiLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/wiki/:slug" element={<WikiPage />} />
          </Route>
          <Route element={<ScriptsLayout />}>
            <Route path="/scripts" element={<ScriptsIndex />} />
            <Route path="/scripts/:slug" element={<ScriptPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;