import type { PlanType } from "./plan.model";

export type CreatePaymentArgs = {
  name: string;
  amount: string | number;
  currency: string;
  reference?: string;
  description?: string;
  interval?: "week" | "month" | "year";
  intervalCount?: number;
  trialPeriod?: string;
  type?: PlanType;
  image_url?: string;
  metadata?: {
    payment_method_type?: ("MerchantContract" | "ProxyWallet" | "Card")[];
    after_completion?: {
      type: "hosted" | "redirect";
      custom_message?: string;
      redirect_url?: string;
    };
    omit_possible_duplicate_acknownledgement?: boolean;
  };
};

export type PaymentLink = {
  id: string;
  plan_id: string;
  invoice_id: string;
  source: string;
  customer_ident_collection: boolean;
  shipping_address_collection: boolean;
  tax_ident_collection: boolean;
  enable: boolean;
  deleted_at: number;
  created_by: string;
  updated_by: string;
  created_at: number;
  updated_at: number;
  metadata: object;
  properties: {
    short_code: string;
  };
  plan: {
    id: string;
    org_id: string;
    source: string;
    name: string;
    type: string;
    billing_scheme: string;
    price: string;
    currency: string;
    available_quantity: number;
    trial_period: string;
    recurring_interval: string;
    recurring_interval_count: number;
    recurring_usage_typeL: string;
    reference: string;
    enable: boolean;
    v1: string;
    created_by: string;
    updated_at: number;
    deleted_at: number;
    metadata: object;
  };
};
