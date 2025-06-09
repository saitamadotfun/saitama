import { selectUserSchema } from "../../db/zod";

export const userSearchSchema = selectUserSchema.pick({}).partial();
