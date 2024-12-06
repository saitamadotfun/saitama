import { pgTable, json, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const assets = pgTable("assets", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  uri: text().notNull(),
  type: text({ enum: ["image", "all", "non-image"] as const }).notNull(),
  user: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  metadata: json().default({}).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
