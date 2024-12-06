import { pgTable, text, timestamp, uuid, json } from "drizzle-orm/pg-core";
import { PaymentStatus, type PaymentLink } from "../../lib/bumfi/models";

export const payments = pgTable("payments", {
  id: text().primaryKey(),
  status: text({
    enum: Object.keys(PaymentStatus) as ["Idle", keyof typeof PaymentStatus],
  }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
