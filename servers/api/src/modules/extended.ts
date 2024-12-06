import { Module } from "../core/module";
import type { Bumfi, Vercel } from "../lib";

export class ExtendedModule extends Module {
  constructor(
    readonly vercel: Vercel,
    readonly bumfi: Bumfi,
    ...args: ConstructorParameters<typeof Module>
  ) {
    super(...args);
  }
}
