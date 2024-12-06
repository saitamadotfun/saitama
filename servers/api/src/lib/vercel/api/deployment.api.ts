import { ApiImpl } from "@saitamadotfun/utils";
import type {
  CreateDeployment,
  CreateDeploymentArgs,
  CreateDeploymentQuery,
} from "../models/deployment.model";

export class DeploymentApi extends ApiImpl {
  protected readonly path = "v13/deployments";

  create(args: CreateDeploymentArgs, query?: Partial<CreateDeploymentQuery>) {
    return this.xior.post<CreateDeployment>(
      this.buildPathWithQuery(this.path, query),
      args
    );
  }

  get(id: CreateDeployment["id"]) {
    return this.xior.get<CreateDeployment>(this.buildPath(id));
  }

  delete(id: CreateDeployment["id"]) {
    return this.xior.delete<{ state: "DELETED"; uid: string }>(
      this.buildPath(id)
    );
  }
}
