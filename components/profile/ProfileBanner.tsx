"use client";

import { useProfile } from "@/lib/hooks/useProfile";
import { AvatarUpload } from "./AvatarUpload";

export function ProfileBanner() {
  const { profile } = useProfile();

  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg" />
      <div className="absolute -bottom-12 left-8">
        <AvatarUpload />
      </div>
    </div>
  );
}