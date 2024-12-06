import xior, { type XiorInstance } from "xior";
import { PlanApi, PaymentApi, PaymentLinkApi, SubscriptionApi } from "./api";
import { CustomerApi } from "./api/customer.api";

export class Bumfi {
  private readonly xior: XiorInstance;

  readonly plan: PlanApi;
  readonly payment: PaymentApi;
  readonly customer: CustomerApi;
  readonly paymentLink: PaymentLinkApi;
  readonly subscription: SubscriptionApi;

  constructor(
    apiKey: string = process.env.BOOMFI_API_KEY!,
    baseURL: string = process.env.BOOMFI_BASE_API_KEY!
  ) {
    this.xior = xior.create({
      baseURL,
      headers: {
        "X-API-KEY": apiKey,
      },
    });

    this.plan = new PlanApi(this.xior);
    this.payment = new PaymentApi(this.xior);
    this.customer = new CustomerApi(this.xior);
    this.paymentLink = new PaymentLinkApi(this.xior);
    this.subscription = new SubscriptionApi(this.xior);
  }
}
