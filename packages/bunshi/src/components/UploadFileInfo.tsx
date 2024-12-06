import { MdEdit } from "react-icons/md";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export type FileInfo = {
  name: string;
  metadata: Record<"alt", string>;
};

type UploadFileInfoProps = {
  value: FileInfo;
  onChange: (value: FileInfo) => void;
};

export default function UploadFileInfo({
  value,
  onChange,
}: UploadFileInfoProps) {
  return (
    <Popover>
      <PopoverButton className="p-2">
        <MdEdit className="text-xl" />
      </PopoverButton>
      <PopoverPanel className="absolute left-16 flex flex-col space-y-2 bg-white p-2 rounded-md shadow-sm border z-20">
        <div className="flex flex-col space-y-2">
          <label>Name</label>
          <input
            value={value.name}
            placeholder="File name"
            className="border border-black p-2 rounded placeholder:text-black/75"
            onChange={(event) => {
              const name = event.target.value;
              onChange({
                ...value,
                name,
              });
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Alt</label>
          <input
            value={value.metadata.alt}
            placeholder="File alt"
            className="border border-black p-2 rounded placeholder:text-black/75"
            onChange={(event) => {
              const alt = event.target.value;
              onChange({
                ...value,
                metadata: { ...value.metadata, alt },
              });
            }}
          />
        </div>
      </PopoverPanel>
    </Popover>
  );
}
