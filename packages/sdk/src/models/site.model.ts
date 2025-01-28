import type { User } from "./user.model";
import type { Asset } from "./asset.model";
import type { Domain } from "./domain.model";
import type { Payment } from "./payment.model";
import type { Template } from "./template.model";
import type { Deployment } from "./deployment.model";

export type SiteMetadata = {
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  vercelProjectId: string;
  vercelProjectURL: string;
  settings: {
    favicon: Asset;
    socialPreview: Asset;
    appleTouchIcon: Asset;
  };
  customCode: {
    startOfHead: string;
    endOfHead: string;
    startOfBody: string;
    endOfBody: string;
  };
};

export type Site = {
  id: string;
  name: string;
  category: string;
  user: User;
  template: Template;
  payment: Payment;
  sync: string;
  domains: Domain[];
  deployments: Deployment[];
  metadata: SiteMetadata;
  deleted: boolean;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
};
