import { filesize } from "filesize";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRef, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { MdClose, MdDelete } from "react-icons/md";

import UploadFileInfo, { type FileInfo } from "./UploadFileInfo";

type UploadDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUpload: (files: ({ file: File } & FileInfo)[]) => Promise<unknown>;
};

export default function UploadDialog({
  open,
  setOpen,
  onUpload,
}: UploadDialogProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<({ file: File } & FileInfo)[]>([]);
  const input = useRef<HTMLInputElement | null>(null);

  const removeFile = (index: number) => () => {
    setFiles((files) => {
      const file = files.at(index);
      return files.filter((value) => value !== file);
    });
  };

  return (
    <Dialog
      className="relative z-20"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/20" />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="relative flex flex-col space-y-4 bg-white px-4 w-sm h-sm rounded-md overflow-y-scroll">
          <div className="flex flex-col space-y-4">
            <header className="flex items-center  py-4 sticky top-0 bg-white">
              <DialogTitle className="flex-1 text-lg font-medium">
                Upload File
              </DialogTitle>
              <div className="flex items-center space-x-2">
                {files.length > 0 && (
                  <button
                    disabled={isSubmitting}
                    className="flex items-center justify-center px-4 py-1 bg-black text-white rounded min-w-20"
                    onClick={() => {
                      setSubmitting(true);
                      return onUpload(files)
                        .then(() => setFiles([]))
                        .finally(() => setSubmitting(false));
                    }}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Save</>
                    )}
                  </button>
                )}
                <button
                  className="p-2"
                  onClick={() => setOpen(false)}
                >
                  <MdClose className="text-xl text-black/75" />
                </button>
              </div>
            </header>
            <div className=" flex flex-col space-y-4">
              <div className="min-h-48 flex flex-col items-center justify-center space-y-4 border border-dashed border-black/50 rounded">
                <IoCloudUpload className="text-4xl" />
                <div className="flex flex-col text-center">
                  <h1>
                    Drop your file here, or&nbsp;
                    <button
                      className="underline underline-black"
                      onClick={() => {
                        if (input.current) input.current.click();
                      }}
                    >
                      Browse
                    </button>
                  </h1>
                  <p className="text-sm text-black/75">Maximum file size 5MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col divide-y">
            {files.map((file, index) => {
              return (
                <div
                  key={index}
                  className="reltive flex items-center space-x-2 p-2"
                >
                  <img
                    src={URL.createObjectURL(file.file)}
                    className="w-12 h-12 rounded"
                    width={48}
                    height={48}
                  />
                  <div className="flex-1">
                    <p>{file.name}</p>
                    <p className="text-sm">{filesize(file.file.size)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UploadFileInfo
                      value={file}
                      onChange={(value) => {
                        const blob = file.file.slice(0, file.file.size);
                        const updatedFile = {
                          file: new File([blob], value.name),
                          ...value,
                        };
                        setFiles((files) => {
                          files[index] = updatedFile;
                          return [...files];
                        });
                      }}
                    />
                    <button className="p-2">
                      <MdDelete
                        className="text-xl"
                        onClick={removeFile(index)}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogPanel>
      </div>
      <input
        ref={input}
        hidden={true}
        type="file"
        accept="image/*"
        multiple={true}
        onChange={(event) => {
          const fileList = event.target.files;
          if (fileList)
            setFiles([
              ...files,
              ...Array.from(fileList).map((file) => ({
                file,
                metadata: { alt: "" },
                name: file.name,
              })),
            ]);
        }}
      />
    </Dialog>
  );
}
