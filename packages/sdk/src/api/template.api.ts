import { ApiImpl } from "@saitamadotfun/utils";
import type { Asset, Template } from "../models";

export class TemplateApi extends ApiImpl {
  protected readonly path = "templates";

  create(
    data: Omit<
      Template,
      "id" | "preview" | "user" | "createdAt" | "updatedAt"
    > & { preview: Asset["id"] }
  ) {
    return this.xior.post<Template>(this.path, data);
  }

  list(query?: { [key in keyof Template | (string & {})]?: string }) {
    return this.xior.get<Template[]>(this.buildPathWithQuery(this.path, query));
  }

  update(
    id: Template["id"],
    data: Partial<
      Omit<Template, "id" | "preview" | "user" | "createdAt" | "updatedAt"> & {
        preview: Asset["id"];
      }
    >
  ) {
    return this.xior.patch<Template>(this.buildPath(id), data);
  }

  delete(id: Template["id"]) {
    return this.xior.delete<Template>(this.buildPath(id));
  }
}
