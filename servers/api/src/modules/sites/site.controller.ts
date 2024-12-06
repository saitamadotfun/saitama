import { and, eq, SQL, or } from "drizzle-orm";
import type { Database } from "../../db";
import { collections, domains, sites, workspaces } from "../../db/schema";
import type {
  insertDomainSchema,
  insertSiteSchema,
  selectSiteSchema,
  selectUserSchema,
} from "../../db/zod";

export const safeColumn = {
  id: sites.id,
  name: sites.name,
  category: sites.category,
} as const;

export const columns = {
  id: true,
  name: true,
  category: true,
  description: true,
  sync: true,
  metadata: true,
  workspace: true,
  deleted: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const createSite = async (
  database: Database,
  values: Zod.infer<typeof insertSiteSchema> &
    Zod.infer<typeof insertDomainSchema>,
  id?: string
) => {
  const [collection] = await database
    .insert(collections)
    .values({ document: {} })
    .returning()
    .execute();

  const [site] = await database
    .insert(sites)
    .values({ ...values, id, sync: collection.id, payment: null })
    .returning()
    .execute();

  const [domain] = await database
    .insert(domains)
    .values({ ...values, site: site.id })
    .returning()
    .execute();

  return { ...site, domains: [domain] };
};

export const getSitesByUser = async (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  where?: SQL
) => {
  const userWorkspaces = await database
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.owner, user))
    .execute();
  return database.query.sites
    .findMany({
      where: and(
        where,
        or(
          ...userWorkspaces.map((workspace) =>
            eq(sites.workspace, workspace.id)
          )
        )
      ),
      with: {
        domains: {
          columns: {
            id: true,
            origin: true,
            verified: true,
            verification: true,
          },
        },
        template: {
          with: {
            preview: true,
          }
        },
        deployments: true,
        payment: true,
      },
      columns,
    })
    .execute();
};

export const getSiteByUserAndId = async (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  site: Zod.infer<typeof selectSiteSchema>["id"]
) => {
  const userWorkspaces = await database
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.owner, user))
    .execute();

  return database.query.sites
    .findFirst({
      where: or(
        ...userWorkspaces.map((workspace) => eq(sites.workspace, workspace.id))
      ),
      with: {
        domains: {
          columns: {
            id: true,
            origin: true,
            verified: true,
            verification: true,
          },
        },
        template: {
          with: {
            preview: true,
          }
        },
        deployments: true,
        payment: true,
      },
      columns,
    })
    .execute();
};

export const updateSiteByUserAndId = async (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  site: Zod.infer<typeof selectSiteSchema>["id"],
  values: Omit<Partial<Zod.infer<typeof insertSiteSchema>>, "user" | "template">
) => {
  const userWorkspaces = await database
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.owner, user))
    .execute();
  const [updatedSite] = await database
    .update(sites)
    .set(values)
    .where(
      and(
        eq(sites.id, site),
        or(
          ...userWorkspaces.map((workspace) =>
            eq(sites.workspace, workspace.id)
          )
        )
      )
    )
    .returning({ id: sites.id })
    .execute();

  return getSiteByUserAndId(database, user, updatedSite.id);
};

export const deleteSiteByUserAndId = async (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  site: Zod.infer<typeof selectSiteSchema>["id"]
) => {
  const userWorkspaces = await database
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.owner, user))
    .execute();

  return database
    .delete(sites)
    .where(
      and(
        eq(sites.id, site),
        or(
          ...userWorkspaces.map((workspace) =>
            eq(sites.workspace, workspace.id)
          )
        )
      )
    )
    .returning(safeColumn)
    .execute();
};

export const updateSiteByVercelProjectId = (
  database: Database,
  id: Zod.infer<typeof selectSiteSchema>["metadata"]["vercelProjectId"],
  values: Partial<Zod.infer<typeof insertSiteSchema>>
) =>
  database
    .update(sites)
    .set(values)
    .where(eq(sites.metadata, id))
    .returning()
    .execute();

export const deleteSiteByVercelProjectId = (
  database: Database,
  id: Zod.infer<typeof selectSiteSchema>["metadata"]["vercelProjectId"]
) => database.delete(sites).where(eq(sites.metadata, id)).returning().execute();
