import * as Sentry from "@sentry/nuxt";

Sentry.init({
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  dsn: useRuntimeConfig().public.SENTRY_DNS,
  integrations: [Sentry.replayIntegration()],
  tracePropagationTargets: [
    "localhost",
    "127.0.0.1",
    /^https:\/\/v1\.api\.saitama\.fun/,
  ],
});
