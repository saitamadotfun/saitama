import { array, boolean, literal, number, object, string } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  users,
  templates,
  sites,
  domains,
  assets,
  deployments,
  collections,
  tokens,
  subscriptions,
} from "./schema";
import { payments } from "./schema/payments";
import { members } from "./schema/members";
import { workspaces } from "./schema/workspaces";

export const userMetadataSchema = object({
  bumfiCustomer: object({ id: string() }).nullable(),
}).passthrough();

export const selectUserSchema = createSelectSchema(users, {
  metadata: userMetadataSchema.nullable(),
});
export const insertUserSchema = createInsertSchema(users, {
  avatar: (column) => column.avatar.url(),
  metadata: userMetadataSchema,
}).omit({ id: true });

export const priceSchema = object({
  amount: number(),
  currency: literal("EUR").or(literal("USD")),
});

export const templateMetadataSchema = object({
  repo: string(),
  type: literal("github"),
  framework: literal("nextjs"),
  tags: array(string()),
  categories: array(string()),
  previewURL: string().nullable().optional(),
  bumfiPaymentLink: object({ id: string() }).nullable().optional(),
});

export const selectTemplateSchema = createSelectSchema(templates, {
  price: priceSchema,
  metadata: templateMetadataSchema,
});
export const insertTemplateSchema = createInsertSchema(templates, {
  price: priceSchema,
  metadata: templateMetadataSchema,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const workspaceSettingsSchema = object({
  restrictEdit: boolean(),
  enableInviteLink: boolean(),
  openEditor: literal("everyone"),
  members: object({ joinAsEditor: boolean(), joinOnlyWithGmail: boolean() }),
});
export const selectWorkspaceSchema = createSelectSchema(workspaces, {
  settings: workspaceSettingsSchema,
});
export const insertWorkspaceSchema = createInsertSchema(workspaces, {
  settings: workspaceSettingsSchema.nullable(),
}).omit({
  id: true,
  token: true,
  subscription: true,
  createdAt: true,
  updatedAt: true,
});

export const selectMemberSchema = createSelectSchema(members);
export const insertMemberSchema = createInsertSchema(members).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const siteMetadataSchema = object({
  vercelProjectId: string(),
  vercelProjectURL: string(),
}).passthrough();

export const selectSiteSchema = createSelectSchema(sites, {
  metadata: siteMetadataSchema.partial(),
});
export const insertSiteSchema = createInsertSchema(sites, {
  metadata: siteMetadataSchema.partial(),
}).omit({
  id: true,
  payment: true,
  sync: true,
  createdAt: true,
  updatedAt: true,
});

export const selectDomainSchema = createSelectSchema(domains);
export const insertDomainSchema = createInsertSchema(domains, {
  verification: array(
    object({
      domain: string(),
      reason: string(),
      type: string(),
      value: string(),
    })
  ).nullable(),
}).omit({
  id: true,
  site: true,
  createdAt: true,
  updatedAt: true,
});

export const selectPaymentSchema = createSelectSchema(payments);
export const insertPaymentSchema = createInsertSchema(payments).omit({
  createdAt: true,
  updatedAt: true,
});

export const selectSubscriptionSchema = createSelectSchema(subscriptions);
export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectAssetSchema = createSelectSchema(assets);
export const insertAssetSchema = createInsertSchema(assets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectDeploymentSchema = createSelectSchema(deployments);
export const insertDeploymentSchema = createInsertSchema(deployments).omit({
  createdAt: true,
  updatedAt: true,
});

export const selectCollectionSchema = createSelectSchema(collections);
export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectTokenSchema = createSelectSchema(tokens);
export const insertTokenSchema = createInsertSchema(tokens).omit({
  id: true,
  key: true,
  createdAt: true,
  updatedAt: true,
});
