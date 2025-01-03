"use client";

import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/lib/hooks/useProfile";

export function ProfileStatus() {
  const { profile } = useProfile();

  const getSubscriptionBadge = () => {
    if (!profile?.subscription_status || profile.subscription_status === 'inactive') {
      return null;
    }

    return (
      <Badge 
        variant={profile.subscription_status === 'active' ? 'secondary' : 'outline'}
        className="capitalize"
      >
        {profile.subscription_plan || 'Free'}
        {profile.subscription_period && ` (${profile.subscription_period})`}
      </Badge>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="capitalize">
        {profile?.role || 'user'}
      </Badge>
      {getSubscriptionBadge()}
    </div>
  );
}