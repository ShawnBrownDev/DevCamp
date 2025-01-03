"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSubmissions } from "@/lib/hooks/admin/useSubmissions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function GradingTable() {
  const { submissions, loading, error } = useSubmissions();

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

  const gradedSubmissions = submissions.filter(s => s.graded_at);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Assignment</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Graded</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gradedSubmissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.user.username}</TableCell>
            <TableCell>{submission.assignment.title}</TableCell>
            <TableCell>{submission.score}/100</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(submission.graded_at!), {
                addSuffix: true,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}