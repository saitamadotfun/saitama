import { signOut, type User } from "firebase/auth";

export default defineNuxtRouteMiddleware(async () => {
  const auth = useFirebaseAuth();
  const config = useRuntimeConfig();
  const user: User = await getCurrentUser();
  const authToken = useCookie("auth.token");

  if (user && auth) await signOut(auth);

  authToken.value = null;

  if (import.meta.client)
    navigateTo(config.DOMAIN_BASE_URL ?? config.public.DOMAIN_BASE_URL);
});
