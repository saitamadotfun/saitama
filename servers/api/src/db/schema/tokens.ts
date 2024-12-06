import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const tokens = pgTable("tokens", {
  id: uuid().defaultRandom().primaryKey(),
  key: text()
    .$defaultFn(() => Buffer.from(crypto.randomUUID()).toString("base64"))
    .unique()
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
