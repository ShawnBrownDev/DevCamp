"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonCard } from "./ui/LessonCard";
import { upcomingLessons } from "@/lib/data/mockData";

export function UpcomingLessons() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Lessons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}