import { eq } from "drizzle-orm";
import type { Database } from "../../db";
import { subscriptions } from "../../db/schema";
import type {
  insertSubscriptionSchema,
  selectSubscriptionSchema,
} from "../../db/zod";

export const createSubscription = (
  database: Database,
  values: Zod.infer<typeof insertSubscriptionSchema>
) =>
  database
    .insert(subscriptions)
    .values(values)
    .returning()
    .onConflictDoNothing()
    .execute();

export const updateSubscriptionById = (
  database: Database,
  id: Zod.infer<typeof selectSubscriptionSchema>["id"],
  values: Partial<Zod.infer<typeof insertSubscriptionSchema>>
) =>
  database
    .update(subscriptions)
    .set(values)
    .where(eq(subscriptions.id, id))
    .returning()
    .execute();

export const deleteSubscriptionById = (
  database: Database,
  id: Zod.infer<typeof selectSubscriptionSchema>["id"]
) =>
  database
    .delete(subscriptions)
    .where(eq(subscriptions.id, id))
    .returning()
    .execute();
