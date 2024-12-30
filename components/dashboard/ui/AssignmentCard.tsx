import { FileText, Clock } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { Assignment } from "@/lib/types/dashboard";

interface AssignmentCardProps {
  assignment: Assignment;
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border">
      <div className="flex items-start space-x-4">
        <FileText className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <p className="font-medium">{assignment.title}</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Due {assignment.dueDate}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {assignment.score && (
          <span className="text-sm font-medium">{assignment.score}</span>
        )}
        <StatusBadge status={assignment.status} />
      </div>
    </div>
  );
}