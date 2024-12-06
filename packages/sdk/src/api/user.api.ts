import { ApiImpl } from "@saitamadotfun/utils";
import type { User } from "../models";

export class UserApi extends ApiImpl {
  protected readonly path = "users";

  create(data: Omit<User, "id">) {
    return this.xior.post<User>(this.path, data);
  }

  retrieve(id: User["id"]) {
    return this.xior.get<User>(this.buildPath(id));
  }

  update(id: User["id"], data: Omit<User, "id" | "uuid">) {
    return this.xior.patch(this.buildPath(id), data);
  }

  delete(id: User["id"]) {
    return this.xior.delete<User>(this.buildPath(id));
  }
}
