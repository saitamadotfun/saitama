"use client";
import clsx from "clsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import type { ExtractProps, Block } from "../../lib";
import { useLayer } from "../../providers/LayerProvider";
import { usePreview, usePreviewState } from "../../providers";
import { resolveDeviceClassName } from "../../config/devices";

import TabPageAsset from "./TabPageAsset";
import PreviewToolbar from "./PreviewToolbar";

type PreviewProps<
  T extends Block[],
  U = ExtractProps<T[number]["argsType"]>
> = {
  onClose: () => void;
  onExport: (props: Map<T[number]["key"], U[keyof U]>) => Promise<unknown>;
};

export const Preview = <T extends Block[]>({
  onClose,
  onExport,
}: PreviewProps<T>) => {
  const { layer } = useLayer();
  const { control } = usePreview();
  const { showLayer, showControl, setShowControl, device } = usePreviewState();

  const Layer = layer;

  return (
    <main className="flex-1 flex flex-col overflow-y-scroll editor">
      <PreviewToolbar
        onClose={onClose}
        onExport={onExport}
      />
      <div className="flex-1 flex overflow-y-scroll">
        <TabPageAsset
          className={clsx(
            "flex flex-col md:w-xs md:bg-white shadow-sm",
            showLayer
              ? "lt-md:fixed lt-md:inset-0 lt-md:z-10 lt-md:bg-black/50"
              : "lt-md:hidden"
          )}
        />
        <div
          className={clsx(
            "!flex-1 flex flex-col !bg-black/5 overflow-scroll",
            resolveDeviceClassName(device)
          )}
        >
          <TransformWrapper
            disablePadding={true}
            centerOnInit={true}
            centerZoomedOut={true}
            minScale={0.5}
          >
            <TransformComponent>
              <Layer className="overflow-y-scroll overflow-x-hidden scale-75 -translate-y-64" />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div
          className={clsx(
            "flex flex-col space-y-4  md:py-2 md:w-sm  max-h-screen",
            showControl && showLayer
              ? "lt-md:fixed lt-md:inset-0 lt-md:z-20 lt-md:bg-black/50"
              : "lt-md:hidden"
          )}
        >
          {control && (
            <div className="flex flex-col  bg-white overflow-y-scroll lt-md:mt-auto lt-md:rounded-t-md lt-md:max-h-[85vh]">
              <div className=" md:hidden">
                <div>
                  <button
                    className="p-4"
                    onClick={() => setShowControl(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-4 p-4">
                <div>
                  <span className="text-base font-medium">Props</span>
                </div>
                {control.map((control, index) => {
                  const Control = control;
                  return <Control key={index} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
