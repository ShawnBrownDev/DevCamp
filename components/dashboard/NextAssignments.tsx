"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssignmentCard } from "./ui/AssignmentCard";
import { assignments } from "@/lib/data/mockData";
import { cn } from "@/lib/utils";

interface NextAssignmentsProps {
  className?: string;
}

export function NextAssignments({ className }: NextAssignmentsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}