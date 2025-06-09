import { queryBuilder } from "../../core";
import { customers } from "../../db/schema";

export const customerSearchQuery = queryBuilder(customers, [
  "firstName",
  "lastName",
  "reference",
  "createdAt",
]);
