import { array, object, string } from "zod";

export const workspaceInviteMemberSchema = object({
  emails: array(string().email()),
});
