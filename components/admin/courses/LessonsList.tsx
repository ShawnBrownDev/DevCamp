"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { Lesson } from "@/lib/types/courses";

interface LessonsListProps {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  onAdd: () => void;
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
}

export function LessonsList({
  lessons,
  loading,
  error,
  onAdd,
  onEdit,
  onDelete,
}: LessonsListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add  Assignment
      </Button>

      {lessons.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No Assignments added yet. Click the button above to add your first  Assignment.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.order_index}</TableCell>
                <TableCell>{lesson.title}</TableCell>
                <TableCell>{lesson.duration_minutes} mins</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(lesson)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(lesson.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}