"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CourseStats } from "@/lib/types/dashboard";

// This would be fetched from your backend
const courseStats: CourseStats = {
  progress: 65,
  completedLessons: 24,
  remainingLessons: 12
};

export function CourseProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={courseStats.progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {courseStats.progress}% complete
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-2xl font-bold">{courseStats.completedLessons}</p>
              <p className="text-sm text-muted-foreground">Lessons Complete</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{courseStats.remainingLessons}</p>
              <p className="text-sm text-muted-foreground">Lessons Remaining</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}