import { getDomain } from "tldts";
import type { UserAndToken } from "@saitamadotfun/sdk";

export const onNext = (args: UserAndToken) => {
  const route = useRoute();
  const apiStore = useApi();
  const config = useRuntimeConfig();
  const appBaseURL = import.meta.server
    ? config.DOMAIN_BASE_URL
    : config.public.DOMAIN_BASE_URL;

  const authToken = useCookie("auth.token", {
    domain: getDomain(appBaseURL)!,
    path: "/",
  });

  const nextURL = route.query.next as string | undefined;

  authToken.value = args.token;
  apiStore.accessToken = args.token;

  const next = new URL(nextURL ?? appBaseURL);

  if (args.authToken) next.searchParams.set("auth.token", args.authToken);
  else next.searchParams.set("auth.token", args.token);

  if (import.meta.client) window.location.replace(next);
  if (import.meta.server)
    navigateTo(next, {
      external: true,
      replace: true,
      open: { target: "_blank" },
    });
};
