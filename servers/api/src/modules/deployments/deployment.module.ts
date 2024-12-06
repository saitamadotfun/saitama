import type { Vercel } from "../../lib";
import { Module } from "../../core/module";
import {
  createDeployment,
  getDeploymentById,
  updateDeploymentById,
} from "./deployment.controller";

export class Deployment extends Module {
  readonly createDeployment = this.withDatabase(createDeployment);
  readonly getDeploymentById = this.withDatabase(getDeploymentById);
  readonly updateDeploymentById = this.withDatabase(updateDeploymentById);

  constructor(
    readonly vercel: Vercel,
    ...args: ConstructorParameters<typeof Module>
  ) {
    super(...args);
  }
}
