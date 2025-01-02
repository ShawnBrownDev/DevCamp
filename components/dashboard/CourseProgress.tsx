"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCoursesQuery } from '@/lib/hooks/courses/useCoursesQuery';
import { useCourseStats } from '@/lib/hooks/dashboard/useCourseStats';
import { Loader2 } from "lucide-react";

export function CourseProgress() {
  const { courses, loading, error } = useCoursesQuery();
  const stats = useCourseStats(courses);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">Failed to load course progress</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={stats.progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {stats.progress}% complete
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-2xl font-bold">{stats.completedLessons}</p>
              <p className="text-sm text-muted-foreground">Lessons Complete</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.remainingLessons}</p>
              <p className="text-sm text-muted-foreground">Lessons Remaining</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}