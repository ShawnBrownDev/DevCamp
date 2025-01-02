"use client";

import Link from "next/link";
import { Clock, BookOpen, BarChart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Course, CourseProgress } from "@/lib/types/courses";

interface CourseCardProps {
  course: Course;
  progress?: CourseProgress;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const levelColors = {
    beginner: "text-green-500",
    intermediate: "text-blue-500",
    advanced: "text-purple-500"
  };

  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="aspect-video rounded-md bg-muted mb-4">
            {course.thumbnail_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <span className={`text-sm ${levelColors[course.level]}`}>
                {course.level}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration_weeks} weeks</span>
            </div>
            {progress && (
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>
                  {progress.completed_lessons}/{progress.total_lessons} lessons
                </span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {progress ? (
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress.completion_percentage}%</span>
              </div>
              <Progress value={progress.completion_percentage} />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-2">
              <span className="text-sm font-medium">Start Course</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}