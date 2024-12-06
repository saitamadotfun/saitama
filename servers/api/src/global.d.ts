import type {
  selectTokenSchema,
  selectUserSchema,
  selectWorkspaceSchema,
} from "./db/zod";

type User = Zod.infer<typeof selectUserSchema> & {
  token?: Zod.infer<typeof selectTokenSchema>;
  workspace?: Zod.infer<typeof selectWorkspaceSchema>;
};

declare module "fastify" {
  interface PassportUser extends User {}
}

declare module "@fastify/secure-session" {
  interface SessionData {
    "auth.token": tring;
  }
}
