import { queryBuilder } from "../../core";
import { wallets } from "../../db/schema";

export const walletSearchQuery = queryBuilder(wallets, [
  "address",
  "network",
  "generated",
  "customer",
  "address",
  "createdAt",
  "updatedAt",
]);
