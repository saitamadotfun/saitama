import { and, eq } from "drizzle-orm";
import type { Database } from "../../db";
import { members } from "../../db/schema/members";
import type {
  insertMemberSchema,
  selectMemberSchema,
  selectWorkspaceSchema,
} from "../../db/zod";

export const createMember = (
  database: Database,
  values: Zod.infer<typeof insertMemberSchema>
) =>
  database
    .insert(members)
    .values(values)
    .onConflictDoNothing({ target: [members.workspace, members.user] })
    .returning()
    .execute();

export const updateMemberByWorkspaceAndId = (
  database: Database,
  workspace: Zod.infer<typeof selectWorkspaceSchema>["id"],
  id: Zod.infer<typeof selectMemberSchema>["id"],
  values: Partial<Zod.infer<typeof insertMemberSchema>>
) =>
  database
    .update(members)
    .set(values)
    .where(and(eq(members.workspace, workspace), eq(members.id, id)))
    .returning()
    .execute();

export const deleteMemberByWorkspaceAndId = (
  database: Database,
  workspace: Zod.infer<typeof selectWorkspaceSchema>["id"],
  id: Zod.infer<typeof selectMemberSchema>["id"]
) =>
  database
    .delete(members)
    .where(and(eq(members.workspace, workspace), eq(members.id, id)))
    .returning()
    .execute();
