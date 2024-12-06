import { ApiImpl } from "@saitamadotfun/utils";
import type { Asset } from "../models";

export class AssetApi extends ApiImpl {
  protected readonly path = "assets";

  list(query?: { [key in keyof Asset | (string & {})]?: string }) {
    return this.xior.get<Asset[]>(this.buildPathWithQuery(this.path, query));
  }

  create(files: ({ file: File } & Pick<Asset, "name" | "metadata">)[]) {
    const form = new FormData();
    for (const file of files)
      for (const [key, value] of Object.entries(file)) {
        if (value instanceof File) form.append(key, value);
        else form.append(key, JSON.stringify(value));
      }

    return this.xior.post<Asset[]>(this.path, form);
  }

  delete(id: Asset["id"]) {
    return this.xior.delete<Asset>(this.buildPath(id));
  }
}
