import type { Vercel } from "../../lib";
import { Module } from "../../core/module";
import {
  deleteDomainByUserAndId,
  domainsExist,
  getDomainByUserAndId,
  getDomainsByUser,
  updateDomainByUserAndId,
} from "./domain.controller";

export class Domain extends Module {
  readonly domainsExist = this.withDatabase(domainsExist);
  readonly getDomainsByUser = this.withDatabase(getDomainsByUser);
  readonly getDomainByUserAndId = this.withDatabase(getDomainByUserAndId);
  readonly updateDomainByUserAndId = this.withDatabase(updateDomainByUserAndId);
  readonly deleteDomainByUserAndId = this.withDatabase(deleteDomainByUserAndId);

  constructor(
    readonly vercel: Vercel,
    ...args: ConstructorParameters<typeof Module>
  ) {
    super(...args);
  }
}
