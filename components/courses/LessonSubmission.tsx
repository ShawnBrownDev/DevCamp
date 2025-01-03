"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSubmitAssignment } from "@/lib/hooks/courses/useSubmitAssignment";

const submissionSchema = z.object({
  content: z.string().min(10, "Submission must be at least 10 characters"),
});

interface LessonSubmissionProps {
  assignmentId: string;
  existingSubmission?: {
    id: string;
    content: string;
    score?: number;
    feedback?: string;
  };
}

export function LessonSubmission({ assignmentId, existingSubmission }: LessonSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitAssignment, error } = useSubmitAssignment();

  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      content: existingSubmission?.content || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof submissionSchema>) => {
    try {
      setIsSubmitting(true);
      await submitAssignment(assignmentId, data.content);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {existingSubmission?.score !== undefined && (
        <Alert>
          <AlertDescription>
            Score: {existingSubmission.score}/100
            {existingSubmission.feedback && (
              <div className="mt-2">
                <strong>Feedback:</strong>
                <p className="text-sm">{existingSubmission.feedback}</p>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Submission</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={10}
                    placeholder="Enter your solution here..."
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {existingSubmission ? "Update Submission" : "Submit Assignment"}
          </Button>
        </form>
      </Form>
    </div>
  );
}