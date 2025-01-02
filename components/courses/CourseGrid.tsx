"use client";

import { CourseCard } from "./CourseCard";
import type { Course, CourseProgress } from "@/lib/types/courses";

interface CourseGridProps {
  courses: (Course & { progress?: CourseProgress })[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No courses found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          progress={course.progress}
        />
      ))}
    </div>
  );
}