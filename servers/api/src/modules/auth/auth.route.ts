import jwt from "jsonwebtoken";
import { Secret } from "@saitamadotfun/utils";
import { type FastifyReply, type FastifyRequest } from "fastify";

import { Route } from "../../core/route";
import { StatusError } from "../../core/error";

import { SECRET_KEY } from "../../config";
import { selectUserSchema } from "../../db/zod";
import { getSiteByUserAndId } from "../sites/site.controller";
import { getWorkspaceByOwnerAndId } from "../workspaces/workspace.controller";

import type { Auth } from "./auth.module";
import {
  signInWithIdTokenQuerySchema,
  signInWithIdTokenSchema,
} from "./auth.schema";

export class AuthRoute extends Route<Auth> {
  protected readonly path = "auth";

  readonly registerRoutes = () => {
    this.fastify.route({
      method: "POST",
      url: this.buildPath("idToken"),
      handler: this.signInWithIdTokenRoute.bind(this),
    });
  };

  private signInWithIdTokenRoute(
    request: FastifyRequest<{
      Body: Zod.infer<typeof signInWithIdTokenSchema>;
      Querystring: Zod.infer<typeof signInWithIdTokenQuerySchema>;
    }>,
    reply: FastifyReply
  ) {
    return signInWithIdTokenSchema
      .parseAsync(request.body)
      .then(async (body) => {
        let user = await this.module.signInWithIdToken(body.idToken);
        if (!user.metadata?.bumfiCustomer) {
          const {
            data: { data },
          } = await this.module.bumfi.customer.create({
            customer_ident: user.id,
            email: user.email,
            name: user.firstName
              ? user.firstName
              : user.lastName
              ? user.lastName
              : undefined,
          });

          await this.module.user.updateUserById(user.id, {
            metadata: { ...user.metadata, bumfiCustomer: { id: data.id } },
          });
        }

        const token = jwt.sign({ id: user.id, uuid: user.uuid }, SECRET_KEY);
        request.session.set("auth.token", token);

        const { data: query } =
          await signInWithIdTokenQuerySchema.safeParseAsync(request.query);

        if (query && query.siteId) {
          const site = await getSiteByUserAndId(
            this.module.database,
            user.id,
            query.siteId
          );

          if (site && site.workspace) {
            const workspace = await getWorkspaceByOwnerAndId(
              this.module.database,
              user.id,
              site.workspace
            );

            if (workspace && workspace.token) {
              const secret = new Secret(workspace.token.key);
              const authToken = await secret.encrypt(user.token.key);

              return reply
                .send({
                  user: selectUserSchema
                    .omit({ token: true, metadata: true })
                    .partial()
                    .parse(user),
                  token,
                  authToken,
                })
                .cookie("auth.token", token, { signed: true });
            }
          }

          throw new StatusError(401, { message: "workspace unauthorized" });
        }

        return reply
          .send({
            user: selectUserSchema
              .omit({ token: true, metadata: true })
              .partial()
              .parse(user),
            token,
          })
          .cookie("auth.token", token, { signed: true });
      });
  }
}
