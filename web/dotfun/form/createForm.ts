import { Api, type DomainExist, type Template } from "@saitamadotfun/sdk";

export type SetupForm = {
  name: string;
  category: string;
};

export type CreateForm = {
  setup: SetupForm;
  template: Template;
  domain: DomainExist;
};

export const processCreateForm = (
  api: Api,
  args: CreateForm & {
    workspace: string;
  }
) =>
  api.site
    .create({
      name: args.setup.name,
      category: args.setup.category,
      template: args.template.id,
      origin: args.domain.origin,
      workspace: args.workspace,
    })
    .then(({ data }) => data);
