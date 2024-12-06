import type { Api, Site } from "@saitamadotfun/sdk";

type State = {
  sites: Map<Site["id"], Site>;
};

const buildSiteStore = <T extends "site" | "siteArchive">(name: T) =>
  defineStore(name, {
    state: (): State => ({
      sites: new Map(),
    }),
    getters: {
      all: (state) => Array.from(state.sites.values()),
    },
    actions: {
      get(id: Site["id"]) {
        return this.sites.get(id);
      },
      set(site: Site) {
        return this.sites.set(site.id, site);
      },
      delete(site: Site) {
        return this.sites.delete(site.id);
      },
      async getSites(...args: Parameters<typeof Api.prototype.site.list>) {
        const { api } = useApi();
        const sites = await api.site.list(...args).then(({ data }) => data);
        this.sites = sites.reduceRight(
          (self, site) => self.set(site.id, site),
          this.sites
        );

        return sites;
      },
      async getSite(...[id]: Parameters<typeof Api.prototype.site.retrieve>) {
        const { api } = useApi();
        let site = this.get(id);
        if (site) return site;

        site = await api.site.retrieve(id).then(({ data }) => data);
        this.sites.set(site!.id, site!);

        return site!;
      },
      async createSite(...args: Parameters<typeof Api.prototype.site.create>) {
        const { api } = useApi();
        const site = await api.site.create(...args).then(({ data }) => data);
        this.sites = this.sites.set(site.id, site);

        return site;
      },
      async updateSite(...args: Parameters<typeof Api.prototype.site.update>) {
        const { api } = useApi();
        const site = await api.site.update(...args).then(({ data }) => data);
        if (site.deleted) this.sites.delete(site.id);
        else this.sites.set(site.id, site);

        return site;
      },
      async deleteSite(...[id]: Parameters<typeof Api.prototype.site.delete>) {
        const { api } = useApi();
        const site = await api.site
          .update(id, { deleted: true })
          .then(({ data }) => data);
        this.sites.delete(site.id);
        return site;
      },
      async ping(...[id]: Parameters<typeof Api.prototype.site.retrieve>) {
        const { api } = useApi();
        let site = this.get(id)!;
        const deployment = site?.deployments.at(-1)!;
        let interval: NodeJS.Timeout;
        if (
          deployment &&
          !["CANCELED", "READY", "ERROR"].includes(deployment.status)
        ) {
          const job = async () => {
            const updated = await api.deployment
              .retrieve(deployment.id)
              .then(({ data }) => data);
            const index = site.deployments.findIndex(
              (value) => value.id === deployment.id
            );
            site.deployments[index] = updated;
            this.sites.set(site.id, site);

            if (
              interval &&
              ["CANCELED", "READY", "ERROR"].includes(updated.status)
            )
              clearInterval(interval);
          };

          job();
          interval = setInterval(job.bind(this), 30000);
        }
      },
    },
  });

export const useSite = buildSiteStore("site");
export const useSiteArchive = buildSiteStore("siteArchive");
