"use client";

import { useState } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonSubmission } from "./LessonSubmission";
import { useSubmission } from "@/lib/hooks/courses/useSubmission";
import type { Lesson } from "@/lib/types/courses";

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { submission, loading } = useSubmission(lesson.id);

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration_minutes} mins</span>
            </div>
            <h3 className="font-medium">{lesson.title}</h3>
          </div>
          <Button variant="ghost" size="icon">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">Lesson Content</TabsTrigger>
              <TabsTrigger value="assignment">Assignment</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-4">
              <p className="text-sm text-muted-foreground">{lesson.description}</p>
              <div className="prose prose-sm max-w-none">
                {lesson.content}
              </div>
            </TabsContent>
            <TabsContent value="assignment">
              {!loading && (
                <LessonSubmission 
                  assignmentId={lesson.id}
                  existingSubmission={submission}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
}