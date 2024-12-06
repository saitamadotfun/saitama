export default defineNuxtRouteMiddleware(({ fullPath }) => {
  const { user } = useUser();
  const config = useRuntimeConfig();

  if (user) return;

  const nextURL = import.meta.server
    ? config.DOMAIN_BASE_URL
    : config.public.DOMAIN_BASE_URL;

  const authURL = import.meta.server
    ? config.AUTH_BASE_URL
    : config.public.AUTH_BASE_URL;

  const next = authURL + "?next=" + nextURL + fullPath;

  navigateTo(next, { external: true, replace: true });
});
