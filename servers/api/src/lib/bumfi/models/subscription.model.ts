import type { Customer } from "./customer.model";
import type {
  PaymentMethod,
  PaymentSource,
  PaymentStatus,
} from "./payment.model";

export type Subscription = {
  cancel_at_period_end: boolean;
  created_at: string;
  currenncy: string;
  customer: Customer;
  customer_id: string;
  id: string;
  itens: {
    created_at: string;
    id: string;
    plan_id: string;
    properties: object;
    subscription_id: string;
    updated_at: string;
  }[];
  metadata: object[];
  org_id: string;
  payment_method: PaymentMethod;
  properties: object;
  reference: string;
  source: PaymentSource;
  start_at: string;
  status: (typeof PaymentStatus)[keyof typeof PaymentStatus];
  updated_at: string;
  v1: object[];
};
