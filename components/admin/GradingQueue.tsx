"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmissions } from "@/lib/hooks/admin/useSubmissions";
import { Loader2 } from "lucide-react";

export function GradingQueue() {
  const { submissions, loading, error, gradeSubmission } = useSubmissions();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [grading, setGrading] = useState(false);

  const handleGrade = async () => {
    if (!selectedId || !score) return;

    try {
      setGrading(true);
      await gradeSubmission(selectedId, Number(score), feedback);
      setSelectedId(null);
      setScore("");
      setFeedback("");
    } catch (err) {
      console.error('Failed to grade:', err);
    } finally {
      setGrading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">Error loading submissions</p>;
  }

  const pendingSubmissions = submissions.filter(s => !s.graded_at);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Submissions</CardTitle>
          <CardDescription>
            {pendingSubmissions.length} submissions waiting to be graded
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.user.username}</TableCell>
                  <TableCell>{submission.assignment.title}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(submission.submitted_at), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedId(submission.id)}
                    >
                      Grade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedId && (
        <Card>
          <CardHeader>
            <CardTitle>Grade Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Score (0-100)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">
                  Feedback
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleGrade}
                  disabled={!score || grading}
                >
                  {grading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit Grade
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedId(null);
                    setScore("");
                    setFeedback("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}