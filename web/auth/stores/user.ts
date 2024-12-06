export const useUser = defineStore("user", {
  actions: {
    signInWithIdToken(idToken: string) {
      const { api } = useApi();
      const route = useRoute();

      const siteId = (route.query.site ?? route.query.siteId) as string;
      const query = siteId ? { siteId } : undefined;

      return api.auth
        .signInWithIdToken(idToken, query)
        .then(({ data }) => data)
        .then(onNext);
    },
  },
});
