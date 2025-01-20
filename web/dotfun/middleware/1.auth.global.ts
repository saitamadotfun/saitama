export default defineNuxtRouteMiddleware(async () => {
  const apiStore = useApi();
  const userStore = useUser();
  const authToken = useCookie("auth.token", { path: "/" });

  let token = authToken.value;
  if (token) apiStore.accessToken = token;

  if (userStore.user) return;
  if (import.meta.prerender) return;

  await userStore.getUser().catch((error) => {
    authToken.value = null;
    return null;
  });
});
