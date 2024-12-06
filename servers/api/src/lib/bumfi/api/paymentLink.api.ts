import { ApiImpl } from "@saitamadotfun/utils";
import type {
  Paginated,
  ListArgs,
  CreatePaymentArgs,
  PaymentLink,
  Response,
} from "../models";

export class PaymentLinkApi extends ApiImpl {
  protected readonly path = "v1/paylinks";

  readonly list = (args?: Record<keyof ListArgs, string>) => {
    return this.xior.get<Paginated<PaymentLink>>(
      this.buildPathWithQuery(this.path, args)
    );
  };

  readonly create = (data: CreatePaymentArgs) => {
    return this.xior.post<Response<PaymentLink>>(this.path, data);
  };
}
