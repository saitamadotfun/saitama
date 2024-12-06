import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { PaymentStatus } from "../../lib/bumfi/models";

export const subscriptions = pgTable("subscription", {
  id: uuid().defaultRandom().primaryKey(),
  status: text({
    enum: Object.keys(PaymentStatus) as ["Idle", keyof typeof PaymentStatus],
  })
    .default("Idle")
    .notNull(),
  createdAt: timestamp(),
  updatedAt: timestamp(),
});
