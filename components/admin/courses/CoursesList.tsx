"use client";

import { CourseCard } from "./CourseCard";
import { useCourseManagement } from "@/lib/hooks/admin/useCourseManagement";
import { Loader2 } from "lucide-react";
import type { Course } from "@/lib/types/courses";

interface CoursesListProps {
  courses: Course[];
  loading: boolean;
  onEdit: (course: Course) => void;
  onManageLessons: (course: Course) => void;
}

export function CoursesList({ 
  courses, 
  loading, 
  onEdit, 
  onManageLessons 
}: CoursesListProps) {
  const { deleteCourse } = useCourseManagement();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onEdit={onEdit}
          onDelete={deleteCourse}
          onManageLessons={onManageLessons}
        />
      ))}
    </div>
  );
}