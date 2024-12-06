import { useEffect, useMemo, useState } from "react";

import { useLayer } from "../providers";
import { usePreview } from "../providers/PreviewProvider";
import type { ExtractPropsWithStyle } from "../lib";

import { Control } from ".";

type BlockProps<T extends import("../lib").Block> = {
  block: T;
};

export function Block<T extends import("../lib").Block>({
  block,
}: BlockProps<T> & React.PropsWithChildren) {
  const Block = block;

  const { layer } = useLayer();
  const { addControls, updateGlobalProps, globalProps } = usePreview<T[]>();

  const [props, setProps] = useState({
    ...block.args,
    style: block.style,
    ...globalProps?.get(layer.key)?.get(block.key),
  } as ExtractPropsWithStyle<T>);

  const controls = useMemo(
    () => () =>
      (
        <Control
          block={block}
          onPropChange={(key, value) => {
            setProps((props) => {
              const newProps = { ...props, [key]: value };
              return newProps;
            });
          }}
        />
      ),
    [block]
  );

  useEffect(() => {
    addControls(block.key, controls);
  }, [controls]);

  useEffect(() => {
    updateGlobalProps(block.key, props);
  }, [props]);

  return <Block {...(props as any)} />;
}
