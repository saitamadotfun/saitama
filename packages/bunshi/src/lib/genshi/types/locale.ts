export const Locale = {
  en: "en",
  ru: "ru",
} as const;

export type Locale = keyof typeof Locale;

export type LocaleString = string | { [key in Locale]: string };

export type LocaleValue<T extends LocaleString> = T extends Record<Locale, any>
  ? T[keyof T]
  : T extends string
  ? T
  : never;
