'use server';

import { z } from 'zod';
import { validateContactForm } from '@/ai/flows/validate-contact-form';
import { rewriteContactFormMessage } from '@/ai/flows/rewrite-message';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message is too short"),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

interface ActionResult {
  success: boolean;
  message?: string;
  missingFields?: string[];
  isValidationError?: boolean;
  aiSuggestion?: string;
}

export async function submitContactForm(data: ContactFormSchemaType): Promise<ActionResult> {
  const validationResult = contactFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid form data.",
      // More detailed errors can be extracted from validationResult.error.flatten()
    };
  }

  const { name, email, message } = validationResult.data;

  // Step 1: AI Validation
  try {
    const aiValidation = await validateContactForm({ name, email, message });
    if (!aiValidation.isValid) {
      return {
        success: false,
        isValidationError: true,
        message: aiValidation.message || "Please fill out all required fields.",
        missingFields: aiValidation.missingFields,
      };
    }
  } catch (error) {
    console.error("AI validation error:", error);
    // Proceed without AI validation if it fails, or return an error
    // For now, let's log and proceed. Depending on requirements, this could be a hard stop.
  }
  
  // Step 2: AI Rewrite Message (if validation passed or was skipped)
  let finalMessage = message;
  let aiSuggestion: string | undefined = undefined;
  try {
    const rewriteResult = await rewriteContactFormMessage({ name, email, message });
    if (rewriteResult.rewrittenMessage && rewriteResult.rewrittenMessage !== message) {
      finalMessage = rewriteResult.rewrittenMessage;
      aiSuggestion = rewriteResult.rewrittenMessage; // Store suggestion if needed for UI
    }
  } catch (error) {
    console.error("AI rewrite error:", error);
    // Use original message if rewrite fails
  }

  // Step 3: "Send" email (simulate for now)
  console.log("Sending email (simulated):");
  console.log(`To: your.email@example.com (from profile)`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Subject: New Contact Form Submission from InnoFolio`);
  console.log(`Message (potentially rewritten):`);
  console.log(finalMessage);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Form submitted successfully!",
    aiSuggestion: aiSuggestion // Pass back the rewritten message if different
  };
}
