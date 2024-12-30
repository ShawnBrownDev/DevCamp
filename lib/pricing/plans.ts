export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
}

export const plans: PricingPlan[] = [
  {
    name: 'Basic',
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: false,
    features: [
      'Access to all basic courses',
      'Community chat access',
      'Weekly group sessions',
      'Basic project reviews',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 49,
    yearlyPrice: 490,
    popular: true,
    features: [
      'All Basic features',
      'Advanced courses',
      '1-on-1 mentoring sessions',
      'Priority code reviews',
      'Career guidance',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 99,
    yearlyPrice: 990,
    popular: false,
    features: [
      'All Pro features',
      'Custom learning path',
      'Daily 1-on-1 sessions',
      'Job placement assistance',
      'Resume review',
    ],
  },
];