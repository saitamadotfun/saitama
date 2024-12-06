import { ExtendedModule } from "../extended";
import {
  createWorkspace,
  createWorkspaceMemberByWorkspaceAndEmails,
  deleteWorkspaceByOwnerAndId,
  getWorkspaceByOwnerAndId,
  getWorkspacesByOwner,
  updateWorkspaceByOwnerAndId,
} from "./workspace.controller";

export class Workspace extends ExtendedModule {
  readonly createWorkspace = this.withDatabase(createWorkspace);
  readonly getWorkspaceByOwnerAndId = this.withDatabase(
    getWorkspaceByOwnerAndId
  );
  readonly getWorkspacesByOwner = this.withDatabase(getWorkspacesByOwner);
  readonly updateWorkspaceByOwnerAndId = this.withDatabase(
    updateWorkspaceByOwnerAndId
  );
  readonly deleteWorkspaceByOwnerAndId = this.withDatabase(
    deleteWorkspaceByOwnerAndId
  );

  readonly createWorkspaceMemberByWorkspaceAndEmails = this.withDatabase(
    createWorkspaceMemberByWorkspaceAndEmails
  );
}
