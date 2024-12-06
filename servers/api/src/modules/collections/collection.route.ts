import type { FastifyRequest } from "fastify";
import { Route } from "../../core/route";
import type { Collection } from "./collection.module";
import { catchRuntimeRouteError, StatusError } from "../../core/error";
import { insertCollectionSchema, selectCollectionSchema } from "../../db/zod";

export class CollectionRoute extends Route<Collection> {
  protected readonly path = "collections";

  readonly registerRoutes = () => {
    this.fastify.route({
      method: "PATCH",
      url: this.buildPath(":id"),
      handler: catchRuntimeRouteError(this.updateRoute.bind(this)),
    });
  };

  private updateRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectCollectionSchema>, "id">;
      Body: Zod.infer<typeof insertCollectionSchema>;
    }>
  ) {
    selectCollectionSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then((params) =>
        insertCollectionSchema
          .partial()
          .parseAsync(request.body)
          .then(async (body) => {
            const [collection] = await this.module.updateCollectionById(
              params.id,
              body
            );
            if (collection) return collection;
            throw new StatusError(404, { message: "collection not found" });
          })
      );
  }
}
