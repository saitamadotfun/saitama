import type { FastifyRequest } from "fastify";
import passport from "@fastify/passport";

import { Route } from "../../core/route";
import { insertAssetSchema, selectAssetSchema } from "../../db/zod";

import type { Asset } from "./asset.module";

export class AssetRoute extends Route<Asset> {
  protected readonly path = "assets";

  readonly registerRoutes = () => {
    this.fastify
      .route({
        method: "POST",
        url: this.buildPath(),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: this.createAssetRoute.bind(this),
      })
      .route({
        method: "GET",
        url: this.buildPath(),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: this.getAssetsRoute.bind(this),
      })
      .route({
        method: "DELETE",
        url: this.buildPath(),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: this.deleteAssetRoute.bind(this),
      });
  };

  private async getAssetsRoute(request: FastifyRequest) {
    return this.module.getAssetsByUser(request.user!.id);
  }

  private async createAssetRoute(
    request: FastifyRequest<{
      Body: Omit<Zod.infer<typeof insertAssetSchema>, "user">;
    }>
  ) {
    const files = await request.saveRequestFiles();
    const response = await Promise.all(
      files.map(async (file) =>
        this.module.imagekit.upload({
          file: await file.toBuffer(),
          fileName: file.filename,
        })
      )
    );

    return (
      await Promise.all(
        response.flatMap(async (data, index) => {
          const metapart = files.at(index)!.fields;

          const body = {} as Pick<
            Zod.infer<typeof insertAssetSchema>,
            "name" | "metadata"
          >;

          for (const [key, field] of Object.entries(metapart)) {
            if (Array.isArray(field)) {
              const value = field.at(index);
              if (value && "value" in value)
                body[key as keyof typeof body] = JSON.parse(
                  value.value as string
                );
            } else if (field && "value" in field)
              body[key as keyof typeof body] = JSON.parse(
                field.value as string
              );
          }


          return await this.module.createAsset({
            ...body,
            uri: data.url,
            user: request.user!.id,
            type: data.fileType,
          });
        })
      )
    ).flat(2);
  }

  private deleteAssetRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectAssetSchema>, "id">;
    }>
  ) {
    return selectAssetSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const [asset] = await this.module.deleteAssetByUserAndId(
          request.user!.id,
          params.id
        );

        return asset;
      });
  }
}
