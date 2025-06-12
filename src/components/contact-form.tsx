'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions/contact-actions';
import type { ContactFormSchemaType } from '@/app/actions/contact-actions';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const form = useForm<ContactFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: ContactFormSchemaType) {
    setIsSubmitting(true);
    setAiSuggestion(null);

    try {
      const result = await submitContactForm(values);

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
      } else {
        if (result.isValidationError && result.message) {
          // AI validation suggested fields are missing
           toast({
            variant: "destructive",
            title: "Incomplete Form",
            description: result.message + (result.missingFields ? ` Missing: ${result.missingFields.join(', ')}` : ''),
          });
        } else if (result.aiSuggestion) {
          // AI rewrite suggestion (not implemented as a user choice in this version)
          // This branch might not be hit if validation error is shown first
          setAiSuggestion(result.aiSuggestion);
           toast({
            title: "Message Processed",
            description: "Your message was processed with AI enhancements."
           });
        } else {
           toast({
            variant: "destructive",
            title: "Submission Failed",
            description: result.message || "An unexpected error occurred. Please try again.",
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} className="bg-card text-card-foreground placeholder:text-muted-foreground/70" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} className="bg-card text-card-foreground placeholder:text-muted-foreground/70" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." {...field} rows={5} className="bg-card text-card-foreground placeholder:text-muted-foreground/70" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-semibold" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
        {aiSuggestion && (
          <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-md">
            <p className="text-sm text-green-300">
              <span className="font-semibold">AI Suggestion:</span> {aiSuggestion}
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
