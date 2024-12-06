export * from "./bumfi";
export * from "./vercel";

import { getSubdomain, getDomain } from "tldts";
import { StatusError } from "../core/error";

export const getOrigin = (origin: string) => {
  const subdomain = getSubdomain(origin);
  if (subdomain) return subdomain;
  else {
    const domain = getDomain(origin);
    if (domain) return domain.startsWith("www") ? domain : "www." + domain;
  }

  throw new StatusError(400, { origin: "Invalid origin format" });
};

export const reverseEnum = <T extends object>(value: T, status: T[keyof T]) => {
  const keys = Object.keys(value) as unknown as (keyof T)[];

  if (typeof status === "number") return keys[status - 1] as keyof T;
};
