import { selectWebhookSchema } from "../../db/zod";
import { webhookSearchQuery } from "./webhooks.query";

export const webhookSearchSchema = selectWebhookSchema
  .pick(webhookSearchQuery.pick)
  .partial();
