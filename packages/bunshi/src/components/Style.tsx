import styleObjectToCSSString from "style-object-to-css-string";

import type { BreakpointToScreen, StyleSheet } from "../lib";
import {
  createMediaQueryFromBreakpointStyle,
  extractCSSPropertiesAndBreakpoints,
} from "../lib";

type Props<T extends StyleSheet> = {
  value: T;
  breakpoints: BreakpointToScreen;
};

export function Style<T extends StyleSheet>({
  children,
  breakpoints,
  value,
}: Props<T> & React.PropsWithChildren) {
  const style = Object.entries(value)
    .map(([className, rule]) => {
      const [style, styleBreakpoints] =
        extractCSSPropertiesAndBreakpoints(rule);
      return (
        `.${className} { ${styleObjectToCSSString(style)} } \n` +
        createMediaQueryFromBreakpointStyle(
          breakpoints,
          className,
          styleBreakpoints
        )
      );
    })
    .join("\n");

  return (
    <>
      {style.replace(/\s+/, "").trim().length > 0 && <style>{style}</style>}
      {children}
    </>
  );
}
