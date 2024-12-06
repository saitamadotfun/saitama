import { ApiImpl } from "@saitamadotfun/utils";
import type { Collection } from "../models";

export class CollectionApi extends ApiImpl {
  protected readonly path = "collections";

  retrieve(id: Collection["id"]) {
    return this.xior.get<Collection>(this.buildPath(id));
  }

  update(id: string, value: Partial<Pick<Collection, "document">>) {
    return this.xior.patch(this.buildPath(id), value);
  }
}
