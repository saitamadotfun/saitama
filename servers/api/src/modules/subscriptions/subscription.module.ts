import { Module } from "../../core/module";
import {
  createSubscription,
  updateSubscriptionById,
} from "./subscription.controller";

export class Subscription extends Module {
  readonly createSubscription = this.withDatabase(createSubscription);
  readonly updateSubscriptionById = this.withDatabase(updateSubscriptionById);
}
