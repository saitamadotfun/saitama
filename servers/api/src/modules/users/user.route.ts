import passport from "@fastify/passport";
import type { FastifyRequest } from "fastify";

import { Route } from "../../core/route";
import { insertUserSchema } from "../../db/zod";

import type { User } from "./user.module";
import { catchRuntimeRouteError, StatusError } from "../../core/error";

export class UserRoute extends Route<User> {
  protected readonly path = "users";

  readonly registerRoutes = () => {
    this.fastify
      .route({
        method: "GET",
        url: this.buildPath(":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.getUser.bind(this)),
      })
      .route({
        method: "PATCH",
        url: this.buildPath(":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.updateUserRoute.bind(this)),
      })
      .route({
        method: "DELETE",
        url: this.buildPath(":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.deleteUserRoute.bind(this)),
      });
  };

  private async getUser(request: FastifyRequest) {
    const user = await this.module.getUserById(request.user!.id);
    if (user) return user;
    throw new StatusError(404, { message: "user not found" });
  }

  private updateUserRoute(
    request: FastifyRequest<{
      Body: Omit<Partial<Zod.infer<typeof insertUserSchema>>, "uuid">;
    }>
  ) {
    return insertUserSchema
      .omit({ uuid: true })
      .partial()
      .parseAsync(request.body)
      .then(async (body) => {
        const [user] = await this.module.updateUserById(request.user!.id, body);
        if (user) return user;
        throw new StatusError(404, { message: "user not found" });
      });
  }

  private async deleteUserRoute(request: FastifyRequest) {
    const [user] = await this.module.deleteUserById(request.user!.id);
    if (user) return user;
    throw new StatusError(404, { message: "user not found" });
  }
}
