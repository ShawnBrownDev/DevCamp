"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { CourseForm } from "@/components/admin/courses/CourseForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCoursesQuery } from "@/lib/hooks/courses/useCoursesQuery";
import { useCourseManagement } from "@/lib/hooks/admin/useCourseManagement";
import { Loader2, Plus } from "lucide-react";
import type { Course } from "@/lib/types/courses";

export default function AdminCoursesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { courses, loading: loadingCourses } = useCoursesQuery();
  const { createCourse, updateCourse, deleteCourse, loading: savingCourse } = useCourseManagement();

  const handleSubmit = async (data: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, data);
      } else {
        await createCourse(data);
      }
      setShowForm(false);
      setEditingCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  if (loadingCourses) {
    return (
      <AdminRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DashboardLayout>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
              <p className="text-muted-foreground">
                Manage your course catalog
              </p>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </div>

          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </CardTitle>
                <CardDescription>
                  Fill in the course details below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CourseForm
                  initialData={editingCourse || undefined}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingCourse(null);
                  }}
                />
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                        onClick={() => {
                          setEditingCourse(course);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteCourse(course.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}