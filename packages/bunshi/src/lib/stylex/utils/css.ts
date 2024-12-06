import styleObjectToCssString from "style-object-to-css-string";

import type { ClassName } from "../types";
import { breakpoints, type Breakpoints, type StyleRule } from "../breakpoints";

export const extractCSSPropertiesAndBreakpoints = <T extends StyleRule>(
  rule: T
) => {
  const style = {} as Omit<T, Breakpoints>;
  const styleBreakpoints = {} as Omit<T, keyof React.CSSProperties>;
  for (const [key, value] of Object.entries(rule)) {
    if (breakpoints.includes(key as Breakpoints))
      styleBreakpoints[key as keyof Omit<T, keyof React.CSSProperties>] = value;
    else style[key as keyof Omit<T, Breakpoints>] = value;
  }

  return [style, styleBreakpoints] as const;
};

export const createMediaQueryFromBreakpointStyle = <
  K extends Omit<StyleRule, keyof React.CSSProperties>,
  T extends { [key in keyof K]: number },
  U extends keyof K
>(
  theme: T,
  className: string,
  style: K
) => {
  return Object.entries(style)
    .map(([breakpoint, style]) => {
      const cssString = `{ .${className} { ${styleObjectToCssString(
        style
      )} } }`;

      if (breakpoint.startsWith(">=")) {
        const key = breakpoint.slice(2) as U;
        return `@media only screen and  (min-width: ${theme[key]}px) ${cssString}`;
      }

      if (breakpoint.startsWith("<=")) {
        const key = breakpoint.slice(2) as U;
        return `@media only screen and  (max-width: ${theme[key]}px) ${cssString}`;
      }

      if (breakpoint.startsWith(">")) {
        const key = breakpoint.slice(1) as U;
        return `@media only screen and  (min-width: ${
          theme[key] + 1
        }px) ${cssString}`;
      }

      if (breakpoint.startsWith("<")) {
        const key = breakpoint.slice(1) as U;
        return `@media only screen and  (max-width: ${
          theme[key] - 1
        }px) ${cssString}`;
      }

      if (breakpoint.includes("|")) {
        const [start, end] = breakpoint.split("|") as [U, U];
        return `@media only screen and  (min-width: ${
          theme[start]
        }px) and (max-width: ${theme[end] - 1}px) ${cssString}`;
      }

      return `@media only screen and  (min-width: ${
        theme[breakpoint as U]
      }px) ${cssString}`;
    })
    .join("\n");
};

export const getClassName = <T extends string>(className: T): ClassName<T> => {
  const names = className
    .split(/[\s>+]/)
    .map((name) => name.replace(/^\.|#/, "").split(/[:#\.\s>]+/)[0])
    .filter(Boolean);

  return names[names.length - 1] as ClassName<T>;
};
