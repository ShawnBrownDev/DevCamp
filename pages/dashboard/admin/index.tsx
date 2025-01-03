"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { AdminStats } from "@/components/admin/AdminStats";
import { UsersTable } from "@/components/admin/UsersTable";

export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage users and view platform statistics
            </p>
          </div>

          <AdminStats />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <UsersTable />
          </div>
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}