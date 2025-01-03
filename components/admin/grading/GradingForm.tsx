"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface GradingFormProps {
  submissionId: string;
  onSubmit: (score: number, feedback: string) => Promise<void>;
  onCancel: () => void;
}

export function GradingForm({ submissionId, onSubmit, onCancel }: GradingFormProps) {
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!score) return;

    try {
      setIsSubmitting(true);
      await onSubmit(Number(score), feedback);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Submission</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Score (0-100)</label>
            <Input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Feedback</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={!score || isSubmitting}>
              {isSubmitting ? <LoadingSpinner className="mr-2" /> : null}
              Submit Grade
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}