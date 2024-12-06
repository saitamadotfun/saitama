import { pgTable, text, uuid, json, boolean } from "drizzle-orm/pg-core";

import { tokens } from "./tokens";
import type { Customer } from "../../lib/bumfi/models";

type UserMetadata = {
  bumfiCustomer?: Pick<Customer, "id">;
};

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  avatar: text(),
  firstName: text(),
  lastName: text(),
  uuid: text().unique().notNull(),
  email: text().unique().notNull(),
  metadata: json().$type<UserMetadata>().notNull(),
  admin: boolean().default(false).notNull(),
  token: uuid()
    .references(() => tokens.id)
    .unique()
    .notNull(),
});
