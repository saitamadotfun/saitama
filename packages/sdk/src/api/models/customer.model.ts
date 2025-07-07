import type { Wallet } from "./wallet.model";
import type { Network } from "./network.model";

export type Customer<T extends object = object> = {
  id: string;
  metadata: T;
  email: string;
  createdAt: string;
  updatedAt: string;
  reference?: string;
  wallets: Pick<Wallet, "id"> & { network: Pick<Network, "id" | "name"> }[];
};
