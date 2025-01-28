import { eq } from "drizzle-orm";
import { Strategy } from "passport-custom";

import type { Database } from "../../db";
import { tokens, users, workspaces } from "../../db/schema";

export const TokenStrategy = (database: Database) => {
  return new Strategy(async (request, callback) => {
    if (request.headers.authorization) {
      const [, value] = request.headers.authorization?.split(" ");
      if (value) {
        const token = await database.query.tokens.findFirst({
          where: eq(tokens.key, value),
        });

        if (token) {
          let user = await database.query.users.findFirst({
            where: eq(users.token, token.id),
            columns: {
              id: true,
            },
          });

          if (user) return callback(null, user);
          else {
            const workspace = await database.query.workspaces.findFirst({
              where: eq(workspaces.token, token.id),
              with: {
                owner: true,
              },
              columns: {
                owner: true,
              },
            });

            if (workspace) return callback(null, workspace.owner);
          }
        }
      }

      return callback(new Error("not authorized"), null);
    }
  });
};
