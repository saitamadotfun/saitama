import { Module } from "../../core/module";
import {
  createMember,
  deleteMemberByWorkspaceAndId,
  updateMemberByWorkspaceAndId,
} from "./member.controller";

export class Member extends Module {
  readonly createMember = this.withDatabase(createMember);
  readonly updateMemberByWorkspaceAndId = this.withDatabase(
    updateMemberByWorkspaceAndId
  );
  readonly deleteMemberByWorkspaceAndId = this.withDatabase(
    deleteMemberByWorkspaceAndId
  );
}
