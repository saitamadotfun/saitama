import type { FastifyRequest } from "fastify";

import { Route } from "../../core/route";
import { catchRuntimeRouteError } from "../../core/error";

import { reverseEnum } from "../../lib";
import { PaymentStatus } from "../../lib/bumfi/models";

import type { Webhook } from "./webhook.module";
import { Vercel, type Boomfi } from "./webhook.schema";

export class WebhookRoute extends Route<Webhook> {
  protected readonly path = "webhooks";

  readonly registerRoutes = () => {
    this.fastify
      .route({
        method: "POST",
        url: this.buildPath("vercel"),
        handler: catchRuntimeRouteError(this.vercelWebhookRoute.bind(this)),
      })
      .route({
        method: "POST",
        url: this.buildPath("boomfi"),
        handler: catchRuntimeRouteError(this.boomfiWebhookRoute.bind(this)),
      });
  };

  private async vercelWebhookRoute(
    request: FastifyRequest<{ Body: Vercel.Payload }>
  ) {
    const { type, payload } = request.body;

    switch (type) {
      case "deployment.created":
        return this.module.deployment.createDeployment({
          id: payload.deployment.id,
          site: payload.deployment.meta.id,
          status: "QUEUED",
        });
      case "deployment.canceled":
      case "deployment.error":
      case "deployment.ready":
      case "deployment.check-rerequested":
      case "deployment.succeeded":
        if (payload.links && payload.links.project)
          await this.module.site.updateSiteByVercelProjectId(
            payload.project.id,
            { metadata: { vercelProjectURL: payload.links.project } }
          );

        return this.module.deployment.updateDeploymentById(
          payload.deployment.id,
          { status: Vercel.reverseEventToStatus(type) }
        );

      case "project.removed":
        return this.module.site.deleteSiteByVercelProjectId(payload.project.id);
    }
  }

  private async boomfiWebhookRoute(
    request: FastifyRequest<{ Body: Boomfi.Payload }>
  ) {
    if (request.body.event === "Payment.Updated") {
      const { event, ...payload } = request.body;
      return this.module.payment.updatePaymentById(payload.id, {
        status: reverseEnum(PaymentStatus, payload.status),
      });
    } else if (request.body.event == "Subscription.Updated") {
      const { event, ...payload } = request.body;

      return this.module.subscription.updateSubscriptionById(payload.id, {
        status: reverseEnum(PaymentStatus, payload.status),
      });
    } else if (request.body.event == "Subscription.Canceled") {
      const { event, ...payload } = request.body;

      return this.module.subscription.updateSubscriptionById(payload.id, {
        status: reverseEnum(PaymentStatus, payload.status),
      });
    }

    return null;
  }
}
