import { eq } from "drizzle-orm";
import { Strategy } from "passport-custom";

import type { Database } from "../../db";
import { tokens, users } from "../../db/schema";

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
        }
      }

      return callback(new Error("not authorized"), null);
    }
  });
};
