import clsx from "clsx";
import { getLocaleValue, Key, type Layer, type LayerArgs } from "./lib";

import { Block } from "./components";

export const layer = <
  T extends (
    props: React.PropsWithChildren & { className?: string }
  ) => React.ReactNode,
  TLayer extends LayerArgs
>(
  component: T,
  layer: TLayer
) => {
  const render = (props: { className?: string }) => {
    const As = component;

    return (
      <As
        {...(props as any)}
        className={clsx(
          "touch-none cursor-zoom-in pointer-events-none",
          props.className
        )}
      >
        {layer.children.map((block, index) => {
          return (
            <Block
              key={index}
              block={block}
            />
          );
        })}
      </As>
    );
  };

  if (!layer.title) layer.title = component.name.replace(/[\s\d]+/g, "");
  if (!layer.key)
    layer.key = Key(getLocaleValue(layer.title).replace(/[\s\d]+/g, ""));

  Object.assign(render, layer);
  return render as unknown as Layer<T & TLayer>;
};
