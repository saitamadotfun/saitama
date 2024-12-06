import { useState } from "react";
import { MdAdd, MdCheckCircle } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import type { Asset } from "@saitamadotfun/sdk";

import UploadDialog from "../UploadDialog";
import { useAsset } from "../../providers/AssetProvider";
import clsx from "clsx";

type Props = {
  as?: React.ElementType;
  className?: string;
  value?: Asset;
  onSelect?: (value: Asset) => void;
};

export default function AssetPanel({ value, as, onSelect, className }: Props) {
  const { assets, onUpload } = useAsset();
  const [open, setOpen] = useState(false);

  const Wrapper = as ?? "div";

  return (
    <>
      <Wrapper className={clsx("flex flex-col space-y-4 p-2", className)}>
        {assets.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
            {assets.map((asset) => {
              const isSelected = value && asset.id === value.id;

              return (
                <div
                  key={asset.id}
                  className="relative flex flex-col w-full h-32 bg-black/5 cursor-pointer"
                  onClick={() => {
                    if (onSelect) onSelect(asset);
                  }}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-3 h-3 bg-white rounded-full" />
                        <MdCheckCircle className="absolute text-black" />
                      </div>
                    </div>
                  )}
                  <img
                    src={asset.uri}
                    className="w-full h-full rounded"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 min-h-48">
            <div>
              <FaRegFile className="text-2xl" />
            </div>
            <div className="flex flex-col text-center">
              <h1 className="text-lg font-medium">No asset found</h1>
              <p className="text-sm text-black/75">
                Upload an asset, it will show here.
              </p>
            </div>
          </div>
        )}
        <button
          className="flex items-center justify-center space-x-2 bg-black text-white p-2 rounded"
          onClick={() => setOpen(true)}
        >
          <MdAdd className="text-xl" />
          <span>Add file</span>
        </button>
      </Wrapper>
      <UploadDialog
        open={open}
        setOpen={setOpen}
        onUpload={onUpload}
      />
    </>
  );
}
