"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFeatureFlags } from "@/lib/hooks/useFeatureFlags";
import { Loader2 } from "lucide-react";

export function PreferencesSettings() {
  const { flags, loading, toggleFlag } = useFeatureFlags();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Features</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="beta-features">Beta Features</Label>
            <Switch
              id="beta-features"
              checked={flags?.beta_features}
              onCheckedChange={() => toggleFlag("beta_features")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="advanced-chat">Advanced Chat Features</Label>
            <Switch
              id="advanced-chat"
              checked={flags?.advanced_chat}
              onCheckedChange={() => toggleFlag("advanced_chat")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="custom-themes">Custom Themes</Label>
            <Switch
              id="custom-themes"
              checked={flags?.custom_themes}
              onCheckedChange={() => toggleFlag("custom_themes")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}