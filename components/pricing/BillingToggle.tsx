"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface BillingToggleProps {
  onBillingPeriodChange: (yearly: boolean) => void;
}

export function BillingToggle({ onBillingPeriodChange }: BillingToggleProps) {
  const [yearly, setYearly] = useState(false);

  const handleToggle = (checked: boolean) => {
    setYearly(checked);
    onBillingPeriodChange(checked);
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className={`text-sm ${!yearly ? "font-semibold" : "text-muted-foreground"}`}>Monthly</span>
      <Switch
        checked={yearly}
        onCheckedChange={handleToggle}
      />
      <span className={`text-sm ${yearly ? "font-semibold" : "text-muted-foreground"}`}>
        Yearly <span className="text-primary">(Save 20%)</span>
      </span>
    </div>
  );
}