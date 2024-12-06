import type { Gt, Gte, Lt, Lte, Between } from "./types";

export const baseBreakpoints = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
] as const;

export const conditionalBreakponts = baseBreakpoints.flatMap(
  (breakpoint) =>
    [
      `>${breakpoint}`,
      `>=${breakpoint}`,
      `<${breakpoint}`,
      `<=${breakpoint}`,
    ] as const
);

export const extendedContionalBreakpoints = baseBreakpoints.flatMap(
  (breakpoint) => {
    const otherExcept = baseBreakpoints.filter((value) => value !== breakpoint);
    return otherExcept.map((value) => `${breakpoint}|${value}` as const);
  }
);

export const breakpoints = [
  ...baseBreakpoints,
  ...conditionalBreakponts,
  ...extendedContionalBreakpoints,
];

export type Breakpoint =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

export type Breakpoints =
  | Breakpoint
  | Gt<Breakpoint>
  | Gte<Breakpoint>
  | Lt<Breakpoint>
  | Lte<Breakpoint>
  | Between<typeof baseBreakpoints>;

export type StyleRule<T extends React.CSSProperties = React.CSSProperties> =
  T & {
    [key in Breakpoints]?: Partial<T>;
  };

export type StyleSheet = {
  [key: string]: StyleRule<React.CSSProperties>;
};

export type BreakpointToScreen = { [key in Breakpoint]: number };
