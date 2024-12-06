import { json, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
    id: uuid().defaultRandom().primaryKey(),
    document: json().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
})