'use server';

import { z } from 'zod';
import { validateContactForm } from '@/ai/flows/validate-contact-form';
import { rewriteContactFormMessage } from '@/ai/flows/rewrite-message';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
  }

  // Step 2: AI Rewrite
  let finalMessage = message;
  let aiSuggestion: string | undefined = undefined;

  try {
    const rewriteResult = await rewriteContactFormMessage({ name, email, message });
    if (rewriteResult.rewrittenMessage && rewriteResult.rewrittenMessage !== message) {
      finalMessage = rewriteResult.rewrittenMessage;
      aiSuggestion = finalMessage;
    }
  } catch (error) {
    console.error("AI rewrite error:", error);
  }

  // Step 3: Send Email via Resend
  try {
    await resend.emails.send({
      from: 'Tejas Contact Form <onboarding@resend.dev>',
      to: 'tejasgadge903@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${finalMessage}</p>
      `,
    });

    return {
      success: true,
      message: "Form submitted successfully!",
      aiSuggestion,
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again.",
    };
  }
}
