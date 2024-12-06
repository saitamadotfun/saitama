import { Fragment, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { getTitle } from "../../block";
import type { ArrayProps } from "../../lib";

import Control from "./Control";
import withLabel from "./WithLabel";
import type { ExtractArrayPropsValue } from "./type";

type Props<T extends ArrayProps> = {
  max?: number;
  min?: number;
  items: ArrayProps["items"];
  value: ExtractArrayPropsValue<T>;
  onChange: (value: ExtractArrayPropsValue<T>) => void;
};

export default withLabel(
  <T extends ArrayProps>({ max, min, items, value, onChange }: Props<T>) => {
    const [list, setList] = useState<ExtractArrayPropsValue<T>>(value);

    const onChildChange = (
      index: number,
      value: ExtractArrayPropsValue<T>[number]
    ) => {
      setList((list) => {
        if (list[index])
          list[index] =
            typeof value === "string" ? value : { ...list[index], ...value };
        else list.push(value);
        onChange(list);
        return list;
      });
    };

    const addChild = () => {
      if (max) if (list.length > max) return;
      setList((list) => {
        list =
          typeof value[0] === "string"
            ? list.concat(value[0])
            : list.concat({ ...value[0] });
        onChange(list);
        return list;
      });
    };

    const removeChild = (index: number) => {
      if (min) if (list.length < min) return;
      setList((list) => {
        const item = list.at(index);
        if (item)
          list = list.filter(
            (current, index) => current !== item && index === index
          );
        onChange(list);
        return list;
      });
    };

    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col divide-y">
          {list.map((list, childIndex) => (
            <Fragment key={childIndex}>
              {items.map((item, index) => (
                <Popover
                  key={index}
                  className="relative flex flex-col"
                >
                  <PopoverButton className="flex bg-black/2 pl-2 py-2  rounded-md text-start">
                    {item.title && getTitle(item.title, list)}
                    <div
                      className="ml-auto p-2 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        removeChild(childIndex);
                      }}
                    >
                      <MdDelete className="text-xl" />
                    </div>
                  </PopoverButton>
                  <PopoverPanel className="p-2 bg-black/2 shadow rounded-md">
                    <Control
                      key={index}
                      value={list}
                      onChange={(value) =>
                        onChildChange(childIndex + index, value)
                      }
                      {...item}
                    />
                  </PopoverPanel>
                </Popover>
              ))}
            </Fragment>
          ))}
        </div>
        <button
          className="flex items-center justify-center space-x-2 bg-black text-white p-2 rounded-md"
          onClick={addChild}
        >
          <span>Add Child</span>
          <MdAdd className="text-xl" />
        </button>
      </div>
    );
  }
);
