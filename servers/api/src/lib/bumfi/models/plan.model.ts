export const PlanType = {
  unknown: 1,
  onetime: 2,
  recurring: 3,
} as const;

export type PlanType = (typeof PlanType)[keyof typeof PlanType];

export type CreatePlanArgs = {
  amount: string;
  currency: string;
  description: string;
  interval: "week" | "month" | "year";
  intervalCount: number;
  metadata: object;
  name: string;
  reference: string;
  trial_period: string;
};

export type  Plan = {
  id: string;
  org_id: string;
  source: string;
  name: PlanType;
  billing_scheme: string;
  price: string;
  currency: string;
  available_quantity: number;
  trial_period: string;
  recurring_interval: "week" | "month" | "year";
  recurring_interval_count: number;
  recurring_usage_type: string;
  reference: string;
  enable: boolean;
  v1: string;
  created_by: string;
  updated_at: string;
  deleted_at: string;
  metadata: object;
  properties: object;
};
