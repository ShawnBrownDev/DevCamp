"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth";

export function ConnectionStatus() {
  const { isSupabaseConnected } = useAuth();

  if (isSupabaseConnected) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Please connect your Supabase project to enable authentication.
        Click the "Connect to Supabase" button in the top right corner.
      </AlertDescription>
    </Alert>
  );
}