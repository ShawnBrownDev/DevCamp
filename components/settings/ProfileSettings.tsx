"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AvatarUpload } from "./AvatarUpload";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/hooks/useProfile";

// ... rest of the imports and form schema ...

export function ProfileSettings() {
  const { profile, loading, error: profileError } = useProfile();
  const { user, supabase } = useAuth();

  // ... rest of the component code ...

  return (
    <div className="space-y-8">
      {/* Temporary section to show user ID */}
      <Alert>
        <AlertDescription>
          Your user ID: {user?.id}
        </AlertDescription>
      </Alert>

      {/* Rest of the profile settings UI */}
      <AvatarUpload
        currentAvatarUrl={profile?.avatar_url}
        onUploadSuccess={handleAvatarUpload}
      />

      {/* ... rest of the form ... */}
    </div>
  );
}