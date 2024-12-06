import { MdAdd } from "react-icons/md";
import { PopoverButton } from "@headlessui/react";

import { Knob, LazyKnob } from "./components/knobs/MapKnob";
import type { KnobProperties } from "./lib/genshi/types/knob";

type KnobArgs = {
  // @ts-ignore
  [key: string]: import("./lib").Knob<KnobProperties>;
};

export const knobs = <T extends KnobArgs>(args: T) => {
  const component = () => (
    <div className="flex flex-col space-y-6">
      {Object.entries(args).map(([name, knob], index) => {
        const header = (
          <span className="flex-1 first-letter:capitalize">{name}</span>
        );

        return (
          <div
            key={index}
            className="flex flex-col space-y-4"
          >
            {knob.lazy ? (
              <LazyKnob
                value={knob}
                button={(properties) =>
                  properties.length > 0 ? (
                    <PopoverButton className="flex space-x-4 items-center">
                      {header}
                      <MdAdd />
                    </PopoverButton>
                  ) : (
                    header
                  )
                }
              />
            ) : (
              header
            )}
            <div className="flex flex-col space-y-2">
              <Knob
                name={name}
                value={knob}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return component as unknown as T & typeof component;
};
