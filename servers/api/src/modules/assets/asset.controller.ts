import { and, eq } from "drizzle-orm";
import type { Database } from "../../db";
import { assets } from "../../db/schema";
import type {
  insertAssetSchema,
  selectAssetSchema,
  selectUserSchema,
} from "../../db/zod";

export const createAsset = (
  database: Database,
  values: Zod.infer<typeof insertAssetSchema>
) => database.insert(assets).values(values).returning().execute();

export const getAssetsByUser = (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"]
) =>
  database.query.assets.findMany({
    where: eq(assets.user, user),
  });

export const deleteAssetByUserAndId = (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectAssetSchema>["id"]
) =>
  database
    .delete(assets)
    .where(and(eq(assets.user, user), eq(assets.id, id)))
    .returning()
    .execute();
