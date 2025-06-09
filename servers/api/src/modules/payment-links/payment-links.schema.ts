import { selectPaymentLinkSchema } from "../../db/zod";
import { paymentLinkSearchQuery } from "./payment-links.query";

export const paymentLinkSearchSchema = selectPaymentLinkSchema
  .pick(paymentLinkSearchQuery.pick)
  .partial();
