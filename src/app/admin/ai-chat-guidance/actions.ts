
'use server';

import { suggestChatContent, type SuggestChatContentInput, type SuggestChatContentOutput } from '@/ai/flows/suggest-chat-content';

interface ActionResult {
  success: boolean;
  data?: SuggestChatContentOutput;
  error?: string;
}

export async function getAISuggestions(input: SuggestChatContentInput): Promise<ActionResult> {
  try {
    // Basic input validation (could be more robust with Zod here too if needed)
    if (!input.livestreamTrends || input.livestreamTrends.trim() === '') {
      return { success: false, error: "Livestream trends input cannot be empty." };
    }

    const result = await suggestChatContent(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    // Provide a more generic error message to the client
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: `Failed to get AI suggestions: ${errorMessage}` };
  }
}
