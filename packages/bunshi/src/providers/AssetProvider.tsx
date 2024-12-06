"use client";

import type { Asset } from "@saitamadotfun/sdk";
import { createContext, useContext } from "react";

import { FileInfo } from "../components/UploadFileInfo";

type Context = {
  assets: Asset[];
  onUpload: (files: ({ file: File } & FileInfo)[]) => Promise<unknown>;
};

export const AssetContext = createContext<Context>({
  assets: [],
  onUpload: async () => void 0,
});

export function AssetProvider({
  children,
  ...props
}: Context & React.PropsWithChildren) {
  return (
    <AssetContext.Provider value={props}>{children}</AssetContext.Provider>
  );
}

export const useAsset = () => useContext(AssetContext);
