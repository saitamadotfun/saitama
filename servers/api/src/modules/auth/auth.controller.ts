import { eq } from "drizzle-orm";
import admin from "firebase-admin";

import { users } from "../../db/schema";
import type { Database } from "../../db";
import { createToken } from "../tokens/token.controller";
import type { selectTokenSchema, selectUserSchema } from "../../db/zod";

type User = Omit<Zod.infer<typeof selectUserSchema>, "token"> & {
  token: Zod.infer<typeof selectTokenSchema>;
};

export const signInWithIdToken = (
  database: Database,
  idToken: string
): Promise<User & { exist?: boolean }> =>
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedIdToken) => {
      let user = await database.query.users
        .findFirst({
          where: eq(users.uuid, decodedIdToken.uid),
          with: {
            token: true,
          },
        })
        .execute();

      if (user) return { ...user, exist: true } as User;

      const [token] = await createToken(database);

      const [newUser] = await database
        .insert(users)
        .values({
          token: token.id,
          uuid: decodedIdToken.uid,
          email: decodedIdToken.email!,
          metadata: {},
        })
        .returning()
        .execute();

      return { ...newUser, token, exist: false } as User;
    });
