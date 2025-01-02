"use client";

import { useState } from "react";
import { LessonForm } from "./LessonForm";
import { LessonsList } from "./LessonsList";
import { useLessons } from "@/lib/hooks/admin/useLessons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/lib/types/courses";

interface LessonManagerProps {
  course: Course;
  onClose: () => void;
}

export function LessonManager({ course, onClose }: LessonManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const { lessons, loading, error, createLesson, updateLesson, deleteLesson } = useLessons(course.id);

  const handleSubmit = async (data: any) => {
    try {
      if (editingLesson) {
        await updateLesson(editingLesson.id, data);
      } else {
        await createLesson(data);
      }
      setShowForm(false);
      setEditingLesson(null);
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Assignments - {course.title}</CardTitle>
        <CardDescription>
          Add and manage  Assignments for this course
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showForm ? (
          <LessonForm
            courseId={course.id}
            initialData={editingLesson}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingLesson(null);
            }}
          />
        ) : (
          <LessonsList
            lessons={lessons}
            loading={loading}
            error={error}
            onAdd={() => setShowForm(true)}
            onEdit={setEditingLesson}
            onDelete={deleteLesson}
          />
        )}
      </CardContent>
    </Card>
  );
}