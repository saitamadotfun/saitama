import { z } from "zod";

export const signInWithIdTokenSchema = z.object({
  idToken: z.string(),
});

export const signInWithIdTokenQuerySchema = z.object({
  siteId: z.string().nullable(),
});
