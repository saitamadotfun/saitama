import "dotenv/config";
import * as Sentry from "@sentry/nuxt";

Sentry.init({
  tracesSampleRate: 1.0,
  dsn: process.env.NUXT_SENTRY_DNS,
});
