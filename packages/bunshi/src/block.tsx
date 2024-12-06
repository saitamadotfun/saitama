import { Key } from "./lib/genshi/key";
import {
  getClassName,
  getLocaleValue,
  type PureStyle,
  type StyleSheet,
  type Theme,
  type BlockArgs,
  type Props,
  type ComponentArgs,
  type SharedProps,
} from "./lib";
import { Style } from "./components/Style";
import { defaultTheme, useTheme } from "./providers";

export function getTitle(title: SharedProps["title"]): null;
export function getTitle(
  title: SharedProps["title"],
  args: Record<string, any>
): string;
export function getTitle(
  ...[title, args]: any[]
): string | React.ReactNode | null {
  return title instanceof Function
    ? args
      ? title(args)
      : null
    : getLocaleValue(title);
}

export const block = <
  T extends (
    props: Omit<ComponentArgs<TBlock>, "style"> & {
      style?: PureStyle<
        TStyle extends (theme: Theme) => StyleSheet
          ? ReturnType<TStyle>
          : TStyle
      >;
    }
  ) => JSX.Element,
  TProp extends Record<string, Props>,
  TStyle extends ((theme: Theme) => StyleSheet) | StyleSheet,
  TBlock extends BlockArgs<TProp, TStyle>
>(
  component: T,
  args: TBlock,
  theme?: Theme
) => {
  const styledComponent = ({ style, ...props }: ComponentArgs<TBlock>) => {
    const Component = component;
    if (typeof window !== "undefined" && "document" in window)
      theme = useTheme();
    theme = theme ?? defaultTheme;
    const $style: StyleSheet =
      typeof style === "function"
        ? style(theme!)
        : Object.create(style ?? null);

    return (
      <Style
        value={$style}
        breakpoints={theme!.breakpoints}
      >
        <Component
          {...({ ...args.args, ...props } as any)}
          style={Object.fromEntries(
            Object.keys($style).map((key) => {
              const className = getClassName(key);
              return [className, className];
            })
          )}
        />
      </Style>
    );
  };

  if (!args.title) args.title = component.name.replace(/[\s\d]+/g, "");
  if (!args.key)
    args.key = Key(getLocaleValue(args.title).replace(/[\s\d]+/g, ""));

  Object.assign(styledComponent, args);

  return styledComponent as unknown as T & TBlock;
};
