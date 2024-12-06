import { ApiImpl } from "@saitamadotfun/utils";
import type { ListArgs, Paginated, Payment, Response } from "../models";

export class PaymentApi extends ApiImpl {
  protected readonly path = "payments";

  readonly list = (args?: Record<keyof ListArgs, string>) => {
    return this.xior.get<Paginated<Payment>>(
      this.buildPathWithQuery(this.path, args)
    );
  };

  readonly retrieve = (id: Payment["id"]) => {
    return this.xior.get<Response<Payment>>(this.buildPath(id));
  };
}
