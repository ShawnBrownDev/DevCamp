"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Edit, Trash } from "lucide-react";
import type { Course } from "@/lib/types/courses";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onManageLessons: (course: Course) => void;
}

export function CourseCard({ course, onEdit, onDelete, onManageLessons }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{course.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Level:</span>
            <span className="font-medium capitalize">{course.level}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{course.duration_weeks} weeks</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManageLessons(course)}
              className="flex-1"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Assignments
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(course)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(course.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}