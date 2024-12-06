import { Route } from "../../core/route";
import type { Subscription } from "./subscription.module";

export class SubscriptionRoute extends Route<Subscription> {
  protected readonly path = "subscriptions";

  registerRoutes() {}
}
