import { and, eq, or } from "drizzle-orm";
import { getAuth } from "firebase-admin/auth";

import { users } from "../../db/schema";
import type { Database } from "../../db";
import { workspaces } from "../../db/schema/workspaces";
import type {
  insertWorkspaceSchema,
  selectUserSchema,
  selectWorkspaceSchema,
} from "../../db/zod";

import { firebaseApp } from "../..";
import { createUser } from "../users/user.controller";
import { createToken } from "../tokens/token.controller";
import { createMember } from "../members/member.controller";

export const createWorkspace = async (
  database: Database,
  values: Zod.infer<typeof insertWorkspaceSchema>
) => {
  const [token] = await createToken(database);
  const [workspace] = await database
    .insert(workspaces)
    .values({ ...values, token: token.id })
    .returning()
    .execute();
  await createMember(database, {
    user: values.owner,
    workspace: workspace.id,
    role: "admin",
  });

  return getWorkspaceByOwnerAndId(database, workspace.owner, workspace.id);
};

export const getWorkspacesByOwner = (
  database: Database,
  owner: Zod.infer<typeof selectUserSchema>["id"]
) =>
  database.query.workspaces.findMany({
    where: eq(workspaces.owner, owner),
    with: { members: { with: { user: true } }, logo: true },
  });

export const getWorkspaceByOwnerAndId = (
  database: Database,
  owner: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectWorkspaceSchema>["id"]
) =>
  database.query.workspaces.findFirst({
    where: and(eq(workspaces.owner, owner), eq(workspaces.id, id)),
    with: {
      token: true,
      logo: true,
      subscription: true,
      members: {
        with: { user: true },
      },
    },
    columns: {
      id: true,
      name: true,
      owner: true,
      settings: true,
      createdAt: true,
      updatedAt: true,
    },
  });

export const updateWorkspaceByOwnerAndId = (
  database: Database,
  owner: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectWorkspaceSchema>["id"],
  values: Partial<Zod.infer<typeof insertWorkspaceSchema>>
) =>
  database
    .update(workspaces)
    .set(values)
    .where(and(eq(workspaces.owner, owner), eq(workspaces.id, id)))
    .returning({ id: workspaces.id })
    .execute();

export const deleteWorkspaceByOwnerAndId = (
  database: Database,
  owner: Zod.infer<typeof selectUserSchema>["id"],
  id: Zod.infer<typeof selectWorkspaceSchema>["id"]
) =>
  database
    .delete(workspaces)
    .where(and(eq(workspaces.owner, owner), eq(workspaces.id, id)))
    .returning()
    .execute();

export const createWorkspaceMemberByWorkspaceAndEmails = async (
  database: Database,
  workspace: Zod.infer<typeof selectWorkspaceSchema>["id"],
  emails: string[]
) => {
  const existingUser = await database.query.users.findMany({
    where: or(...emails.map((email) => eq(users.email, email))),
  });

  const nonExistingUser = emails.filter(
    (email) => !existingUser.find((user) => user.email === email)
  );

  const firebaseUsers = await Promise.all(
    nonExistingUser.map((email) =>
      getAuth(firebaseApp)
        .createUser({ email, emailVerified: false })
        .catch((error) => {
          console.error(error);
          return null;
        })
    )
  );

  const newUsers = (
    await Promise.all(
      (
        firebaseUsers.filter(Boolean) as unknown as Exclude<
          (typeof firebaseUsers)[number],
          null
        >[]
      ).flatMap(async (firebaseUser) => {
        const [token] = await createToken(database);
        return createUser(database, {
          uuid: firebaseUser.uid,
          email: firebaseUser.email!,
          token: token.id,
          metadata: { bumfiCustomer: null },
        });
      })
    )
  ).flat();

  const invites = [...existingUser, ...newUsers];

  return (
    await Promise.all(
      invites.map((invite) =>
        createMember(database, { workspace, user: invite.id })
      )
    )
  ).flat();
};
