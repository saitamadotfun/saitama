import type { User } from "./user.model";
import type { Workspace } from "./workspace.model";

export type Member = {
  id: string;
  user: User;
  workspace: Workspace;
  role: "editor" | "viewer" | "admin";
  createdAt: string;
  updatedAt: string;
};
