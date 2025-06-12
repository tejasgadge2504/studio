'use server';

/**
 * @fileOverview A contact form validation AI agent.
 *
 * - validateContactForm - A function that validates the contact form and reminds the user if anything is missing.
 * - ValidateContactFormInput - The input type for the validateContactForm function.
 * - ValidateContactFormOutput - The return type for the validateContactForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateContactFormInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  email: z.string().email().describe('The email address of the user.'),
  message: z.string().describe('The message from the user.'),
});
export type ValidateContactFormInput = z.infer<typeof ValidateContactFormInputSchema>;

const ValidateContactFormOutputSchema = z.object({
  isValid: z.boolean().describe('Whether or not the form is valid.'),
  missingFields: z.array(z.string()).describe('The fields that are missing.'),
  message: z.string().describe('A message to the user, reminding them to fill out any missing fields.'),
});
export type ValidateContactFormOutput = z.infer<typeof ValidateContactFormOutputSchema>;

export async function validateContactForm(input: ValidateContactFormInput): Promise<ValidateContactFormOutput> {
  return validateContactFormFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateContactFormPrompt',
  input: {schema: ValidateContactFormInputSchema},
  output: {schema: ValidateContactFormOutputSchema},
  prompt: `You are an AI assistant that validates contact forms.  You will be given the name, email, and message from the user.  If any of the fields are empty, you should set isValid to false, list the missing fields in the missingFields array, and provide a message to the user reminding them to fill out the missing fields.

If all fields are present, set isValid to true, set missingFields to an empty array, and set the message to an empty string.

Here is the contact form data:

Name: {{{name}}}
Email: {{{email}}}
Message: {{{message}}}`,
});

const validateContactFormFlow = ai.defineFlow(
  {
    name: 'validateContactFormFlow',
    inputSchema: ValidateContactFormInputSchema,
    outputSchema: ValidateContactFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
