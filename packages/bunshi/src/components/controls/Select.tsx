import clsx from "clsx";
import { Fragment } from "react";
import { MdCheck, MdExpandMore } from "react-icons/md";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import {
  getLocaleValue,
  getPropsLocaleValueWithKey,
  type ListProps,
} from "../../lib";

import withLabel from "./WithLabel";
import type { ExtractListPropsValue } from "./type";

type Props<T extends ListProps["variants"]> = {
  value: ExtractListPropsValue<T[number]>;
  variants: T;
  onChange: (value: ExtractListPropsValue<T[number]>) => void;
};

export default withLabel(function Select<T extends ListProps["variants"]>({
  value,
  onChange,
  variants,
}: Props<T>) {
  const variant = variants.find(
    (variant) =>
      getLocaleValue(getPropsLocaleValueWithKey(variant, "value")) ===
      getLocaleValue(value)
  );

  return (
    <Listbox
      as="div"
      value={value}
      onChange={onChange}
      className="relative flex flex-col"
    >
      <ListboxButton className="flex items-center border border-black p-2 rounded">
        <div className="flex-1 text-start">
          {variant
            ? getPropsLocaleValueWithKey(variant, "title")
            : getLocaleValue(value)}
        </div>
        <MdExpandMore />
      </ListboxButton>
      <ListboxOptions className="absolute inset-x-0 -bottom-44 flex flex-col bg-black/5 backdrop-blur-3xl p-2 rounded-b-md">
        {variants.map((variant, index) => (
          <ListboxOption
            key={index}
            value={getPropsLocaleValueWithKey(variant, "value")}
            as={Fragment}
          >
            {({ focus, selected }) => (
              <button
                className={clsx(
                  "flex items-center space-x-2 p-2",
                  focus ? "bg-stone/20 rounded" : ""
                )}
              >
                {selected && <MdCheck />}
                <span className="flex-1 text-start">
                  {getPropsLocaleValueWithKey(variant, "title")}
                </span>
              </button>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
});
