import type { XiorResponse } from "xior";
import type { SaitamaClient, Payment, PurePayment } from "../api";

export abstract class NetworkImpl {
  constructor(protected readonly api: SaitamaClient) {}

  abstract initializePayment(
    payment: PurePayment
  ): Promise<Payment | XiorResponse<Payment>>;
}
