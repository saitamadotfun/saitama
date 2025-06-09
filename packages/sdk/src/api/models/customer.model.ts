import type { Network } from "./network.model";
import type { Wallet } from "./wallet.model";

export type Customer<T extends object = object> = {
  id: string;
  metadata: T;
  email: string;
  createdAt: string;
  updatedAt: string;
  wallets: Pick<Wallet, "id"> & { network: Pick<Network, "id" | "name"> }[];
  reference?: string;
};
