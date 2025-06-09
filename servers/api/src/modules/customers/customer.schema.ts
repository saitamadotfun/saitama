import { object, array } from "zod";
import {
  selectCustomerSchema,
  selectNetworkSchema,
  selectWalletSchema1,
} from "../../db/zod";

export const customerSchema = selectCustomerSchema.and(
  object({
    wallets: array(
      selectWalletSchema1
        .pick({ id: true, metadata: true })
        .and(
          object({
            network: selectNetworkSchema.pick({ id: true, name: true }),
          })
        )
    ),
  })
);
