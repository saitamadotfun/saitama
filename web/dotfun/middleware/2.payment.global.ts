export default defineNuxtRouteMiddleware(async ({ query, params }) => {
  const pid = query.pid as unknown as string | undefined;
  const site = (query.site ?? params.site) as unknown as string | undefined;

  const { api } = useApi();
  const { updateSite } = useSite();

  if (pid && site) {
    const { data } = await api.payment.create({ id: pid });
    if (data) await updateSite(site, { payment: data.id });
  }
});
