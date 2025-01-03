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
import { GradingForm } from "./GradingForm";
import { useSubmissions } from "@/lib/hooks/admin/useSubmissions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function GradingQueue() {
  const { submissions, loading, error, gradeSubmission } = useSubmissions();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
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
        <GradingForm
          submissionId={selectedId}
          onSubmit={async (score, feedback) => {
            await gradeSubmission(selectedId, score, feedback);
            setSelectedId(null);
          }}
          onCancel={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}