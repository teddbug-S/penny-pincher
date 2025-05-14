// This is an AI-powered function.
'use server';

/**
 * @fileOverview AI-powered function that suggests savings areas and budgeting improvements.
 *
 * - suggestSavingsAreas - A function that suggests savings areas and budgeting improvements based on user spending data.
 * - SuggestSavingsAreasInput - The input type for the suggestSavingsAreas function.
 * - SuggestSavingsAreasOutput - The return type for the suggestSavingsAreas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSavingsAreasInputSchema = z.object({
  spendingData: z
    .string()
    .describe(
      'A string containing the user spending data, including categories and amounts.'
    ),
  budgetGoals: z
    .string()
    .optional()
    .describe('A string containing the user monthly budget goals for each spending category, optional.'),
});
export type SuggestSavingsAreasInput = z.infer<typeof SuggestSavingsAreasInputSchema>;

const SuggestSavingsAreasOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of personalized suggestions on potential savings areas and budgeting improvements.'),
});
export type SuggestSavingsAreasOutput = z.infer<typeof SuggestSavingsAreasOutputSchema>;

export async function suggestSavingsAreas(input: SuggestSavingsAreasInput): Promise<SuggestSavingsAreasOutput> {
  return suggestSavingsAreasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSavingsAreasPrompt',
  input: {schema: SuggestSavingsAreasInputSchema},
  output: {schema: SuggestSavingsAreasOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's spending data and budget goals to provide personalized suggestions on potential savings areas and budgeting improvements.

User Spending Data:
{{{spendingData}}}

User Budget Goals (if available):
{{{budgetGoals}}}

Suggestions:`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const suggestSavingsAreasFlow = ai.defineFlow(
  {
    name: 'suggestSavingsAreasFlow',
    inputSchema: SuggestSavingsAreasInputSchema,
    outputSchema: SuggestSavingsAreasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
