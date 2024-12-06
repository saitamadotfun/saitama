import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { sites } from "./sites";

export const domains = pgTable(
  "domains",
  {
    id: uuid().defaultRandom().primaryKey(),
    origin: text().unique().notNull(),
    user: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    site: uuid()
      .references(() => sites.id, { onDelete: "cascade" })
      .notNull(),
    verification: json(),
    verified: boolean().default(false).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (columns) => ({
    id__site: unique().on(columns.id, columns.site).nullsNotDistinct(),
  })
);
