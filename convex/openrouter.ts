/**
 * OpenRouter AI Integration Module
 * Handles chat completion requests with OpenRouter API
 */

interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface ContentChunk {
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason?: string | null;
  }>;
}

/**
 * Get system prompt based on agent mode
 */
export function getSystemPrompt(agentMode: string): string {
  const prompts: Record<string, string> = {
    screenplay: `You are a professional screenplay writer with expertise in visual storytelling, formatting, pacing, and character development. Provide creative screenplay writing advice, help with structure, and write engaging screenplay scenes. Follow industry standard formatting conventions.`,

    script: `You are an expert script writer specializing in dialogue, comedic timing, and dramatic tension. Help with scriptwriting best practices, dialogue polish, formatting standards, and character voice consistency.`,

    story: `You are a talented story writer with expertise in narrative structure, plot development, character arcs, and pacing. Assist with world-building, plot complications, and storytelling craft.`,

    dialogue: `You are a dialogue specialist with expertise in natural speech patterns, character differentiation, and emotional authenticity. Create engaging, authentic dialogue for characters that reveals personality and drives plot.`,

    character: `You are a character development expert. Help create compelling, realistic, and multi-dimensional characters with clear motivations, conflicts, and character arcs. Develop backstories and behavioral patterns.`,

    worldbuilding: `You are a world-builder and setting expert. Assist with creating immersive, consistent fictional worlds. Develop settings, cultures, rules, magic systems, and environmental details that support storytelling.`,
  };

  return (
    prompts[agentMode] ||
    "You are a helpful AI assistant for creative writing. Provide thoughtful, constructive feedback and creative suggestions."
  );
}/**
 * Make request to OpenRouter API
 * @param apiKey OpenRouter API key
 * @param request Chat completion request
 * @returns OpenRouter API response
 */
export async function callOpenRouterAPI(
  apiKey: string,
  request: OpenRouterRequest
): Promise<OpenRouterResponse> {
  const url = "https://openrouter.ai/api/v1/chat/completions";

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "HTTP-Referer": "https://creative-os.app",
    "X-Title": "Creative OS",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `OpenRouter API error: ${response.status} - ${errorData}`
      );
    }

    const data = (await response.json()) as OpenRouterResponse;
    return data;
  } catch (error) {
    console.error("OpenRouter API call failed:", error);
    throw error;
  }
}

/**
 * Generate AI response using OpenRouter
 * @param apiKey OpenRouter API key
 * @param agentMode The agent mode (screenplay, script, etc.)
 * @param userMessage User's message
 * @param conversationHistory Previous messages in conversation
 * @param model Model to use (default: gpt-3.5-turbo)
 * @returns AI response text
 */
export async function generateAIResponse(
  apiKey: string,
  agentMode: string,
  userMessage: string,
  conversationHistory: OpenRouterMessage[] = [],
  model: string = "mistralai/mistral-small-3.2-24b-instruct:free"
): Promise<{
  response: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}> {
  const systemPrompt = getSystemPrompt(agentMode);

  // Build messages array
  const messages: OpenRouterMessage[] = [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage },
  ];

  const request: OpenRouterRequest = {
    model,
    messages,
    temperature: 0.7,
    max_tokens: 2048,
    top_p: 0.9,
  };

  try {
    const result = await callOpenRouterAPI(apiKey, request);

    const assistantMessage =
      result.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again.";

    return {
      response: assistantMessage,
      model: result.model,
      usage: result.usage,
    };
  } catch (error) {
    console.error("Failed to generate AI response:", error);
    throw error;
  }
}

/**
 * Available OpenRouter models optimized for different use cases
 */
export const AVAILABLE_MODELS = {
    // TNG / DeepSeek
    "tngtech/deepseek-r1t2-chimera:free": "TNG: DeepSeek R1T2 Chimera (free) — Context: 163,840",
    "tngtech/deepseek-r1t-chimera:free": "TNG: DeepSeek R1T Chimera (free) — Context: 163,840",
    "deepseek/deepseek-chat-v3-0324:free": "DeepSeek: DeepSeek V3 0324 (free) — Context: 163,840",
    "deepseek/deepseek-chat-v3.1:free": "DeepSeek: DeepSeek V3.1 (free) — Context: 163,800",
    "deepseek/deepseek-r1-0528:free": "DeepSeek: R1 0528 (free) — Context: 163,840",
    "deepseek/deepseek-r1-0528-qwen3-8b:free": "DeepSeek: R1 0528 Qwen3 8B (free) — Context: 131,072",

    // Z.AI
    "z-ai/glm-4.5-air:free": "Z.AI: GLM 4.5 Air (free) — Context: 131,072",

    // Qwen
    "qwen/qwen3-235b-a22b:free": "Qwen: Qwen3 235B A22B (free) — Context: 262,000",

    // Google
    "google/gemini-2.0-flash-exp:free": "Google: Gemini 2.0 Flash Experimental (free) — Context: 1,048,576",
    "google/gemma-3n-e2b-it:free": "Google: Gemma 3n 2B (free) — Context: 8,192",

    // OpenRouter / Andromeda
    "openrouter/andromeda-alpha": "Andromeda Alpha (openrouter/andromeda-alpha) — Context: 128,000",

    // Alibaba / Tongyi
    "alibaba/tongyi-deepresearch-30b-a3b:free": "Tongyi: DeepResearch 30B A3B (free) — Context: 131,072",

    // Meituan
    "meituan/longcat-flash-chat:free": "Meituan: LongCat Flash Chat (free) — Context: 131,072",

    // NVIDIA
    "nvidia/nemotron-nano-9b-v2:free": "NVIDIA: Nemotron Nano 9B V2 (free) — Context: 128,000",

    // OpenAI / OSS
    "openai/gpt-oss-20b:free": "OpenAI: gpt-oss-20b (free) — Context: 131,072",

    // MoonshotAI
    "moonshotai/kimi-k2:free": "MoonshotAI: Kimi K2 0711 (free) — Context: 32,768",
    "moonshotai/kimi-dev-72b:free": "MoonshotAI: Kimi Dev 72B (free) — Context: 131,072",

    // Venice / Mistral-based
    "cognitivecomputations/dolphin-mistral-24b-venice-edition:free": "Venice: Uncensored (free) — Context: 32,768",
    "mistralai/mistral-small-3.2-24b-instruct:free": "Mistral: Mistral Small 3.2 24B (free) — Context: 131,072",

    // Tencent
    "tencent/hunyuan-a13b-instruct:free": "Tencent: Hunyuan A13B Instruct (free) — Context: 32,768",
} as const;

export type ModelId = keyof typeof AVAILABLE_MODELS;

/**
 * Get recommended model for each agent mode
 * Uses free models to avoid API costs
 * Mistral Small is reliable and has no data policy restrictions on free tier
 */
export function getRecommendedModel(agentMode: string): string {
  // Mistral Small - consistently available free model with no restrictions
  const recommendedModel = "mistralai/mistral-small-3.2-24b-instruct:free";

  // All modes use the same reliable model
  return recommendedModel;
}
