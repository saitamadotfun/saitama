import { MdImage } from "react-icons/md";
import type { Asset } from "@saitamadotfun/sdk";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import AssetPanel from "../shared/AssetPanel";

import withLabel from "./WithLabel";

type Props = {
  value?: Asset;
  onChange: (value: Asset) => void;
};

export default withLabel(function Asset({ value, onChange }: Props) {
  return (
    <Popover className="flex flex-col">
      <PopoverButton className="flex items-center space-x-2 border border-black rounded p-2">
        {value ? (
          <>
            <img
              src={value.uri}
              alt={value.metadata?.alt}
              width={32}
              height={32}
              className="size-6 rounded object-cover"
            />
            <div>{value.name ?? value.metadata?.alt}</div>
          </>
        ) : (
          <>
            <MdImage className="text-xl" />
            <span>Select an asset</span>
          </>
        )}
      </PopoverButton>
      <AssetPanel
        as={PopoverPanel}
        value={value}
        onSelect={onChange}
        className="shadow rounded-md"
      />
    </Popover>
  );
});
