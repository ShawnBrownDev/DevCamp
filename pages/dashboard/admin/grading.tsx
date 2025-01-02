"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { GradingQueue } from "@/components/admin/GradingQueue";

export default function AdminGradingPage() {
  return (
    <AdminRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Grading Queue</h2>
            <p className="text-muted-foreground">
              Review and grade student submissions
            </p>
          </div>

          <GradingQueue />
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}