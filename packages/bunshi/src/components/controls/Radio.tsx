import clsx from "clsx";
import { Fragment } from "react";
import { Field, RadioGroup, Radio } from "@headlessui/react";

import { getPropsLocaleValueWithKey, ListProps } from "../../lib";

import withLabel from "./WithLabel";
import type { ExtractListPropsValue } from "./type";

type Props<T extends ListProps["variants"]> = {
  value: ExtractListPropsValue<T[number]>;
  variants: T;
  onChange: (value: ExtractListPropsValue<T[number]>) => void;
};

export default withLabel(function <T extends ListProps["variants"]>({
  value,
  variants,
  onChange,
}: Props<T>) {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="flex flex-col"
    >
      {variants.map((option, index) => (
        <Field key={index}>
          <Radio
            value={getPropsLocaleValueWithKey(option, "value")}
            as={Fragment}
          >
            {({ checked }) => (
              <div className="flex items-center space-x-2 py-2 cursor-pointer">
                <span
                  className={clsx(
                    "group size-6 flex items-center justify-center rounded-full border border-black/50  transition",
                    checked ? "bg-black" : "bg-transparent"
                  )}
                >
                  {checked && <span className="size-3 rounded-full bg-white" />}
                </span>
                <span>{getPropsLocaleValueWithKey(option, "title")}</span>
              </div>
            )}
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
});
