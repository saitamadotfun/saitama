import { coins } from "../../db/schema";
import { queryBuilder } from "../../core";

export const coinSearchQuery = queryBuilder(coins, [
  "creator",
  "isNative",
  "mint",
  "network",
  "ticker",
]);
