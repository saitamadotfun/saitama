import { eq } from "drizzle-orm";

import type { Database } from "../../db";
import { deployments } from "../../db/schema";
import type {
  insertDeploymentSchema,
  selectDeploymentSchema,
} from "../../db/zod";

export const createDeployment = (
  database: Database,
  values: Zod.infer<typeof insertDeploymentSchema>
) => database.insert(deployments).values(values).returning().execute();

export const getDeploymentById = (
  database: Database,
  id: Zod.infer<typeof selectDeploymentSchema>["id"]
) => database.query.deployments.findFirst({ where: eq(deployments.id, id) });

export const updateDeploymentById = (
  database: Database,
  id: Zod.infer<typeof insertDeploymentSchema>["id"],
  values: Partial<Zod.infer<typeof insertDeploymentSchema>>
) =>
  database
    .update(deployments)
    .set(values)
    .where(eq(deployments.id, id))
    .returning()
    .execute();
