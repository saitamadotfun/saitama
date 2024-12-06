import z from "zod";

export const checkDomainExistSchema = z.object({
  origins: z.string().array(),
});
