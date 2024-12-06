import type { FastifyRequest } from "fastify";
import { Route } from "../../core/route";
import { selectDeploymentSchema } from "../../db/zod";
import { catchRuntimeRouteError, StatusError } from "../../core/error";

import type { Deployment } from "./deployment.module";

export class DeploymentRoute extends Route<Deployment> {
  protected path: string = "deployments";

  registerRoutes() {
    this.fastify.route({
      method: "GET",
      url: this.buildPath(":id"),
      handler: catchRuntimeRouteError(this.pingDeployment.bind(this)),
    });
  }

  private async pingDeployment(
    request: FastifyRequest<{
      Params: Pick<Zod.infer<typeof selectDeploymentSchema>, "id">;
    }>
  ) {
    return selectDeploymentSchema
      .pick({ id: true })
      .parseAsync(request.params)
      .then(async (params) => {
        const deployment = await this.module.getDeploymentById(params.id);
        if (deployment) {
          if (["CANCELED", "READY"].includes(deployment.status))
            return deployment;
          const vercelDeployment = await this.module.vercel.deployment
            .get(deployment.id)
            .then(({ data }) => data);
          const [updatedDeployment] = await this.module.updateDeploymentById(
            deployment.id,
            { status: vercelDeployment.status ?? vercelDeployment.readyState }
          );

          return updatedDeployment;
        }

        throw new StatusError(404, { message: "deployment not found" });
      });
  }
}
