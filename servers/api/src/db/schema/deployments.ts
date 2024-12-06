import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { sites } from "./sites";

export const deployments = pgTable("deployments", {
  id: text().primaryKey().notNull(),
  site: uuid()
    .references(() => sites.id)
    .notNull()
    .unique(),
  status: text({
    enum: ["CANCELED", "ERROR", "QUEUED", "BUILDING", "INITIALIZING", "READY"],
  })
    .default("INITIALIZING")
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
