import { selectAppSchema } from "../../db/zod";
import { appSearchQuery } from "./apps.query";

export const appSearchSchema = selectAppSchema
  .pick(appSearchQuery.pick)
  .partial();
