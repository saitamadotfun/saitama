import { queryBuilder } from "../../core";
import { apiKeys } from "../../db/schema";

export const apiKeySearchQuery = queryBuilder(apiKeys, ["createdAt"]);
