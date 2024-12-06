import { Breakpoint } from "./breakpoints";
import { Gt, Gte, Lt, Lte } from "./types";

export const breakpoint = {
  eq: (value: Breakpoint) => value,
  lt: (value: Breakpoint) => `<${value}` satisfies Lt<Breakpoint>,
  lte: (value: Breakpoint) => `<=${value}` satisfies Lte<Breakpoint>,
  gt: (value: Breakpoint) => `>${value}` satisfies Gt<Breakpoint>,
  gte: (value: Breakpoint) => `>=${value}` as Gte<Breakpoint>,
  between: <T extends Breakpoint, U extends Exclude<Breakpoint, T>>(
    min: T,
    max: U
  ) => `${min}|${max}` as const,
};

export type Theme = {
  breakpoints: { [key in Breakpoint]: number };
};
