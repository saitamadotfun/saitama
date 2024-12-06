import type { ListProps, Locale } from "../lib";

export const getLocaleValue = <T extends { [key in Locale]: string }>(
  arg?: T | string,
  locale: keyof T = "en"
) => {
  if (typeof arg === "string") return arg;
  else if (arg) return arg[locale];
};

export const getPropsLocaleValueWithKey = <
  T extends ListProps["variants"][number]
>(
  value: T | undefined,
  key: T extends object ? keyof T : undefined
) => {
  if (typeof value === "string") return value;
  else if (value && key) return value[key as keyof T];
};
