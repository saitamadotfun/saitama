import { object, array } from "zod";

import { customerSearchQuery } from "./customers.query";
import {
  selectCustomerSchema,
  selectNetworkSchema,
  selectWalletSchema1,
} from "../../db/zod";

export const customerSchema = selectCustomerSchema.and(
  object({
    wallets: array(
      selectWalletSchema1.pick({ id: true, metadata: true }).and(
        object({
          network: selectNetworkSchema.pick({ id: true, name: true }),
        })
      )
    ),
  })
);

export const customerSearchSchema = selectCustomerSchema
  .pick(customerSearchQuery.pick)
  .partial();
