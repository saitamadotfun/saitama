import { queryBuilder } from "../../core";
import { apps } from "../../db/schema";

export const appSearchQuery = queryBuilder(apps, [
  "name",
  "user",
  "createdAt",
  "updatedAt",
]);
