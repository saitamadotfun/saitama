import passport from "@fastify/passport";
import type { FastifyRequest } from "fastify";

import { Route } from "../../core/route";
import { catchRuntimeRouteError, StatusError } from "../../core/error";
import { insertMemberSchema, selectMemberSchema } from "../../db/zod";

import type { Member } from "./member.module";

export class MemberRoute extends Route<Member> {
  protected readonly path = "members";

  readonly registerRoutes = () => {
    this.fastify
      .route({
        method: "POST",
        url: this.buildPath(":workspace", ":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.updateMemberRoute.bind(this)),
      })
      .route({
        method: "DELETE",
        url: this.buildPath(":workspace", ":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.deleteMemberRoute.bind(this)),
      });
  };

  private updateMemberRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectMemberSchema>, "id" | "workspace">;
      Body: Partial<Zod.infer<typeof insertMemberSchema>>;
    }>
  ) {
    return selectMemberSchema
      .pick({ id: true, workspace: true })
      .parseAsync(request.params)
      .then(async (params) =>
        insertMemberSchema
          .omit({ user: true })
          .parseAsync(request.body)
          .then(async (body) => {
            const [member] = await this.module.updateMemberByWorkspaceAndId(
              params.workspace,
              params.id,
              body
            );

            if (member) return member;

            throw new StatusError(404, { message: "member not found" });
          })
      );
  }

  private deleteMemberRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectMemberSchema>, "id" | "workspace">;
    }>
  ) {
    return selectMemberSchema
      .pick({ id: true, workspace: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const [member] = await this.module.deleteMemberByWorkspaceAndId(
          params.workspace,
          params.id
        );

        if (member) return member;

        throw new StatusError(404, { message: "member not found" });
      });
  }
}
