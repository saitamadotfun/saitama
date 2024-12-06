export default defineNuxtRouteMiddleware(async ({ query }) => {
  const config = useRuntimeConfig();
  const authToken = useCookie("auth.token", { path: "/" });

  if (import.meta.dev) {
    authToken.value = import.meta.server
      ? config.DEBUG_API_KEY
      : config.public.DEBUG_API_KEY;
    return;
  }

  if (query["auth.token"]) {
    const token = query["auth.token"] as string;
    authToken.value = token;
  }
});
