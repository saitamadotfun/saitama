import clsx from "clsx";
import { useState } from "react";
import {
  MdClose,
  MdEdit,
  MdRocketLaunch,
} from "react-icons/md";

import type { ExtractProps } from "../../lib";
import { devices } from "../../config/devices";
import { usePreview, usePreviewState } from "../../providers";

type PreviewToolbarProps<T extends ExtractProps<never>> = {
  onClose: () => void;
  onExport: (value: Map<T["key"], T>) => Promise<unknown>;
};

export default function PreviewToolbar<T extends ExtractProps<never>>({
  onClose,
  onExport,
}: PreviewToolbarProps<T>) {
  const { globalProps } = usePreview();
  const { device, setDevice, setShowLayer } = usePreviewState();

  const [loading, setLoading] = useState(false);

  const exportProps = () => {
    setLoading(true);
    return onExport(globalProps as T).finally(() => setLoading(false));
  };

  return (
    <header className="flex space-x-4 pr-2 py-2 shadow-sm  md:px-4">
      <div className="flex-1 flex space-x-2">
        <button
          className="text-xl p-2"
          onClick={onClose}
        >
          <MdClose />
        </button>
        <div className="flex-1 flex items-center justify-center">
         <div className="flex items-center justify-center space-x-2 bg-black/5 rounded">
         {devices.map(({ icon, type }, index) => {
            const Icon = icon;
            const active = type === device;

            return (
              <button
                key={index}
                className={clsx(
                  "flex flex-col items-center space-y-2 p-2",
                  active ? "bg-black text-white rounded-md" : ""
                )}
                onClick={() => setDevice(type)}
              >
                <Icon className="text-xl" />
              </button>
            );
          })}
         </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="flex items-center space-x-2 bg-black/10 px-4 rounded-md md:hidden"
          onClick={() => setShowLayer(true)}
        >
          <MdEdit className="text-xl" />
          <span>Edit</span>
        </button>
        <button
          disabled={loading}
          className="min-w-24 md:min-w-40 flex justify-center items-center space-x-2 bg-black text-white p-2 rounded"
          onClick={exportProps}
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white !border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <MdRocketLaunch className="text-xl" />
              <span>Publish</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
