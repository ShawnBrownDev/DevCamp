import { Calendar } from "lucide-react";
import type { Lesson } from "@/lib/types/dashboard";

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <Calendar className="h-5 w-5 text-primary mt-0.5" />
      <div>
        <p className="font-medium">{lesson.title}</p>
        <p className="text-sm text-muted-foreground">{lesson.date}</p>
        <p className="text-sm text-muted-foreground">{lesson.duration}</p>
      </div>
    </div>
  );
}