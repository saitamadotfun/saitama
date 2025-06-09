import { selectApiKeySchema } from "../../db/zod";
import { apiKeySearchQuery } from "./api-keys.query";

export const apiKeySearchSchema = selectApiKeySchema
  .pick(apiKeySearchQuery.pick)
  .partial();
