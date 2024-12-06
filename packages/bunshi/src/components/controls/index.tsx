import { useState } from "react";

import type { Block, ExtractProps } from "../../lib";
import { useLayer, usePreview } from "../../providers";

import { default as $Control } from "./Control";

type ControlProps<T extends Block> = {
  block: T;
  onPropChange: (
    key: string,
    value: ExtractProps<T["argsType"]>[keyof T["argsType"]]
  ) => void;
};

export const Control = <T extends Block>({
  block,
  onPropChange,
}: ControlProps<T>) => {
  const { layer } = useLayer();
  const { globalProps } = usePreview();
  const args = {
    ...block.args,
    ...globalProps?.get(layer.key)?.get(block.key),
  };

  return Object.entries(block.argsType).map(([propName, props], index) => {
    const defaultValue = args[propName];
    if (!props.title) props.title = propName;

    const [value, setValue] = useState(defaultValue);
    const onChange = (value: any) => {
      setValue(value);
      onPropChange(propName, value);
    };
    return (
      <$Control
        key={index}
        {...props}
        value={value}
        onChange={onChange}
      />
    );
  });
};
