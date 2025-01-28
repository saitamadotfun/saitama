import { eq } from "drizzle-orm";
import type {
  insertCollectionSchema,
  selectCollectionSchema,
} from "../../db/zod";
import type { Database } from "../../db";
import { collections } from "../../db/schema";

export const createCollection = (
  database: Database,
  values: Zod.infer<typeof insertCollectionSchema>
) => database.insert(collections).values(values).returning().execute();

export const getCollectionById = (
  database: Database,
  id: Zod.infer<typeof selectCollectionSchema>["id"]
) =>
  database.query.collections
    .findFirst({
      where: eq(collections.id, id),
    })
    .execute();

export const updateCollectionById = (
  database: Database,
  id: Zod.infer<typeof selectCollectionSchema>["id"],
  values: Partial<Zod.infer<typeof insertCollectionSchema>>
) =>
  database
    .update(collections)
    .set(values)
    .where(eq(collections.id, id))
    .returning()
    .execute();
