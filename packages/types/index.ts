export type Constructors =
  | String
  | Number
  | Boolean
  | Object
  | Array<unknown>
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ObjectConstructor
  | ArrayConstructor;

export type ReturnType<
  T extends Constructors | ((...args: unknown[]) => unknown)
> = T extends String
  ? string
  : T extends Number
  ? number
  : T extends Boolean
  ? boolean
  : T extends Array<any>
  ? T[number]
  : T extends (...args: unknown[]) => unknown
  ? globalThis.ReturnType<T>
  : T extends Object
  ? object
  : T;

export type NonNull<T> = {
  [key in keyof T]-?: Exclude<T[key], null | undefined>;
};

export type Transform<
  T,
  U extends Partial<{ [key in keyof T]: object }> & { [key: string]: object }
> = {
  [key in keyof T]: key extends keyof U ? U[key] : T[key];
} & Omit<U, keyof T>;

export type Partial<T extends object> = T extends object
  ? { [key in keyof T]?: T[key] extends object ? Partial<T[key]> : T[key] }
  : T;
