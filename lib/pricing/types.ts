export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
}

export interface CheckoutFlowParams {
  plan: string;
  isYearly: boolean;
  returnUrl?: string;
}