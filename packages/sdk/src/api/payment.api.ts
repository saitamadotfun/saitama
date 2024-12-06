import { ApiImpl } from "@saitamadotfun/utils";
import type { Payment } from "../models";

export class PaymentApi extends ApiImpl {
  protected readonly path = "payments";

  create(args: Pick<Payment, "id">) {
    return this.xior.post<Payment>(this.path, args);
  }

  retrieve(id: Payment["id"]) {
    return this.xior.get<Payment>(this.buildPath(id));
  }
}
