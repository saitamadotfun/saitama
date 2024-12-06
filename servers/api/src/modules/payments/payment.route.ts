import type { FastifyRequest } from "fastify";

import { insertPaymentSchema, selectPaymentSchema } from "../../db/zod";

import { Route } from "../../core/route";
import { catchRuntimeRouteError, StatusError } from "../../core/error";

import { reverseEnum } from "../../lib";
import { PaymentStatus } from "../../lib/bumfi/models";

import type { Payment } from "./payment.module";
import passport from "@fastify/passport";

export class PaymentRoute extends Route<Payment> {
  protected readonly path = "payments";

  registerRoutes() {
    this.fastify
      .route({
        method: "POST",
        url: this.buildPath(),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.createPaymentRoute.bind(this)),
      })
      .route({
        method: "GET",
        url: this.buildPath(),
        preHandler: passport.authenticate(["jwt", "token"]),
        handler: catchRuntimeRouteError(this.getPaymentRoute.bind(this)),
      });
  }

  createPaymentRoute(
    request: FastifyRequest<{ Body: Zod.infer<typeof insertPaymentSchema> }>
  ) {
    return insertPaymentSchema
      .pick({ id: true })
      .parseAsync(request.body)
      .then(async (body) => {
        const {
          data: { data },
        } = await this.module.bumfi.payment.retrieve(body.id);
        const [payment] = await this.module.createPayment({
          ...body,
          status: reverseEnum(PaymentStatus, data.status)!,
        });

        return payment;
      });
  }

  getPaymentRoute(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectPaymentSchema>, "id">;
    }>
  ) {
    return selectPaymentSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        let payment = await this.module.getPaymentById(params.id);
        if (payment) {
          if (payment.status === "Pending") {
            const {
              data: { data },
            } = await this.module.bumfi.payment.retrieve(params.id);
            [payment] = await this.module.updatePaymentById(payment.id, {
              status: reverseEnum(PaymentStatus, data.status),
            });
          }

          return payment;
        }

        throw new StatusError(404, { message: "payment not found" });
      });
  }
}
