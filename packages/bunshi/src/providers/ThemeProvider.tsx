"use client";
import { createContext, useContext } from "react";

import type { Breakpoint } from "../lib/stylex";

export type Context = {
  breakpoints: {
    [key in Breakpoint]: number;
  };
};

export const defaultTheme = {
  breakpoints: {
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536,
    "2xl": 1792,
    "3xl": 2048,
    "4xl": 2304,
    "5xl": 2560,
    "6xl": 2816,
    "7xl": 3042,
  },
};

export const ThemeContext = createContext<Context>(defaultTheme);

export function ThemeProvider({
  children,
  ...props
}: Partial<Context> & React.PropsWithChildren) {
  const value = { ...defaultTheme, ...props };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
