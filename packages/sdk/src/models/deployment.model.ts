import type { DeploymentStatus } from "../constants";

export type Deployment = {
  id: string;
  status: DeploymentStatus;
  site: string;
  createdAt: string;
  updatedAt: string;
};
