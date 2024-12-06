import { ExtendedModule } from "../extended";

import type { Framework } from "../../lib";
import { Token } from "../tokens/token.module";
import { Payment } from "../payments/payment.module";
import { Template } from "../templates/template.module";
import { Deployment } from "../deployments/deployment.module";
import { Collection } from "../collections/collection.module";

import {
  createSite,
  deleteSiteByUserAndId,
  getSiteByUserAndId,
  getSitesByUser,
  updateSiteByUserAndId,
  updateSiteByVercelProjectId,
  deleteSiteByVercelProjectId,
} from "./site.controller";
import { Workspace } from "../workspaces/workspace.module";

export class Site extends ExtendedModule {
  readonly createSite = this.withDatabase(createSite);
  readonly getSitesByUser = this.withDatabase(getSitesByUser);
  readonly getSiteByUserAndId = this.withDatabase(getSiteByUserAndId);
  readonly updateSiteByUserAndId = this.withDatabase(updateSiteByUserAndId);
  readonly deleteSiteByUserAndId = this.withDatabase(deleteSiteByUserAndId);
  readonly updateSiteByVercelProjectId = this.withDatabase(
    updateSiteByVercelProjectId
  );
  readonly deleteSiteByVercelProjectId = this.withDatabase(
    deleteSiteByVercelProjectId
  );

  readonly token = new Token(this.database);

  readonly payment: Payment;
  readonly template: Template;
  readonly workspace: Workspace;
  readonly deployment: Deployment;
  readonly collection: Collection;

  constructor(
    ...args: ConstructorParameters<typeof ExtendedModule>
  ) {
    super(...args);

    this.payment = new Payment(...args);
    this.template = new Template(...args);
    this.workspace = new Workspace(...args);
    this.collection = new Collection(this.database);
    this.deployment = new Deployment(this.vercel, this.database);
  }

  readonly getEnvironmentVariables = (
    framework: Framework,
    {
      url,
      token,
      site,
      target,
    }: {
      url: string;
      token: string;
      site: string;
      target: ("production" | "preview" | "development")[];
    }
  ) => {
    const envs = [
      { key: "SAITAMA_API_BASE_URL", value: url },
      { key: "SAITAMA_SITE_ID", value: site },
      {
        key: "SAITAMA_AUTH_URL",
        value: "https://auth.saitama.fun",
      },
    ] as const;

    switch (framework) {
      case "nextjs":
        const prefixes = ["NEXT", "NEXT_PUBLIC"] as const;

        return [
          ...envs.flatMap(({ key, value }) =>
            prefixes.map(
              (prefix) =>
                ({
                  key: `${prefix}_${key}`,
                  value,
                  target,
                  type: "plain",
                } as const)
            )
          ),
          {
            key: "NEXT_SAITAMA_API_KEY",
            value: token,
            target,
            type: "plain",
          } as const,
        ];

      default:
        return [];
    }
  };
}
