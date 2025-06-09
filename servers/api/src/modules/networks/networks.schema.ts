import { selectNetworkSchema } from "../../db/zod";
import { networkSearchQuery } from "./networks.query";

export const networkQuerySchema = selectNetworkSchema
  .pick(networkSearchQuery.pick)
  .partial();
