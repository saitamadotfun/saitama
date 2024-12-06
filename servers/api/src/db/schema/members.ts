import { pgTable, text, timestamp, uuid, unique } from "drizzle-orm/pg-core";
import { users } from "./users";
import { workspaces } from "./workspaces";

export const members = pgTable("members", {
  id: uuid().defaultRandom().primaryKey(),
  workspace: uuid()
    .references(() => workspaces.id, { onDelete: "cascade" })
    .notNull(),
  role: text({ enum: ["editor", "viewer", "admin"] })
    .default("viewer")
    .notNull(),
  user: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
}, (column) => ({
  workspace__user: unique().on(column.workspace, column.user)
}));
