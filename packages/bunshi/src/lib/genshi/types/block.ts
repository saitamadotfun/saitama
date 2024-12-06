import type { Asset } from "@saitamadotfun/sdk";

import type { StyleSheet, Theme } from "../../stylex";

import type { Key } from "./key";
import type { Control } from "./control";
import type { LocaleString } from "./locale";

export type SharedProps = {
  title?: LocaleString | ((props: any) => React.ReactNode);
  description?: LocaleString;
  type?:
    | typeof String
    | typeof Number
    | typeof Object
    | typeof Number
    | typeof Boolean
    | React.ElementType;
};

export type PureProps = SharedProps & {
  control: Extract<Control, "color" | "switch">;
};

export type InputProps = SharedProps & {
  control: Extract<Control, "input">;
  type?: "text" | "number" | "email" | (string & {});
  inputType?: Extract<React.ElementType, "input" | "textarea">;
};

export type ListProps = SharedProps & {
  control: Extract<Control, "radio" | "select">;
  variants: ({ title: LocaleString; value: string } | string)[];
};

export type ArrayProps = SharedProps & {
  max?: number;
  min?: number;
  items: Props[];
  control: Extract<Control, "list">;
};

export type ObjectProps = SharedProps & {
  keys: Record<string, Props>;
  control: Extract<Control, "map">;
};

export type AssetProps = SharedProps & {
  control: Extract<Control, "asset">;
};

export type Props =
  | InputProps
  | ListProps
  | PureProps
  | ObjectProps
  | ArrayProps
  | AssetProps;

export type BlockArgs<
  TArgsType extends Record<string, Props>,
  TStyle extends ((theme: Theme) => StyleSheet) | StyleSheet
> = {
  key?: Key;
  style?: TStyle;
  argsType: TArgsType;
  title?: LocaleString;
  description?: LocaleString;
  args: Partial<ExtractProps<TArgsType>>;
};

export type Block = ((...args: any[]) => React.ReactNode) &
  BlockArgs<Record<string, Props>, StyleSheet>;

export type ComponentArgs<T extends BlockArgs<any, any>> = ExtractProps<
  T["argsType"]
> & {
  style: Exclude<T["style"], Record<string, any>>;
};

export type ExtractProps<T extends Record<string, Props>> = {
  [key in keyof T]: ExtractProp<T[key]>;
};

export type ExtractProp<T extends Props> = T extends PureProps
  ? T["control"] extends "color"
    ? string
    : T["control"] extends "switch"
    ? boolean
    : never
  : T extends InputProps
  ? string
  : T extends ListProps
  ?
      | Exclude<T["variants"][number], { title: LocaleString; value: string }>
      | Extract<
          T["variants"][number],
          { title: LocaleString; value: string }
        >["value"]
  : T extends ObjectProps
  ? {
      [innerKey in keyof T["keys"]]: ExtractProp<T["keys"][innerKey]>;
    }
  : T extends ArrayProps
  ? ExtractProp<T["items"][number]>[]
  : T extends AssetProps
  ? Pick<Asset, "uri" | "metadata"> & Partial<Omit<Asset, "uri" | "metadata">>
  : never;

export type ExtractPropsWithStyle<
  T extends BlockArgs<Record<string, Props>, StyleSheet>
> = ExtractProps<T["argsType"]> & { style: StyleSheet };
