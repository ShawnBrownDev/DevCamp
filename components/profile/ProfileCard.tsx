"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileStatus } from "./ProfileStatus";
import { ProfileForm } from "./ProfileForm";

export function ProfileCard() {
  return (
    <Card className="overflow-hidden">
      <ProfileBanner />
      <CardHeader className="pt-16">
        <ProfileStatus />
      </CardHeader>
      <CardContent>
        <ProfileForm />
      </CardContent>
    </Card>
  );
}