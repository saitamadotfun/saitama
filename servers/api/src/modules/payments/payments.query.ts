import { queryBuilder } from "../../core";
import { payments } from "../../db/schema";

export const paymentSearchQuery = queryBuilder(payments, [
  "coin",
  "wallet",
  "customer",
  "status",
  "amount",
  "paymentLink",
  "signature",
  "createdAt",
  "updatedAt",
]);
