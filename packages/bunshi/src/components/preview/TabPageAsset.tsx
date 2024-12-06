import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";

import { usePreviewState } from "../../providers";

import TabPage from "./TabPage";
import TabAsset from "./TabAsset";

type TabPageAssetProps = {
  className: string;
};

export default function TabPageAsset({ className }: TabPageAssetProps) {
  const { setShowLayer } = usePreviewState();
  const tabs = ["Page", "Assets"];

  return (
    <TabGroup className={className}>
      <div className="md:flex-1 lt-md:h-[80vh] lt-md:bg-white lt-md:mt-auto lt-md:rounded-t-md lt-md:overflow-y-scroll">
        <div className="bg-black/5 md:hidden">
          <div>
            <button
              className="p-4"
              onClick={() => setShowLayer(false)}
            >
              Close
            </button>
          </div>
        </div>
        <TabList className="flex bg-black/2 p-2">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              as={Fragment}
            >
              {({ selected }) => (
                <button
                  className={clsx(
                    "flex-1 p-2 rounded",
                    selected ? "!bg-black text-white" : ""
                  )}
                >
                  {tab}
                </button>
              )}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPage />
          <TabAsset />
        </TabPanels>
      </div>
    </TabGroup>
  );
}
