import { eq } from "drizzle-orm";
import type { Database } from "../../db";
import { tokens, users } from "../../db/schema";
import type { insertUserSchema, selectUserSchema } from "../../db/zod";

export const createUser = async (
  database: Database,
  values: Zod.infer<typeof insertUserSchema>
) => {
  const [token] = await database
    .insert(tokens)
    .values({})
    .returning({ id: tokens.id })
    .execute();
  return database
    .insert(users)
    .values({ ...values, token: token.id })
    .returning()
    .execute();
};

export const getUserById = (
  database: Database,
  id: Zod.infer<typeof selectUserSchema>["id"]
) => database.query.users.findFirst({ where: eq(users.id, id) }).execute();

export const updateUserById = (
  database: Database,
  id: Zod.infer<typeof selectUserSchema>["id"],
  values: Omit<Partial<Zod.infer<typeof insertUserSchema>>, "id">
) =>
  database
    .update(users)
    .set(values)
    .where(eq(users.id, id))
    .returning()
    .execute();

export const deleteUserById = (
  database: Database,
  id: Zod.infer<typeof selectUserSchema>["id"]
) => database.delete(users).where(eq(users.id, id)).returning().execute();
