import type { Price } from "@saitamadotfun/sdk";

export const formatPrice = (price?: Price) =>
  price
    ? Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency,
        minimumFractionDigits: 2,
      }).format(price.amount)
    : "Free";
