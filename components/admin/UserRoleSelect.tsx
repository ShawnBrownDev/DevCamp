"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { promoteToAdmin, promoteToModerator } from "@/lib/api/admin";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UserRoleSelectProps {
  userId: string;
  currentRole: string;
  onRoleChange: (newRole: string) => void;
}

export function UserRoleSelect({ userId, currentRole, onRoleChange }: UserRoleSelectProps) {
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async (newRole: string) => {
    try {
      setIsUpdating(true);
      setError(null);

      if (newRole === "admin") {
        await promoteToAdmin(userId);
      } else if (newRole === "moderator") {
        await promoteToModerator(userId);
      }

      onRoleChange(newRole);
    } catch (err: any) {
      console.error("Error updating role:", err);
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-2">
      <Select
        value={currentRole}
        onValueChange={handleRoleChange}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="moderator">Moderator</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}