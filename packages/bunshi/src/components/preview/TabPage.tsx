import clsx from "clsx";
import { FaRegFile } from "react-icons/fa";
import { TabPanel } from "@headlessui/react";
import { IoSquareOutline } from "react-icons/io5";

import { getLocaleValue } from "../../lib";
import { useLayer, usePreview, usePreviewState } from "../../providers";

export default function TabPage() {
  const { setShowControl } = usePreviewState();
  const { setCurrentBlock, currentBlock } = usePreview();
  const { layers, selectLayer, selectedLayer, layer } = useLayer();

  return (
    <TabPanel className="flex flex-col">
      <div className="flex flex-col space-y-4 p-4 border-b shadow-sm">
        <div className="text-base font-medium">Page</div>
        <div className="flex flex-col space-y-2">
          {Array.from(layers.values()).map((layer, index) => {
            const active = selectedLayer === layer.key;

            return (
              <button
                key={index}
                className={clsx(
                  "flex items-center space-x-2 border p-1 rounded",
                  active
                    ? "border-black text-black"
                    : "border-black/50 text-black/50"
                )}
                onClick={() => selectLayer(layer.key)}
              >
                <FaRegFile />
                <span className="text-sm md:text-base">
                  {getLocaleValue(layer.title)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-4">
        {layer.children.map((block, index) => {
          const active = currentBlock === block.key;

          return (
            <button
              key={index}
              className={clsx(
                "flex items-center space-x-2 p-2",
                active ? "bg-black/5 rounded" : "hover:bg-black/2 hover:rounded"
              )}
              onClick={() => {
                setCurrentBlock(block.key);
                setShowControl(true);
              }}
            >
              <IoSquareOutline className="rotate-45" />
              <p className="text-sm md:text-base">
                {getLocaleValue(block.title)}
              </p>
            </button>
          );
        })}
      </div>
    </TabPanel>
  );
}
