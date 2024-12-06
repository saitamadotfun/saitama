import type { Api, Template } from "@saitamadotfun/sdk";

type State = {
  templates: Map<Template["id"], Template>;
};

export const useTemplate = defineStore("template", {
  state: (): State => ({
    templates: new Map(),
  }),
  getters: {
    all: (state) => Array.from(state.templates.values()),
  },
  actions: {
    get(id: Template["id"]) {
      return this.templates.get(id);
    },
    async createTemplate(
      ...args: Parameters<typeof Api.prototype.template.create>
    ) {
      const { api } = useApi();
      const template = await api.template
        .create(...args)
        .then(({ data }) => data);

      this.templates.set(template.id, template);

      return template;
    },
    async getTemplates(
      ...args: Parameters<typeof Api.prototype.template.list>
    ) {
      const { api } = useApi();
      const templates = await api.template
        .list(...args)
        .then(({ data }) => data);
      this.templates = templates.reduceRight(
        (self, template) => self.set(template.id, template),
        this.templates
      );

      return templates;
    },
    async updateTemplate(
      ...args: Parameters<typeof Api.prototype.template.update>
    ) {
      const { api } = useApi();
      const template = await api.template
        .update(...args)
        .then(({ data }) => data);
      this.templates.set(template.id, template);

      return template;
    },

    async deleteTemplate(
      ...args: Parameters<typeof Api.prototype.template.delete>
    ) {
      const { api } = useApi();
      const template = await api.template
        .delete(...args)
        .then(({ data }) => data);

      this.templates.delete(template.id);

      return template;
    },
  },
});
