import { ApiImpl } from "@saitamadotfun/utils";
import type { Domain, DomainExist } from "../models";

export class DomainApi extends ApiImpl {
  protected readonly path = "domains";

  list(query?: { [key in keyof Domain | (string & {})]?: string }) {
    return this.xior.get<Domain[]>(this.buildPathWithQuery(this.path, query));
  }

  delete(id: Domain["id"]) {
    return this.xior.delete<Domain>(this.buildPath(id));
  }

  checkExists(...origins: string[]) {
    return this.xior.post<DomainExist[]>(this.buildPath("exists"), { origins });
  }
}
