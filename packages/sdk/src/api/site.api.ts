import { ApiImpl } from "@saitamadotfun/utils";
import type { Partial } from "@saitamadotfun/types";

import type { Domain, Site } from "../models";
import type { Collection } from "../models/collection.model";

export class SiteApi extends ApiImpl {
  protected readonly path = "sites";

  list(query?: { [key in keyof Site | (string & {})]?: string }) {
    return this.xior.get<Site[]>(this.buildPathWithQuery(this.path, query));
  }

  retrieve(id: Site["id"]) {
    return this.xior.get<Site>(this.buildPath(id));
  }

  create(
    data: Pick<Site, "name" | "category"> &
      Pick<Domain, "origin"> & { template: string; workspace: string }
  ) {
    return this.xior.post<Site>(this.path, data);
  }

  update(
    id: Site["id"],
    data: Partial<
      Omit<Site, "id" | "user" | "payment" | "createdAt" | "updateAt">
    > & { payment?: string }
  ) {
    return this.xior.patch<Site>(this.buildPath(id), data);
  }

  delete(id: Site["id"]) {
    return this.xior.delete<Site>(this.buildPath(id));
  }

  sync(id: Site["id"], data: Pick<Collection, "document">) {
    return this.xior.put<Site>(this.buildPath(id, "sync"), data);
  }
}
