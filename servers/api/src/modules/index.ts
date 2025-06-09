import type { FastifyInstance } from "fastify";

import registerWebsocket from "./websocket";
import registerAppRoutes from "./apps/apps.route";
import registerAuthRoutes from "./auth/auth.route";
import registerUserRoutes from "./users/users.route";
import registerCoinRoutes from "./coins/coins.route";
import registerWalletRoutes from "./wallets/wallets.route";
import registerApiKeyRoutes from "./api-keys/api-keys.route";
import registerPaymentRoutes from "./payments/payments.route";
import registerWebhookRoutes from "./webhooks/webhooks.route";
import registerNetworkRoutes from "./networks/networks.route";
import registerCustomerRoutes from "./customers/customers.route";
import registerTransactionRoutes from "./transactions/transactions.route";
import registerPaymentLinkRoutes from "./payment-links/payment-links.route";

export default async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(registerWebsocket);
  await fastify.register(registerAppRoutes, { prefix: "/apps/" });
  await fastify.register(registerAuthRoutes, { prefix: "/auth/" });
  await fastify.register(registerUserRoutes, { prefix: "/users/" });
  await fastify.register(registerCoinRoutes, { prefix: "/coins/" });
  await fastify.register(registerApiKeyRoutes, { prefix: "/api-keys/" });
  await fastify.register(registerNetworkRoutes, { prefix: "/networks/" });
  await fastify.register(registerWalletRoutes, { prefix: "/wallets/" });
  await fastify.register(registerPaymentRoutes, { prefix: "/payments/" });
  await fastify.register(registerWebhookRoutes, { prefix: "/webhooks/" });
  await fastify.register(registerCustomerRoutes, { prefix: "/customers/" });
  await fastify.register(registerPaymentLinkRoutes, {
    prefix: "/payment-links/",
  });
  await fastify.register(registerTransactionRoutes, {
    prefix: "/transactions/",
  });
}
