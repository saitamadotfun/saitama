export type Price = {
  amount: number;
  currency: "USD" | "EUR";
};

export type Rest<T extends readonly unknown[]> = T extends [unknown, ...infer R]
  ? R
  : never;
