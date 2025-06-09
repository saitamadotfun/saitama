import { queryBuilder } from "../../core";
import { paymentLinks } from "../../db/schema";

export const paymentLinkSearchQuery = queryBuilder(paymentLinks, [
  "name",
  "networks",
  "createdAt",
  "updatedAt",
]);
