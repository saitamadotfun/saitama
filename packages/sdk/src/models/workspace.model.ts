import type { Asset } from "./asset.model";
import type { Member } from "./member.model";

export type WorkspaceSettings = {
  enableInviteLink: boolean;
  members: {
    joinAsEditor: boolean;
    joinOnlyWithGmail: boolean;
  };
  restrictEdit: boolean;
  openEditor: "everyone" | "members" | "gmail-users";
};
export type Workspace = {
  id: string;
  name: string;
  logo?: Asset;
  owner: string;
  members: Member[];
  settings?: WorkspaceSettings;
  createdAt: number;
  updatedAt: number;
};
