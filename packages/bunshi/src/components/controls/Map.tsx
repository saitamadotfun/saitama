import { useEffect, useState } from "react";

import type { Block, ExtractProps, ObjectProps } from "../../lib";

import Control from "./Control";
import withLabel from "./WithLabel";

type Props<T extends Block> = {
  value: ExtractProps<T["argsType"]>;
  onChange: (value: T) => void;
  keys: ObjectProps["keys"];
};

export default withLabel(
  <T extends Block>({ value, onChange, keys }: Props<T>) => {
    const [record, setRecord] = useState<Record<string, any>>(value ?? {});

    useEffect(() => {
      onChange(record as T);
    }, [record]);

    return Object.entries(keys).map(([key, value], index) => {
      const onChange = (value: any) => {
        setRecord((record) => {
          record[key] = value;
          return { ...record };
        });
      };

      if (!value.title) value.title = key;

      return (
        <Control
          key={index}
          value={record[key]}
          onChange={onChange}
          {...value}
        />
      );
    });
  }
);
