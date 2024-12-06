import type { User } from "./user.model";
import type { Price } from "./price.model";
import type { Asset } from "./asset.model";

export type TemplateMetadata = {
  repo: string;
  type: "github";
  framework: string;
  tags: string[];
  categories: string[];
  bumfiPaymentLink?: {
    id: string;
  };
};

export type Template = {
  id: string;
  name: string;
  description: string;
  preview: Asset;
  user: User;
  price: Price;
  metadata: TemplateMetadata;
  createdAt: string;
  updatedAt: string;
};
