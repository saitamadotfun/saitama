import "dotenv/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const saitamaApiKey = "OWU3NDkwMTUtODhlMi00ZjVjLWJjMWMtMDg0ZDcwOWZhYmYz";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      title:
        "Saitama | Fun and fastest way to create meme websites in one punch!",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1,maximum-scale=1",
        },
      ],
    },
  },
  modules: [
    "@nuxt/image",
    "@unocss/nuxt",
    "@nuxt/fonts",
    "nuxt-vuefire",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@saitamadotfun/widgets",
    "@sentry/nuxt/module",
  ],
  nitro: {
    prerender: {
      routes: ["/", "/legal/privacy-policy/", "/waitlist"],
    },
  },
  vuefire: {
    config: {
      projectId: "saitamadotfun",
      measurementId: "G-J9E6J7TM3G",
      messagingSenderId: "832401933524",
      storageBucket: "saitamadotfun.appspot.com",
      authDomain: "saitamadotfun.firebaseapp.com",
      appId: "1:832401933524:web:f8d25f2359373d860ea741",
      apiKey: "AIzaSyA57lymHvQxL0uM3PBZ4qXOef1ctus6SzA",
    },
  },
  runtimeConfig: {
    DOMAIN_BASE_URL: "",
    API_BASE_URL: "",
    AUTH_BASE_URL: "",
    SENTRY_DNS: "",
    BUMFI_PAYMENT_URL: "",
    DEBUG_API_KEY: saitamaApiKey,
    public: {
      DOMAIN_BASE_URL: "",
      API_BASE_URL: "",
      AUTH_BASE_URL: "",
      SENTRY_DNS: "",
      BUMFI_PAYMENT_URL: "",
      DEBUG_API_KEY: saitamaApiKey,
    },
  },
  vite: {
    plugins: [nodePolyfills()],
  },
  experimental: {
    inlineRouteRules: true,
  },
  sourcemap: { client: true },
  sentry: {
    sourceMapsUploadOptions: {
      org: process.env.SENTRY_ORGANIZATION,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    },
  },
});
