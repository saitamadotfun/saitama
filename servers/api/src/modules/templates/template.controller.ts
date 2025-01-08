import { and, eq } from "drizzle-orm";
import type { Database } from "../../db";
import { templates } from "../../db/schema";
import type {
  insertTemplateSchema,
  selectTemplateSchema,
  selectUserSchema,
} from "../../db/zod";

export const createTemplate = async (
  database: Database,
  values: Zod.infer<typeof insertTemplateSchema>
) => {
  const [template] = await database
    .insert(templates)
    .values(values)
    .returning()
    .execute();

  return getTemplateById(database, template.id);
};

export const getTemplates = (database: Database) =>
  database.query.templates.findMany({
    with: {
      user: {
        columns: {
          id: true,
          email: true,
        },
      },
      preview: true,
    },
  });

export const getTemplateById = (
  database: Database,
  id: Zod.infer<typeof selectTemplateSchema>["id"]
) =>
  database.query.templates.findFirst({
    where: eq(templates.id, id),
    with: { preview: true },
  });

export const updateTemplateByUserAndId = (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectTemplateSchema>["id"],
  values: Partial<typeof insertTemplateSchema>
) =>
  database
    .update(templates)
    .set(values)
    .where(and(eq(templates.user, user), eq(templates.id, id)))
    .returning()
    .execute();

export const deleteTemplateByUserAndId = (
  database: Database,
  user: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectTemplateSchema>["id"]
) =>
  database
    .delete(templates)
    .where(and(eq(templates.user, user), eq(templates.id, id)))
    .returning()
    .execute();
