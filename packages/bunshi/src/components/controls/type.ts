import {
  ArrayProps,
  ListProps,
  LocaleString,
  ObjectProps,
  Props,
  PureProps,
} from "../../lib";

type ConstructorReturnType<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : T extends BooleanConstructor
  ? boolean
  : never;

export type ExtractListPropsValue<T extends ListProps["variants"][number]> =
  T extends {
    title?: LocaleString;
    value: string;
  }
    ? T["value"]
    : T;

export type ExtractArrayPropsValue<T extends ArrayProps["items"][number]> =
  PropValue<T>[];

export type ExtractObjectPropsValue<T extends ObjectProps["keys"]> = {
  [key in keyof T]: PropValue<T[key]>;
};

export type PropValue<T extends Props> = T extends PureProps
  ? T["type"] extends String | Number | Boolean
    ? ConstructorReturnType<T["type"]>
    : string
  : T extends ListProps
  ? ExtractListPropsValue<T["variants"][number]>
  : T extends ObjectProps
  ? ExtractObjectPropsValue<T["keys"]>
  : T extends ArrayProps
  ? ExtractArrayPropsValue<T["items"][number]>
  : never;
