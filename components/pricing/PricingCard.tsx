"use client";

import { Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/hooks/useAuth";
import type { PricingPlan } from "@/lib/pricing/types";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
}

export function PricingCard({ plan, isYearly }: PricingCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? 'year' : 'month';

  const handleGetStarted = () => {
    const params = new URLSearchParams({
      plan: plan.name.toLowerCase(),
      billing: isYearly ? 'yearly' : 'monthly'
    });

    if (!user) {
      router.push(`/signup?${params.toString()}`);
    } else {
      router.push(`/checkout?${params.toString()}`);
    }
  };

  return (
    <Card
      className={`relative flex flex-col border-2 ${
        plan.popular
          ? "border-primary shadow-lg md:scale-105"
          : "border-border"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary rounded-full">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Most Popular</span>
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-center mb-6">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={plan.popular ? "default" : "outline"}
          size="lg"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}