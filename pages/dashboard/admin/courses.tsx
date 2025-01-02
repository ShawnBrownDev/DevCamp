"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { CoursesList } from "@/components/admin/courses/CoursesList";
import { CourseForm } from "@/components/admin/courses/CourseForm";
import { LessonManager } from "@/components/admin/courses/LessonManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCoursesQuery } from "@/lib/hooks/courses/useCoursesQuery";
import type { Course } from "@/lib/types/courses";

export default function AdminCoursesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { courses, loading: loadingCourses } = useCoursesQuery();

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
            <CourseForm
              initialData={editingCourse || undefined}
              onCancel={() => {
                setShowForm(false);
                setEditingCourse(null);
              }}
            />
          )}

          {selectedCourse && (
            <LessonManager
              course={selectedCourse}
              onClose={() => setSelectedCourse(null)}
            />
          )}

          <CoursesList
            courses={courses}
            loading={loadingCourses}
            onEdit={setEditingCourse}
            onManageLessons={setSelectedCourse}
          />
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}