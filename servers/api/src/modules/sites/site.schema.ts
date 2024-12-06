import { insertSiteSchema, insertDomainSchema } from "../../db/zod";

export const insertSiteAndDomainSchema = insertSiteSchema
  .omit({
    metadata: true,
  })
  .and(insertDomainSchema.omit({ user: true, verification: true }));
