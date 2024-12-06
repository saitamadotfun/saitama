import { ApiImpl } from "@saitamadotfun/utils";
import type { ListArgs, Paginated, Response, Subscription } from "../models";

export class SubscriptionApi extends ApiImpl {
  protected readonly path = "subscriptions";

  readonly list = (
    args: Record<(keyof ListArgs & "customer_id") | "status", string>
  ) => {
    return this.xior.get<Paginated<Subscription>>(
      this.buildPathWithQuery(this.path, args)
    );
  };

  readonly cancel = (id: Subscription["id"]) => {
    return this.xior.delete<Response<Subscription>>(this.buildPath(id));
  };
}
