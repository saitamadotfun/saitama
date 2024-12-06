export const categories = [
  "defi",
  "entertainment",
  "meme",
  "nfts",
  "ai",
  "depin",
  "gaming",
  "rehypo",
] as const;

export type Category = (typeof categories)[number];

export type DeploymentStatus =
  | "CANCELED"
  | "ERROR"
  | "QUEUED"
  | "BUILDING"
  | "INITIALIZING"
  | "READY";
