import { join } from "path";
import type { FastifyInstance } from "fastify";

import type { Module } from "./module";

export abstract class Route<T extends Module> {
  protected abstract readonly path: string;

  constructor(protected readonly module: T, protected readonly fastify: FastifyInstance) {}

  abstract registerRoutes(): void;

  protected buildPath(...path: string[]) {
    return "/" + join(this.path, ...path);
  }
}
