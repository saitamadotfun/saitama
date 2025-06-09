import { selectCoinSchema } from "../../db/zod";
import { coinSearchQuery } from "./coins.query";

export const coinSearchSchema = selectCoinSchema
  .pick(coinSearchQuery.pick)
  .partial();
