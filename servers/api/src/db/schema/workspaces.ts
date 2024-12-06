import { pgTable, text, timestamp, uuid, json } from "drizzle-orm/pg-core";

import { users } from "./users";
import { tokens } from "./tokens";
import { subscriptions } from "./subscriptions";
import { assets } from "./assets";

export type WorkspaceSettings = {
  enableInviteLink: boolean;
  members: {
    joinAsEditor: boolean;
    joinOnlyWithGmail: boolean;
  };
  restrictEdit: boolean;
  openEditor: "everyone" | "members" | "gmail-users";
};

export const workspaces = pgTable("workspaces", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text().notNull(),
  logo: uuid().references(() => assets.id),
  owner: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  settings: json()
    .$type<WorkspaceSettings>()
    .default({
      enableInviteLink: true,
      members: {
        joinAsEditor: false,
        joinOnlyWithGmail: false,
      },
      openEditor: "everyone",
      restrictEdit: true,
    }),
  subscription: uuid().references(() => subscriptions.id, {
    onDelete: "set null",
  }),
  token: uuid()
    .references(() => tokens.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
