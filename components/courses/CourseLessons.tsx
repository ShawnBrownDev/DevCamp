"use client";

import { useCourseLessons } from "@/lib/hooks/courses/useCourseLessons";
import { LessonCard } from "./LessonCard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface CourseLessonsProps {
  courseId: string;
}

export function CourseLessons({ courseId }: CourseLessonsProps) {
  const { lessons, loading, error } = useCourseLessons(courseId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error loading lessons</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No lessons available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}