'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting chat content themes
 * based on current livestream trends.
 *
 * - suggestChatContent - A function that suggests chat content themes.
 * - SuggestChatContentInput - The input type for the suggestChatContent function.
 * - SuggestChatContentOutput - The return type for the suggestChatContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestChatContentInputSchema = z.object({
  livestreamTrends: z
    .string()
    .describe('Description of current livestream trends.'),
});
export type SuggestChatContentInput = z.infer<typeof SuggestChatContentInputSchema>;

const SuggestChatContentOutputSchema = z.object({
  suggestedThemes: z
    .string()
    .describe(
      'Suggested chat content themes based on the current livestream trends.'
    ),
});
export type SuggestChatContentOutput = z.infer<typeof SuggestChatContentOutputSchema>;

export async function suggestChatContent(input: SuggestChatContentInput): Promise<SuggestChatContentOutput> {
  return suggestChatContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestChatContentPrompt',
  input: {schema: SuggestChatContentInputSchema},
  output: {schema: SuggestChatContentOutputSchema},
  prompt: `You are an AI assistant helping livestream administrators generate engaging chat content for fake viewers.

  Based on the current livestream trends provided, suggest chat content themes that would be relevant and engaging for viewers.

  Livestream Trends: {{{livestreamTrends}}}

  Suggested Chat Content Themes:`,
});

const suggestChatContentFlow = ai.defineFlow(
  {
    name: 'suggestChatContentFlow',
    inputSchema: SuggestChatContentInputSchema,
    outputSchema: SuggestChatContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
