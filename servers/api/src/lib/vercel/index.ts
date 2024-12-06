import xior, { type XiorInstance } from "xior";

import { ProjectApi } from "./api/project.api";
import { DeploymentApi } from "./api/deployment.api";

export * from "./models";

export class Vercel {
  private readonly xior: XiorInstance;

  readonly project: ProjectApi;
  readonly deployment: DeploymentApi;

  constructor(
    apiKey: string = process.env.VERCEL_API_KEY!,
    baseURL: string = process.env.VERCEL_BASE_API_URL!
  ) {
    this.xior = xior.create({
      baseURL,
      headers: {
        Authorization: "Bearer " + apiKey,
      },
    });

    this.project = new ProjectApi(this.xior);
    this.deployment = new DeploymentApi(this.xior);
  }
}
