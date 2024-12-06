import type { Rest } from "../types";
import { type Database } from "../db";

export abstract class Module {
  constructor(readonly database: Database) {}

  protected withDatabase<
    T extends (database: Database, ...args: any[]) => Promise<unknown>
  >(fn: T) {
    return (...args: Rest<Parameters<T>>) =>
      fn(this.database, ...args) as ReturnType<T>;
  }
}
