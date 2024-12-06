import { ApiImpl } from "@saitamadotfun/utils";
import type { Asset, Member, Workspace } from "../models";

export class WorkspaceApi extends ApiImpl {
  protected readonly path = "workspaces";

  create(data: Pick<Workspace, "name" | "logo" | "settings">) {
    return this.xior.post<Workspace>(this.path, data);
  }

  list(query?: { [key in keyof Workspace | (string & {})]?: string }) {
    return this.xior.get<Workspace[]>(
      this.buildPathWithQuery(this.path, query)
    );
  }

  retrieve(id: Workspace["id"]) {
    return this.xior.get<Workspace>(this.buildPath(id));
  }

  update(
    id: Workspace["id"],
    data: Partial<Pick<Workspace, "name" | "settings"> & { logo: Asset["id"] }>
  ) {
    return this.xior.patch<Workspace>(this.buildPath(id), data);
  }

  delete(id: Workspace["id"]) {
    return this.xior.delete<Workspace>(this.buildPath(id));
  }

  invites(id: Workspace["id"], data: { emails: string[] }) {
    return this.xior.post<Member[]>(this.buildPath(id, "invites"), data);
  }
}
