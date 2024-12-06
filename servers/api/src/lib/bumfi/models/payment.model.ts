export enum PaymentMethod {
  Unknown = 1,
  Merchantcontract = 2,
  Proxywallet = 3,
  Unblock = 4,
  Card = 5,
  Googlepay = 6,
  Applepay = 7,
  Paypal = 8,
  Directdebit = 9,
  Ramp = 10,
  Rampcryptosettlement = 11,
}

export enum PaymentSource {
  Lago = 1,
  Boomfi = 2,
  Stripe = 3,
  Chargebee = 4,
}

export const PaymentStatus = {
  Unknown: 1,
  Pending: 2,
  Future: 3,
  Intrial: 4,
  Active: 5,
  Paused: 6,
  Expired: 7,
  Canceled: 8,
} as const;

export enum CryptoTransactionStatus {
  Pending = 1,
  Success = 2,
  Failed = 3,
}

export enum CryptoTransactionType {
  Unknown = 1,
  Approval = 2,
  Deposit = 3,
  Withdraw = 4,
  Payment = 5,
  Refund = 6,
  Subscribe = 7,
  UnSubscribe = 8,
  Internal = 9,
  swap = 10,
}

export type Payment = {
  amount: string;
  created_at: string;
  crypto_transaction: {
    chain_id: number;
    created_at: number;
    id: number;
    payment_id: {};
    raw: number[];
    sequence: string;
    source: PaymentSource;
    status: CryptoTransactionStatus;
    transaction_hash: string;
    type: CryptoTransactionType;
    updated_at: string;
  };
  currency: string;
  customer: {};
  customer_id: string;
  id: string;
  invoice_id: string;
  next_action: string;
  org_id: string;
  parent_id: string;
  payment_link: {};
  payment_method: PaymentMethod;
  properties: object;
  scheduled_time: number;
  source: PaymentSource;
  status: (typeof PaymentStatus)[keyof typeof PaymentStatus];
  updated_at: string;
  v1: object[];
};
