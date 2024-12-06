export * from "./plan.model";
export * from "./payment.model";
export * from "./customer.model";
export * from "./subscription.model";
export * from "./paymentLink.model";

export type Response<T> = {
  data: T;
  error: boolean;
};

export type ListArgs = {
  after: string;
  before: string;
  limit: number;
  page: number;
  since: string;
  sort: string;
  until: string;
};

export type Paginated<T> = Response<{
  items: T[];
  last_updated: string;
  next: number;
  total: number;
}>;
