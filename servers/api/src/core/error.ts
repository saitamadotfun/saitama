import { ZodError } from "zod";
import { XiorError } from "xior";
import type { HttpCodes } from "fastify/types/utils";
import type { FastifyReply, FastifyRequest } from "fastify";

export const catchRuntimeRouteError =
  <
    Fn extends (
      request: FastifyRequest<any>,
      reply: FastifyReply<any>
    ) => unknown | Promise<unknown>
  >(
    handler: Fn
  ) =>
  (...[response, reply]: Parameters<Fn>) => {
    try {
      return handler(response, reply);
    } catch (error) {
      if (error instanceof ZodError) return reply.status(400).send(error);
      if (error instanceof XiorError)
        return reply
          .status(error.response?.status ?? 500)
          .send(error.response?.data ?? error.cause);
      if (error instanceof StatusError)
        return reply.status(error.statusCode).send(error.message);
      return reply.status(500).send(error);
    }
  };

export class StatusError {
  constructor(
    readonly statusCode: HttpCodes,
    readonly message: object | string
  ) {}
}
