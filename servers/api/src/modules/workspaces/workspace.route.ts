import passport from "@fastify/passport";
import type { FastifyRequest } from "fastify";

import { Route } from "../../core/route";
import { catchRuntimeRouteError, StatusError } from "../../core/error";
import { insertWorkspaceSchema, selectWorkspaceSchema } from "../../db/zod";

import type { Workspace } from "./workspace.module";
import { workspaceInviteMemberSchema } from "./workspace.schema";

export class WorkspaceRoute extends Route<Workspace> {
  protected readonly path = "workspaces";

  readonly registerRoutes = () => {
    this.fastify
      .route({
        method: "POST",
        url: this.buildPath(),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.createWorkspaceRoute.bind(this)),
      })
      .route({
        method: "GET",
        url: this.buildPath(":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.getWorkspaceRoute.bind(this)),
      })
      .route({
        method: "GET",
        url: this.buildPath(),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.getWorkspacesRoute.bind(this)),
      })
      .route({
        method: "PATCH",
        url: this.buildPath(":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.updateWorkspaceRoute.bind(this)),
      })
      .route({
        method: "DELETE",
        url: this.buildPath(":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.deleteWorkspaceRoute.bind(this)),
      })
      .route({
        method: "POST",
        url: this.buildPath(":id", "invites"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(
          this.inviteMembersToWorkspaceRoute.bind(this)
        ),
      });
  };

  private createWorkspaceRoute(
    request: FastifyRequest<{
      Body: Partial<Zod.infer<typeof insertWorkspaceSchema>>;
    }>
  ) {
    return insertWorkspaceSchema
      .omit({ owner: true })
      .parseAsync(request.body)
      .then(async (body) => {
        return this.module.createWorkspace({
          ...body,
          owner: request.user!.id,
        });
      });
  }

  private getWorkspacesRoute(request: FastifyRequest) {
    return this.module.getWorkspacesByOwner(request.user!.id);
  }

  private getWorkspaceRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectWorkspaceSchema>, "id">;
    }>
  ) {
    return selectWorkspaceSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const workspace = await this.module.getWorkspaceByOwnerAndId(
          request.user!.id,
          params.id
        );
        if (workspace) return workspace;
        throw new StatusError(404, { message: "workspace not found" });
      });
  }

  private updateWorkspaceRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectWorkspaceSchema>, "id">;
      Body: Partial<Zod.infer<typeof insertWorkspaceSchema>>;
    }>
  ) {
    return selectWorkspaceSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then((params) =>
        insertWorkspaceSchema
          .omit({ owner: true })
          .partial()
          .parseAsync(request.body)
          .then(async (body) => {
            const [workspace] = await this.module.updateWorkspaceByOwnerAndId(
              request.user!.id,
              params.id,
              body
            );
            if (workspace)
              return this.module.getWorkspaceByOwnerAndId(
                request.user!.id,
                workspace.id
              );

            throw new StatusError(400, { message: "workspace not found" });
          })
      );
  }

  private deleteWorkspaceRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectWorkspaceSchema>, "id">;
    }>
  ) {
    return selectWorkspaceSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const [workspace] = await this.module.deleteWorkspaceByOwnerAndId(
          request.user!.id,
          params.id
        );
        if (workspace) return workspace;

        throw new StatusError(400, { message: "workspace not found" });
      });
  }

  private inviteMembersToWorkspaceRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectWorkspaceSchema>, "id">;
      Body: Zod.infer<typeof workspaceInviteMemberSchema>;
    }>
  ) {
    return selectWorkspaceSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then((params) =>
        workspaceInviteMemberSchema
          .parseAsync(request.body)
          .then((body) =>
            this.module.createWorkspaceMemberByWorkspaceAndEmails(
              params.id,
              body.emails
            )
          )
      );
  }
}
