import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title:
        "Saitama | Fun and fastest way to create meme websites in one punch!",
    },
  },
  modules: [
    "@nuxt/image",
    "@unocss/nuxt",
    "@nuxt/fonts",
    "nuxt-vuefire",
    "@pinia/nuxt",
    "@saitamadotfun/widgets",
    "@sentry/nuxt/module",
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  runtimeConfig: {
    SENTRY_DNS: "",
    API_BASE_URL: "",
    DOMAIN_BASE_URL: "",
    public: {
      SENTRY_DNS: "",
      API_BASE_URL: "",
      DOMAIN_BASE_URL: "",
    },
  },
  vuefire: {
    auth: {
      enabled: true,
    },
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
  vite: {
    plugins: [nodePolyfills()],
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
