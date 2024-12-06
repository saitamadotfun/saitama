import type { Partial } from "@saitamadotfun/types";
import { categories } from "@saitamadotfun/sdk/constants";
import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
  unique,
} from "drizzle-orm/pg-core";

import { payments } from "./payments";
import { templates } from "./templates";
import { workspaces } from "./workspaces";
import { collections } from "./collections";

export type SiteMetadata = {
  tags: string[];
  title: string;
  description: string;
  categories: string[];
  vercelProjectId: string;
  vercelProjectURL: string;
  settings: {
    favicon: {
      lightTheme: string;
      darkTheme: string;
    };
    socialPreview: string;
    appleTouchIcon: string;
  };
  customCode: {
    startOfHead: string;
    endOfHead: string;
    startOfBody: string;
    endOfBody: string;
  };
};

export const sites = pgTable(
  "sites",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    category: text({ enum: categories }).notNull(),
    template: uuid()
      .references(() => templates.id)
      .notNull(),
    payment: text().references(() => payments.id, { onDelete: "set null" }),
    workspace: uuid()
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    sync: uuid()
      .references(() => collections.id)
      .notNull(),
    deleted: boolean().default(false).notNull(),
    metadata: json().$type<Partial<SiteMetadata>>().notNull(),
    deletedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => ({
    payment: uniqueIndex().on(table.payment.nullsFirst()),
  })
);
