import { Module } from "../../core/module";
import { Site } from "../sites/site.module";
import type { Bumfi, Vercel } from "../../lib";
import { Payment } from "../payments/payment.module";
import { Deployment } from "../deployments/deployment.module";
import { Subscription } from "../subscriptions/subscription.module";

export class Webhook extends Module {
  constructor(
    private readonly vercel: Vercel,
    private readonly bumfi: Bumfi,
    ...args: ConstructorParameters<typeof Module>
  ) {
    super(...args);
  }

  get deployment() {
    return new Deployment(this.vercel, this.database);
  }

  get site() {
    return new Site(this.vercel, this.database);
  }

  get subscription() {
    return new Subscription(this.database);
  }

  get payment() {
    return new Payment(this.database);
  }
}
