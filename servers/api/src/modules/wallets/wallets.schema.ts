import { selectWalletSchema1 } from "../../db/zod";
import { walletSearchQuery } from "./wallets.query";

export const walletSearchSchema = selectWalletSchema1
  .pick(walletSearchQuery.pick)
  .partial();
