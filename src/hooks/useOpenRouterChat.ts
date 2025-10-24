/**
 * OpenRouter Integration - Client-Side Hook
 * For use in React components to interact with OpenRouter API via Convex
 */

import { useMutation, useQuery } from "convex/react";
import { useState, useCallback } from "react";

interface SendMessageResult {
  userMessageId: string;
  assistantMessageId: string;
  response: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface UseChatOptions {
  userId: string;
  agentMode: string;
  onError?: (error: Error) => void;
}

export function useOpenRouterChat(options: UseChatOptions) {
  // Note: These mutations/queries would be called directly from components
  // using the Convex hooks after the functions are deployed

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(
    async (
      content: string,
      attachments?: string[],
      model?: string
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        // This will be called from the component using the Convex hook
        // Return placeholder for now
        return {
          userMessageId: "",
          assistantMessageId: "",
          response: "",
          model: "",
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        options.onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  return {
    sendMessage,
    isLoading,
    error,
  };
}

export default useOpenRouterChat;

