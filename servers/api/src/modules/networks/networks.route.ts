import { array, object, z } from "zod";
import passport from "@fastify/passport";
import type { FastifyInstance, FastifyRequest } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";

import { db } from "../../instances";
import { networkSearchQuery } from "./networks.query";
import { networkQuerySchema } from "./networks.schema";
import { getNetworksAndWhere } from "./networks.controller";
import { selectCoinSchema, selectNetworkSchema } from "../../db/zod";

const getNetworksRoute = async (
  request: FastifyRequest<{ Querystring: z.infer<typeof networkQuerySchema> }>
) => getNetworksAndWhere(db, networkSearchQuery(request.query));

export default function registerNetworkRoutes(fastify: FastifyInstance) {
  fastify.route({
    url: "/",
    method: "GET",
    handler: getNetworksRoute,
    preHandler: passport.authenticate(["jwt", "apiKey"]),
    schema: {
      tags: ["networks"],
      description:
        "This resource is to retrieve information about all networks.",
      querystring: {
        ...zodToJsonSchema(networkQuerySchema),
        additionalProperties: true,
      },
      response: {
        200: zodToJsonSchema(
          array(
            selectNetworkSchema
              .omit({
                parent: true,
                creator: true,
                createdAt: true,
                updatedAt: true,
              })
              .and(
                object({
                  coins: array(
                    selectCoinSchema.omit({
                      network: true,
                      creator: true,
                      createdAt: true,
                      updatedAt: true,
                    })
                  ),
                })
              )
          )
        ),
      },
    },
  });
}
