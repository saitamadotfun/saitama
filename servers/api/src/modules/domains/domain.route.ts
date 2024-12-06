import passport from "@fastify/passport";
import type { FastifyRequest } from "fastify";

import { Route } from "../../core/route";
import { insertDomainSchema, selectDomainSchema } from "../../db/zod";

import type { Domain } from "./domain.module";
import { checkDomainExistSchema } from "./domain.schema";
import { catchRuntimeRouteError, StatusError } from "../../core/error";

export class DomainRoute extends Route<Domain> {
  protected readonly path = "domains";

  readonly registerRoutes = () => {
    this.fastify
      .route({
        url: this.buildPath("exists"),
        method: "POST",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.checkDomainExistRoute.bind(this)),
      })
      .route({
        url: this.buildPath(),
        method: "GET",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.getDomainsRoute.bind(this)),
      })
      .route({
        url: this.buildPath(":id"),
        method: "PATCH",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.updateDomainRoute.bind(this)),
      })
      .route({
        url: this.buildPath(":id"),
        method: "DELETE",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.deleteDomainRoute.bind(this)),
      })
      .route({
        url: this.buildPath(":id", "verify"),
        method: "POST",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.verifyDomainRoute.bind(this)),
      });
  };

  private checkDomainExistRoute(
    request: FastifyRequest<{ Body: Zod.infer<typeof checkDomainExistSchema> }>
  ) {
    return checkDomainExistSchema
      .parseAsync(request.body)
      .then(async (body) => {
        const domains = await this.module.domainsExist(...body.origins);
        return body.origins.map((origin) => {
          const exist = domains.find((domain) => domain.origin === origin);

          return {
            origin,
            exist: Boolean(exist),
            free: origin.endsWith(".saitama.fun"),
          };
        });
      });
  }

  private getDomainsRoute(request: FastifyRequest) {
    return this.module.getDomainsByUser(request.user!.id);
  }

  private updateDomainRoute(
    request: FastifyRequest<{
      Body: Omit<Zod.infer<typeof insertDomainSchema>, "user">;
      Params: Pick<Zod.infer<typeof selectDomainSchema>, "id">;
    }>
  ) {
    return selectDomainSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) =>
        insertDomainSchema
          .omit({ user: true })
          .parseAsync(request.body)
          .then(async (body) => {
            const [domain] = await this.module.updateDomainByUserAndId(
              request.user!.id,
              params.id,
              body
            );
            if (domain) return domain;

            throw new StatusError(404, { message: "domain not found" });
          })
      );
  }

  private deleteDomainRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectDomainSchema>, "id">;
    }>
  ) {
    return selectDomainSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const [domain] = await this.module.deleteDomainByUserAndId(
          request.user!.id,
          params.id
        );
        if (domain) return domain;

        throw new StatusError(404, { message: "domain not found" });
      });
  }

  private verifyDomainRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectDomainSchema>, "id">;
    }>
  ) {
    return selectDomainSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const domain = await this.module.getDomainByUserAndId(
          request.user!.id,
          params.id
        );
        if (domain) {
          const { verified } = await this.module.vercel.project
            .verifyDomain(domain.site.vercelProjectId, domain.origin)
            .then(({ data }) => data);
          const [updatedDomain] = await this.module.updateDomainByUserAndId(
            request.user!.id,
            domain.id,
            { verified }
          );
          return updatedDomain;
        }

        throw new StatusError(404, { message: "domain not found" });
      });
  }
}
