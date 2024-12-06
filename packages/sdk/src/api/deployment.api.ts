import { ApiImpl } from "@saitamadotfun/utils";
import type { Deployment } from "../models/deployment.model";

export class DeploymentApi extends ApiImpl {
  protected path: string = "deployments";

  retrieve(id: Deployment["id"]) {
    return this.xior.get<Deployment>(this.buildPath(id));
  }
}
