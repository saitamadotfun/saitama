export type Gt<T extends string> = `>${T}`;
export type Gte<T extends string> = `>=${T}`;
export type Lt<T extends string> = `<${T}`;
export type Lte<T extends string> = `<=${T}`;
export type Between<T extends readonly string[]> = T extends readonly [
  infer F extends string,
  ...infer R extends readonly string[]
]
  ? `${F}|${R[number]}` | Between<R>
  : never;

export type PseudoDelimeters = "::" | ":";
export type SelectorDelimeters = "." | "#";

export type ClassName<
  T extends unknown,
  Selector extends string = SelectorDelimeters,
  Pseudo extends string = PseudoDelimeters
> = T extends `${Selector}${string} ${infer Rest extends string}`
  ? ClassName<Rest, Selector, Pseudo>
  : T extends `${Selector}${infer U extends string}${Pseudo}${string}`
  ? U
  : T extends `${Selector}${string}${Selector}${infer Rest extends string}`
  ? Rest
  : T extends `${Selector}${infer U extends string}`
  ? U
  : T;

export type PureStyle<T extends object | undefined | null> = {
  [key in ClassName<keyof T>]: string;
};
