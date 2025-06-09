import { queryBuilder } from "../../core";
import { networks } from "../../db/schema";

export const networkSearchQuery = queryBuilder(networks, [
  "creator",
  "name",
  "parent",
]);
