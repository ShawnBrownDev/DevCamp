"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { AdminStats } from "@/components/admin/AdminStats";
import { UsersTable } from "@/components/admin/UsersTable";

export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
            <p className="text-muted-foreground">
              Manage users and view platform statistics
            </p>
          </div>

          <AdminStats />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Users</h3>
            <UsersTable />
          </div>
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}