import passport from "@fastify/passport";
import type { FastifyRequest } from "fastify";

import { insertTemplateSchema, selectTemplateSchema } from "../../db/zod";

import { Route } from "../../core/route";
import { catchRuntimeRouteError, StatusError } from "../../core/error";

import type { Template } from "./template.module";

export class TemplateRoute extends Route<Template> {
  protected path = "templates";

  readonly registerRoutes = () => {
    this.fastify
      .route({
        method: "GET",
        url: this.buildPath(),
        handler: catchRuntimeRouteError(this.getTemplatesRoute.bind(this)),
      })
      .route({
        method: "POST",
        url: this.buildPath(),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.createTemplateRoute.bind(this)),
      })
      .route({
        method: "PATCH",
        url: this.buildPath(":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.updateTemplateRoute.bind(this)),
      })
      .route({
        method: "DELETE",
        url: this.buildPath(":id"),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.deleteTemplateRoute.bind(this)),
      });
  };

  private getTemplatesRoute() {
    return this.module.getTemplates();
  }

  private createTemplateRoute(
    request: FastifyRequest<{ Body: Zod.infer<typeof insertTemplateSchema> }>
  ) {
    return insertTemplateSchema
      .omit({ user: true })
      .parseAsync(request.body)
      .then(async (body) => {
        let paymentLink = null;

        if (body.price && body.price.amount > 0) {
          const {
            data: { data },
          } = await this.module.bumfi.paymentLink.create({
            name: body.name,
            description: body.description,
            amount: String(body.price.amount),
            currency: body.price.currency,
          });

          paymentLink = data;
        }

        return this.module.createTemplate({
          ...body,
          user: request.user!.id,
          metadata: {
            ...body.metadata,
            bumfiPaymentLink: paymentLink ? { id: paymentLink.id } : null,
          },
        });
      });
  }

  private updateTemplateRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectTemplateSchema>, "id">;
      Body: Zod.infer<typeof insertTemplateSchema>;
    }>
  ) {
    return selectTemplateSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then((params) =>
        insertTemplateSchema
          .partial()
          .parseAsync(request.body)
          .then(async (body) => {
            const [template] = await this.module.updateTemplateByUserAndId(
              request.user!.id,
              params.id,
              body
            );
            if (template) return this.module.getTemplateById(template.id);

            throw new StatusError(404, { message: "template not found" });
          })
      );
  }
  private deleteTemplateRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectTemplateSchema>, "id">;
    }>
  ) {
    return selectTemplateSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const [template] = await this.module.deleteTemplateByUserAndId(
          request.user!.id,
          params.id
        );

        if (template) return template;

        throw new StatusError(404, { message: "template not found" });
      });
  }
}
