import { json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { type Framework } from "../../lib";
import type { Price } from "../../types";

import { users } from "./users";
import { assets } from "./assets";
import type { PaymentLink } from "../../lib/bumfi/models";

export type TemplateMetadata = {
  repo: string;
  type: "github";
  framework: Framework;
  tags: string[];
  categories: string[];
  previewURL?: string | null;
  bumfiPaymentLink?: Pick<PaymentLink, "id"> | null;
};

export const templates = pgTable("templates", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull().unique(),
  description: text().notNull(),
  preview: uuid()
    .references(() => assets.id, { onDelete: "restrict", onUpdate: "cascade" })
    .notNull(),
  price: json().$type<Price>(),
  metadata: json().$type<TemplateMetadata>().notNull(),
  user: uuid()
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
