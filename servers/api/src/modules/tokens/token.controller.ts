import { eq } from "drizzle-orm";
import type { Database } from "../../db";
import { tokens } from "../../db/schema";
import type { insertTokenSchema, selectTokenSchema } from "../../db/zod";

export const createToken = (
  database: Database,
  values: Zod.infer<typeof insertTokenSchema> = {}
) => database.insert(tokens).values(values).returning().execute();

export const getTokenById = (
  database: Database,
  id: Zod.infer<typeof selectTokenSchema>["id"]
) => database.select().from(tokens).where(eq(tokens.id, id)).execute();
