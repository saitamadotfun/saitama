import type { z } from "zod";
import { and, eq, SQL } from "drizzle-orm";

import { apps } from "../../db/schema";
import type { Database } from "../../db";
import type {
  insertAppSchema,
  selectAppSchema,
  selectUserSchema,
} from "../../db/zod";

export const createApp = (
  db: Database,
  values: z.infer<typeof insertAppSchema>
) => db.insert(apps).values(values).returning().execute();

export const getAppsByUserWhere = <T extends SQL<unknown>>(
  db: Database,
  user: z.infer<typeof selectUserSchema>["id"],
  where?: T
) =>
  db.query.apps
    .findMany({
      where: and(eq(apps.user, user), where),
      columns: {
        user: false,
      },
    })
    .execute();

export const getAppByUserAndId = (
  db: Database,
  user: z.infer<typeof selectUserSchema>["id"],
  id: z.infer<typeof selectAppSchema>["id"]
) =>
  db.query.apps.findFirst({
    where: and(eq(apps.id, id), eq(apps.user, user)),
  });

export const updateAppByUserAndId = (
  db: Database,
  user: z.infer<typeof selectUserSchema>["id"],
  id: z.infer<typeof selectAppSchema>["id"],
  values: Partial<z.infer<typeof insertAppSchema>>
) =>
  db
    .update(apps)
    .set(values)
    .where(and(eq(apps.id, id), eq(apps.user, user)))
    .returning()
    .execute();

export const deleteAppByUserAndId = (
  db: Database,
  user: z.infer<typeof selectUserSchema>["id"],
  id: z.infer<typeof selectAppSchema>["id"]
) =>
  db
    .delete(apps)
    .where(and(eq(apps.id, id), eq(apps.user, user)))
    .returning()
    .execute();
