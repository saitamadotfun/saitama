import type { z } from "zod";
import { HDNodeWallet, Wallet } from "ethers";
import { web3 } from "@coral-xyz/anchor";
import { and, eq, SQL } from "drizzle-orm";
import { format } from "@saitamafun/shared";

import type { Database } from "../../db";
import { RequestError } from "../../error";
import { networks, wallets } from "../../db/schema";
import { decrypt, encrypt } from "../../core/secret";
import { secretKey, tronWeb } from "../../instances";
import type {
  insertWalletSchema,
  selectAppSchema,
  selectCustomerSchema,
  selectNetworkSchema,
  selectWalletSchema,
  selectWalletSchema1,
} from "../../db/zod";

export const createWallet = (
  db: Database,
  value: z.infer<typeof insertWalletSchema>
) =>
  db
    .insert(wallets)
    .values(value)
    .returning()
    .onConflictDoUpdate({
      target: [wallets.app, wallets.customer, wallets.network, wallets.address],
      set: value,
    })
    .execute();

export async function createWalletsByAppAndCustomer(
  db: Database,
  app: z.infer<typeof selectAppSchema>["id"],
  customer: z.infer<typeof selectCustomerSchema>["id"],
  network: z.infer<typeof selectNetworkSchema>["id"]
): Promise<Awaited<ReturnType<typeof getWalletsByAppWhere>>[number]>;
export async function createWalletsByAppAndCustomer(
  db: Database,
  app: z.infer<typeof selectAppSchema>["id"],
  customer: z.infer<typeof selectCustomerSchema>["id"]
): ReturnType<typeof getWalletsByAppWhere>;
export async function createWalletsByAppAndCustomer(
  db: Database,
  app: z.infer<typeof selectAppSchema>["id"],
  customer: z.infer<typeof selectCustomerSchema>["id"],
  network?: z.infer<typeof selectNetworkSchema>["id"]
) {
  let dbWallets = await getWalletsByAppWhere(
    db,
    app,
    eq(wallets.customer, customer)
  );

  let wallet = dbWallets.find((wallet) => wallet.network.id === network);

  if (network && wallet) return wallet;
  else {
    const dbNetworks = await db.query.networks.findMany({
      where: network ? eq(networks.id, network) : undefined,
      columns: {
        id: true,
        name: true,
      },
    });

    const nonExistingNetworks = dbNetworks.filter(
      (network) => !dbWallets.find((wallet) => wallet.network.id === network.id)
    );

    await Promise.all(
      nonExistingNetworks.map(async (network) => {
        let address, publicKey;

        if (network.name === "solana") {
          const keypair = web3.Keypair.generate();
          publicKey = keypair.publicKey;
          address = encrypt(secretKey, keypair.secretKey.toBase64());
        } else if (network.name === "ethereum") {
          const keypair = HDNodeWallet.createRandom();
          publicKey = keypair.publicKey;
          address = encrypt(secretKey, keypair.privateKey);
        } else if (network.name === "tron") {
          const account = tronWeb.utils.accounts.generateAccount();

          publicKey = account.publicKey;
          address = encrypt(secretKey, account.privateKey);
        }

        if (address && publicKey) {
          const [wallet] = await createWallet(db, {
            app,
            address,
            customer,
            network: network.id,
            generated: false,
            metadata: {
              publicKey: publicKey,
            },
          });

          return wallet;
        } else
          throw new RequestError(
            400,
            format("network=% not supported", network.name)
          );
      })
    );

    dbWallets = await getWalletsByAppWhere(
      db,
      app,
      eq(wallets.customer, customer)
    );

    if (network) {
      let wallet = dbWallets.find((wallet) => wallet.network.id === network);
      if (wallet) return wallet;
    } else return dbWallets;
  }
}

export const getWalletsByAppWhere = <T extends SQL<unknown> | undefined>(
  db: Database,
  app: z.infer<typeof selectAppSchema>["id"],
  ...where: T[]
) =>
  db.query.wallets
    .findMany({
      where: and(eq(wallets.app, app), ...where),
      with: {
        network: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    })
    .execute();

export const getWalletByAppWhere = <T extends SQL<unknown>>(
  db: Database,
  app: z.infer<typeof selectAppSchema>["id"],
  ...where: T[]
) =>
  db.query.wallets
    .findFirst({
      where: and(eq(wallets.app, app), ...where),
      with: {
        network: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    })
    .execute();

export const updateWalletByAppAndId = (
  db: Database,
  app: z.infer<typeof selectAppSchema>["id"],
  id: z.infer<typeof selectWalletSchema>["id"],
  value: Partial<z.infer<typeof insertWalletSchema>>
) =>
  db
    .update(wallets)
    .set(value)
    .where(
      and(
        eq(wallets.id, id),
        eq(wallets.app, app),
        eq(wallets.generated, false)
      )
    )
    .returning()
    .execute();

export const deleteWalletByAppAndId = (
  db: Database,
  app: z.infer<typeof selectAppSchema>["id"],
  id: z.infer<typeof selectWalletSchema>["id"]
) =>
  db
    .delete(wallets)
    .where(
      and(
        eq(wallets.id, id),
        eq(wallets.app, app),
        eq(wallets.generated, false)
      )
    )
    .returning()
    .execute();

export function loadWalletFromDb(
  wallet: Pick<z.infer<typeof selectWalletSchema1>, "address" | "network">,
  network: "solana"
): web3.Keypair;
export function loadWalletFromDb(
  wallet: Pick<z.infer<typeof selectWalletSchema1>, "address" | "network">,
  network: "ethereum"
): Wallet;
export function loadWalletFromDb(
  wallet: Pick<z.infer<typeof selectWalletSchema1>, "address" | "network">,
  network: "tron"
): undefined;
export function loadWalletFromDb(
  wallet: Pick<z.infer<typeof selectWalletSchema1>, "address" | "network">,
  network: "solana" | "ethereum" | "tron"
) {
  const privateKey = decrypt<string>(secretKey, wallet.address);

  if (network === "solana")
    return web3.Keypair.fromSecretKey(Buffer.from(privateKey, "base64"));
  else if (network === "ethereum") return new Wallet(privateKey);
  else if (network === "tron") return undefined;

  throw new RequestError(
    400,
    format("network=% can't be loaded from db", wallet.network)
  );
}
