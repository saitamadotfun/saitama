import { eq } from "drizzle-orm";
import type { Database } from "../../db";
import { payments } from "../../db/schema";
import type { insertPaymentSchema, selectPaymentSchema } from "../../db/zod";

export const createPayment = (
  database: Database,
  values: Zod.infer<typeof insertPaymentSchema>
) =>
  database
    .insert(payments)
    .values(values)
    .onConflictDoNothing()
    .returning()
    .execute();

export const getPaymentById = (
  database: Database,
  id: Zod.infer<typeof selectPaymentSchema>["id"]
) =>
  database.query.payments.findFirst({ where: eq(payments.id, id) }).execute();

export const updatePaymentById = (
  database: Database,
  id: Zod.infer<typeof selectPaymentSchema>["id"],
  values: Partial<Zod.infer<typeof insertPaymentSchema>>
) =>
  database
    .update(payments)
    .set(values)
    .where(eq(payments.id, id))
    .returning()
    .execute();

export const deletePaymentById = (
  database: Database,
  id: Zod.infer<typeof selectPaymentSchema>["id"]
) => database.delete(payments).where(eq(payments.id, id)).returning().execute();
