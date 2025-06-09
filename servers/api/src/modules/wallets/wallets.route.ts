import { array, type z } from "zod";
import passport from "@fastify/passport";
import { format } from "@saitamafun/shared";
import zodToJsonSchema from "zod-to-json-schema";
import type { FastifyInstance, FastifyRequest } from "fastify";

import { getEnv } from "../../env";
import { db } from "../../instances";
import { RequestError } from "../../error";
import type { chains } from "../../config";
import { withUserGuard } from "../../guards";
import { getWallet } from "../../core/wallet";
import { walletSearchQuery } from "./wallets.query";
import { walletSearchSchema } from "./wallets.schema";
import { getNetworkById } from "../networks/networks.controller";
import {
  insertWalletSchema,
  selectWalletSchema,
  selectWalletSchema1,
} from "../../db/zod";
import {
  createWallet,
  createWalletsByAppAndCustomer,
  deleteWalletByAppAndId,
  getWalletsByAppWhere,
  updateWalletByAppAndId,
} from "./wallets.controller";

const createWalletRoute = async (
  request: FastifyRequest<{ Body: z.infer<typeof insertWalletSchema> }>
) =>
  withUserGuard((user) =>
    insertWalletSchema
      .omit({ app: true, generated: true })
      .partial({ address: true })
      .parseAsync(request.body)
      .then(async (body) => {
        let wallet:
          | Awaited<ReturnType<typeof createWallet>>[number]
          | undefined = undefined;

        const network = await getNetworkById(db, body.network);
        if (network) {
          if (body.customer)
            wallet = await createWalletsByAppAndCustomer(
              db,
              user.app.id,
              body.customer,
              network.id
            );
          else {
            if (body.address)
              [wallet] = await createWallet(db, {
                ...body,
                app: user.app.id,
                address: body.address,
              });
            else {
              const [index, address] = await getWallet(
                getEnv("MNEMONIC")!,
                network.name as unknown as (typeof chains)[number]
              );
              [wallet] = await createWallet(db, {
                ...body,
                address,
                generated: true,
                app: user.app.id,
                metadata: { index },
              });
            }
          }

          return {
            ...(await selectWalletSchema.parseAsync(wallet)),
            network: { id: network.id, name: network.name },
          };
        } else
          throw new RequestError(
            404,
            format("network with id=% not found", body.network)
          );
      })
  );

export const getWalletsRoute = async (
  request: FastifyRequest<{ Querystring: z.infer<typeof walletSearchSchema> }>
) =>
  withUserGuard(async (user) =>
    array(selectWalletSchema).parseAsync(
      await getWalletsByAppWhere(
        db,
        user.app.id,
        walletSearchQuery(request.query)
      )
    )
  );

const updateWalletRoute = async (
  request: FastifyRequest<{
    Params: z.infer<typeof selectWalletSchema>["id"];
    Body: Partial<z.infer<typeof insertWalletSchema>>;
  }>
) =>
  withUserGuard((user) =>
    selectWalletSchema1
      .pick({ id: true })
      .parseAsync(request.params)
      .then(({ id }) =>
        insertWalletSchema
          .partial()
          .parseAsync(request.body)
          .then(async (body) => {
            const [wallet] = await updateWalletByAppAndId(
              db,
              user.app.id,
              id,
              body
            );
            if (wallet) return wallet;

            throw new RequestError(
              404,
              format("wallet with id=% not found", id)
            );
          })
      )
  );

const deleteWalletRoute = async (
  request: FastifyRequest<{
    Params: z.infer<typeof selectWalletSchema>["id"];
  }>
) =>
  withUserGuard((user) =>
    selectWalletSchema1
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async ({ id }) => {
        const [wallet] = await deleteWalletByAppAndId(db, user.app.id, id);
        if (wallet) return wallet;

        throw new RequestError(404, format("wallet with id=% not found", id));
      })
  );

export default function registerWalletRoutes(fastify: FastifyInstance) {
  fastify
    .route({
      method: "POST",
      url: "/",
      handler: RequestError.handler(createWalletRoute),
      preHandler: passport.authenticate(["apiKey", "jwt"]),
      schema: {
        tags: ["wallets"],
        description: "This resource is to create a unique wallet.",
        body: zodToJsonSchema(
          insertWalletSchema
            .partial({ address: true })
            .omit({ app: true, generated: true })
        ),
        response: {
          201: zodToJsonSchema(selectWalletSchema),
        },
      },
    })
    .route({
      method: "GET",
      url: "/",
      handler: RequestError.handler(getWalletsRoute),
      preHandler: passport.authenticate(["apiKey", "jwt"]),
      schema: {
        tags: ["wallets"],
        description:
          "This resource is to retrieve information about all wallets.",
        querystring: {
          ...zodToJsonSchema(walletSearchSchema),
          additionalProperties: true,
        },
        response: {
          200: zodToJsonSchema(array(selectWalletSchema), {
            definitions: { selectWalletSchema },
          }),
        },
      },
    })
    .route({
      method: "PATCH",
      url: "/:id/",
      handler: RequestError.handler(updateWalletRoute),
      preHandler: passport.authenticate(["apiKey", "jwt"]),
      schema: {
        tags: ["wallets"],
        description:
          "This resource is to retrieve information about a single wallet.",
        params: zodToJsonSchema(selectWalletSchema1.pick({ id: true })),
        response: {
          200: zodToJsonSchema(selectWalletSchema),
        },
      },
    })
    .route({
      method: "DELETE",
      url: "/:id/",
      handler: RequestError.handler(deleteWalletRoute),
      preHandler: passport.authenticate(["apiKey", "jwt"]),
      schema: {
        tags: ["wallets"],
        description: "This resource is to delete a single wallet.",
        params: zodToJsonSchema(selectWalletSchema1.pick({ id: true })),
        response: {
          200: zodToJsonSchema(selectWalletSchema),
        },
      },
    });
}
