import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import type {
  Knob,
  Control,
  KnobProperties,
} from "../../lib/genshi/types/knob";

type KnobProps<T extends KnobProperties[keyof KnobProperties]> = Omit<
  Knob<KnobProperties>,
  "properties"
> & {
  name?: string;
  value: T;
  dialog?: boolean;
  lazy?: boolean;
};

export function Knob<T extends KnobProperties[keyof KnobProperties]>({
  name,
  dialog,
  lazy,
  value,
}: KnobProps<T>) {
  const isKnob = "properties" in value;

  if (isKnob) {
    // no need for another property to flag this
    // happy mistake
    if (lazy && value.lazy)
      return (
        <LazyKnob
          value={value}
          button={<PopoverButton>Lazy</PopoverButton>}
        />
      );
    else {
      const children = Object.entries(value.properties).map(
        ([name, control], index) => (
          <div
            key={index}
            className="flex flex-col space-y-2"
          >
            <Knob
              {...control}
              name={name}
              value={control}
            />
          </div>
        )
      );

      if (dialog) {
        const [open, setOpen] = useState(false);

        return (
          <DialogWrapper
            open={open}
            setOpen={setOpen}
          >
            {children}
          </DialogWrapper>
        );
      } else {
        return <>{children}</>;
      }
    }
  }

  if (Array.isArray(value.control)) {
    return (
      <div className="flex-1 flex space-x-4">
        {name && <span>{name}</span>}
        <div className="flex-1 flex space-x-2">
          {value.control.map((control, index) => (
            <Control
              key={index}
              value={control}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      {name && <span>{name}</span>}
      <div className="flex-1 flex flex-col">
        <Control value={value.control} />
      </div>
    </div>
  );
}

export const LazyKnob = <T extends Knob<KnobProperties>>({
  button,
  value,
}: {
  value: T;
} & Pick<React.ComponentProps<typeof LazyWrapper>, "button">) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [properties, setProperties] = useState(Object.keys(value.properties));

  return (
    <>
      <div>
        {keys.map((key, index) => {
          const property = value.properties[key];
          return (
            <div
              key={index}
              className="flex flex-col space-y-2"
            >
              <Knob
                {...property}
                name={key}
                value={property}
              />
            </div>
          );
        })}
      </div>

      <LazyWrapper
        button={button}
        properties={properties}
        onSelect={(key) => {
          setKeys((keys) => keys.concat([key]));
          setProperties((properties) =>
            properties.filter((value) => value !== key)
          );
        }}
      />
    </>
  );
};

const Control = function <T extends Control>({ value }: { value: T }) {
  switch (value.type) {
    case "input":
      return <div>Input</div>;
    case "custom":
      return <div>Custom</div>;
    case "radio":
      return <div>Radio</div>;
    case "select":
      return <div>Select</div>;
    case "slider":
      return <div>Slider</div>;
    default:
      return null;
  }
};

const DialogWrapper = ({
  open,
  setOpen,
  children,
}: React.PropsWithChildren & {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogPanel>{children}</DialogPanel>
    </Dialog>
  );
};

const LazyWrapper = ({
  button,
  properties,
  onSelect,
}: {
  button: React.ReactNode | ((properties: string[]) => React.ReactNode);
  properties: string[];
  onSelect: (key: string) => void;
}) => {
  return (
    <Popover className="relative">
      {typeof button === "function" ? button(properties) : button}
      <PopoverPanel className="flex flex-col space-y-2">
        {properties.map((key, index) => (
          <button
            key={index}
            className="flex"
            onClick={() => onSelect(key)}
          >
            {key}
          </button>
        ))}
      </PopoverPanel>
    </Popover>
  );
};
