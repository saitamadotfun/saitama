import { and, eq, or } from "drizzle-orm";
import type { Database } from "../../db";
import type {
  insertDomainSchema,
  selectDomainSchema,
  selectUserSchema,
} from "../../db/zod";
import { domains } from "../../db/schema";

export const getDomainByUserAndId = (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectDomainSchema>["id"]
) =>
  database.query.domains.findFirst({
    where: and(eq(domains.user, user), eq(domains.id, id)),
    with: {
      site: {
        columns: {
          metadata: true,
        },
      },
    },
    columns: {
      id: true,
      origin: true,
    },
  });

export const getDomainsByUser = (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"]
) =>
  database.query.domains.findMany({ where: eq(domains.user, user) }).execute();

export const updateDomainByUserAndId = (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectDomainSchema>["id"],
  values: Partial<Zod.infer<typeof insertDomainSchema>>
) =>
  database
    .update(domains)
    .set(values)
    .where(and(eq(domains.user, user), eq(domains.id, id)))
    .returning()
    .execute();

export const deleteDomainByUserAndId = (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectDomainSchema>["id"]
) =>
  database
    .delete(domains)
    .where(and(eq(domains.user, user), eq(domains.id, id)))
    .returning()
    .execute();

export const domainsExist = (database: Database, ...values: string[]) => {
  return database
    .select({
      id: domains.id,
      origin: domains.origin,
    })
    .from(domains)
    .where(or(...values.map((value) => eq(domains.origin, value))));
};
