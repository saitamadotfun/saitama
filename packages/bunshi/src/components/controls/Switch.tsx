import { Switch } from "@headlessui/react";

import withLabel from "./WithLabel";

type SwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export default withLabel(
  function ({ value, onChange }: SwitchProps) {
    return (
      <div className="flex-1 flex items-center justify-end">
        <Switch
          checked={value}
          onChange={onChange}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-black"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
      </div>
    );
  },
  { inline: true, showDescription: true }
);
