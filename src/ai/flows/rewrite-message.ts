'use server';

/**
 * @fileOverview AI-powered tool to rewrite contact form messages into alternative professional language.
 *
 * - rewriteContactFormMessage - A function that rewrites the contact form message into professional language.
 * - RewriteContactFormMessageInput - The input type for the rewriteContactFormMessage function.
 * - RewriteContactFormMessageOutput - The return type for the rewriteContactFormMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteContactFormMessageInputSchema = z.object({
  message: z.string().describe('The message from the contact form.'),
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().describe('The email of the person sending the message.'),
});
export type RewriteContactFormMessageInput = z.infer<typeof RewriteContactFormMessageInputSchema>;

const RewriteContactFormMessageOutputSchema = z.object({
  rewrittenMessage: z.string().describe('The rewritten message in professional language.'),
});
export type RewriteContactFormMessageOutput = z.infer<typeof RewriteContactFormMessageOutputSchema>;

export async function rewriteContactFormMessage(input: RewriteContactFormMessageInput): Promise<RewriteContactFormMessageOutput> {
  return rewriteContactFormMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteContactFormMessagePrompt',
  input: {schema: RewriteContactFormMessageInputSchema},
  output: {schema: RewriteContactFormMessageOutputSchema},
  prompt: `You are an AI assistant that rewrites messages from a contact form into professional language.

  Here is the message, name, and email from the contact form:

  Message: {{{message}}}
  Name: {{{name}}}
  Email: {{{email}}}

  Rewrite the message into professional language. Return only the rewritten message. Do not add any salutations or signatures.
  If any of the input fields are empty, remind the user that all fields must be filled out.
  `,
});

const rewriteContactFormMessageFlow = ai.defineFlow(
  {
    name: 'rewriteContactFormMessageFlow',
    inputSchema: RewriteContactFormMessageInputSchema,
    outputSchema: RewriteContactFormMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
