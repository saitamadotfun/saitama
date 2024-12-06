import type { Key } from "./key";
import type { Block } from "./block";
import type { LocaleString } from "./locale";

export type Variable = {
  dark?: Variable | string;
  [key: string]: Variable | string | undefined;
};

export type LayerArgs = {
  key?: Key;
  title?: LocaleString;
  description?: LocaleString;
  children: Block[];
};

export type Layer<
  T extends ((
    props: React.PropsWithChildren & { className?: string }
  ) => React.ReactNode) &
    LayerArgs = ((
    props: React.PropsWithChildren & { className?: string }
  ) => React.ReactNode) &
    LayerArgs
> = T;
