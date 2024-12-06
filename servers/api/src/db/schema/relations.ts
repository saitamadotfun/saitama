import { relations } from "drizzle-orm";
import { sites } from "./sites";
import { users } from "./users";
import { members } from "./members";
import { assets } from "./assets";
import { tokens } from "./tokens";
import { domains } from "./domains";
import { payments } from "./payments";
import { templates } from "./templates";
import { workspaces } from "./workspaces";
import { deployments } from "./deployments";
import { collections } from "./collections";
import { subscriptions } from "./subscriptions";

export const userRelations = relations(users, ({ many, one }) => ({
  token: one(tokens, { fields: [users.token], references: [tokens.id] }),
}));

export const templateRelations = relations(templates, ({ one }) => ({
  user: one(users, { fields: [templates.user], references: [users.id] }),
  preview: one(assets, {
    fields: [templates.preview],
    references: [assets.id],
  }),
}));

export const workspaceRelations = relations(workspaces, ({ one, many }) => ({
  sites: many(sites),
  members: many(members),
  logo: one(assets, { fields: [workspaces.logo], references: [assets.id] }),
  token: one(tokens, { fields: [workspaces.token], references: [tokens.id] }),
  subscription: one(subscriptions, {
    fields: [workspaces.subscription],
    references: [subscriptions.id],
  }),
  owner: one(users, { fields: [workspaces.owner], references: [users.id] }),
}));

export const memberRelatons = relations(members, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [members.workspace],
    references: [workspaces.id],
  }),
  user: one(users, { fields: [members.user], references: [users.id] }),
}));

export const siteRelations = relations(sites, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [sites.workspace],
    references: [workspaces.id],
  }),
  template: one(templates, {
    fields: [sites.template],
    references: [templates.id],
  }),
  payment: one(payments, {
    fields: [sites.payment],
    references: [payments.id],
  }),
  sync: one(collections, {
    fields: [sites.sync],
    references: [collections.id],
  }),
  domains: many(domains),
  deployments: many(deployments),
}));

export const domainRelations = relations(domains, ({ one }) => ({
  site: one(sites, {
    fields: [domains.site],
    references: [sites.id],
  }),
}));

export const deploymentRelations = relations(deployments, ({ one }) => ({
  site: one(sites, { fields: [deployments.site], references: [sites.id] }),
}));

export const assetRelations = relations(assets, ({ one }) => ({
  user: one(users, { fields: [assets.user], references: [users.id] }),
}));
