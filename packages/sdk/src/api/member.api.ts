import { ApiImpl } from "@saitamadotfun/utils";
import type { Member, Workspace } from "../models";

export class MemberApi extends ApiImpl {
  protected readonly path = "members";

  create(data: Pick<Member, "user" | "role"> & { workspace: string }) {
    return this.xior.post<Member>(this.path, data);
  }

  update(
    workspace: Workspace["id"],
    id: Member["id"],
    data: Partial<Pick<Member, "role">>
  ) {
    return this.xior.patch<Member>(this.buildPath(workspace, id), data);
  }

  delete(workspace: Workspace["id"], id: Member["id"]) {
    return this.xior.delete<Member>(this.buildPath(workspace, id));
  }
}
