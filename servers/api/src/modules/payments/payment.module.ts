import { ExtendedModule } from "../extended";
import {
  createPayment,
  getPaymentById,
  updatePaymentById,
} from "./payment.controller";

export class Payment extends ExtendedModule {
  readonly createPayment = this.withDatabase(createPayment);
  readonly getPaymentById = this.withDatabase(getPaymentById);
  readonly updatePaymentById = this.withDatabase(updatePaymentById);
}
