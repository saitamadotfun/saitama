import { queryBuilder } from "../../core";
import { webhooks } from "../../db/schema";

export const webhookSearchQuery = queryBuilder(webhooks, [
  "url",
  "createdAt",
  "updatedAt",
]);
