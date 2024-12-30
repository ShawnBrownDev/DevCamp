"use client";

import { useState } from "react";
import { PricingCard } from "./PricingCard";
import { BillingToggle } from "./BillingToggle";
import { plans } from "@/lib/pricing/plans";

export function PricingCards() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <BillingToggle onBillingPeriodChange={setYearly} />
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isYearly={yearly}
          />
        ))}
      </div>
    </>
  );
}