import passport from "@fastify/passport";
import type { FastifyRequest } from "fastify";

import { Route } from "../../core/route";
import { catchRuntimeRouteError, StatusError } from "../../core/error";
import {
  insertCollectionSchema,
  insertSiteSchema,
  selectAssetSchema,
  selectSiteSchema,
} from "../../db/zod";

import type { Site } from "./site.module";
import { sitesFilter } from "./site.query";
import { insertSiteAndDomainSchema } from "./site.schema";

export class SiteRoute extends Route<Site> {
  protected readonly path = "sites";

  readonly registerRoutes = () => {
    this.fastify
      .route({
        url: this.buildPath(),
        method: "POST",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.createSiteRoute.bind(this)),
      })
      .route({
        url: this.buildPath(),
        method: "GET",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.getSitesRoute.bind(this)),
      })
      .route({
        url: this.buildPath(":id"),
        method: "GET",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.getSiteRoute.bind(this)),
      })
      .route({
        url: this.buildPath(":id"),
        method: "PATCH",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.updateSiteRoute.bind(this)),
      })
      .route({
        url: this.buildPath(":id"),
        method: "DELETE",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.deleteSiteRoute.bind(this)),
      })
      .route({
        url: this.buildPath(":id", "sync"),
        method: "PUT",
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.syncSiteRoute.bind(this)),
      });
  };

  private createSiteRoute(
    request: FastifyRequest<{
      Body: Zod.infer<typeof insertSiteAndDomainSchema>;
    }>
  ) {
    return insertSiteAndDomainSchema
      .parseAsync(request.body)
      .then(async (body) => {
        const template = await this.module.template.getTemplateById(
          body.template
        );

        const workspace = await this.module.workspace.getWorkspaceByOwnerAndId(
          request.user!.id,
          body.workspace
        );

        if (template && workspace) {
          const id = crypto.randomUUID();
          const {
            metadata: { type, framework, ...metadata },
          } = template;

          const [repo, rootDirectory] = metadata.repo.split(/#/);

          const name = [workspace.name, body.name]
            .join(".")
            .replace(/\s+/g, "")
            .toLowerCase();

          const project = await this.module.vercel.project
            .create({
              name,
              rootDirectory,
              gitRepository: {
                repo,
                type,
              },
              framework,
              enableAffectedProjectsDeployments: true,
              environmentVariables: this.module.getEnvironmentVariables(
                framework,
                {
                  site: id,
                  token: workspace.token.key,
                  url: process.env.RENDER_EXTERNAL_URL!,
                  target: ["production", "preview", "development"],
                }
              ),
            })
            .then(({ data }) => data);

          const deployment = await this.module.vercel.deployment
            .create({
              name,
              gitSource: {
                org: project.link.org,
                repo: project.link.repo,
                type: project.link.type,
                repoId: project.link.repoId,
                ref: project.link.productionBranch,
              },
              projectSettings: {
                framework,
              },
            })
            .then(({ data }) => data);

          const domain = await this.module.vercel.project
            .addDomain(project.id, {
              name: body.origin,
            })
            .then(({ data }) => data);

          const site = await this.module.createSite(
            {
              ...body,
              verified: domain.verified,
              verification: domain.verification,
              user: request.user!.id,
              metadata: {
                vercelProjectId: project.id,
                vercelProjectURL: deployment.alias[0],
              },
            },
            id
          );

          const deployments = await this.module.deployment.createDeployment({
            id: deployment.id,
            site: site.id,
            status: deployment.status ?? deployment.readyState,
          });

          return { ...site, deployments };
        }
      });
  }

  private async getSitesRoute(
    request: FastifyRequest<{ Querystring: Record<string, string> }>
  ) {
    const query = sitesFilter(request.query);
    return this.module.getSitesByUser(request.user!.id, query);
  }

  private async getSiteRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectSiteSchema>, "id">;
    }>
  ) {
    return selectSiteSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const site = await this.module.getSiteByUserAndId(
          request.user!.id,
          params.id
        );
        if (site) return site;

        throw new StatusError(404, { message: "site not found" });
      });
  }

  private updateSiteRoute(
    request: FastifyRequest<{
      Body: Zod.infer<typeof insertSiteSchema>;
      Params: Pick<Zod.infer<typeof selectSiteSchema>, "id">;
    }>
  ) {
    return selectSiteSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then((params) =>
        insertSiteSchema
          .omit({ workspace: true })
          .partial()
          .parseAsync(request.body)
          .then(async (body) => {
            const site = await this.module.updateSiteByUserAndId(
              request.user!.id,
              params.id,
              body
            );

            if (site)
              return this.module.getSiteByUserAndId(request.user!.id, site.id);

            throw new StatusError(404, { message: "site not found" });
          })
      );
  }

  private deleteSiteRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectSiteSchema>, "id">;
    }>
  ) {
    return selectSiteSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const [site] = await this.module.deleteSiteByUserAndId(
          request.user!.id,
          params.id
        );
        if (site) return site;

        throw new StatusError(404, { message: "site not found" });
      });
  }

  private syncSiteRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectSiteSchema>, "id">;
      Body: Zod.infer<typeof insertCollectionSchema>;
    }>
  ) {
    return selectAssetSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then((params) =>
        insertCollectionSchema.parseAsync(request.body).then(async (body) => {
          const site = await this.module.getSiteByUserAndId(
            request.user!.id,
            params.id
          );

          if (site) {
            const [sync] = await this.module.collection.updateCollectionById(
              site.sync,
              body
            );
            return { ...site, sync };
          }

          throw new StatusError(404, { message: "site not found" });
        })
      );
  }
}
