"use client";

import { createContext, useContext, useState } from "react";

import type { Layer } from "../lib";

type Context<T extends Layer[]> = {
  layers: Map<T[number]["key"], T[number]>;
  layer: T[number];
  selectedLayer: T[number]["key"];
  selectLayer: React.Dispatch<React.SetStateAction<T[number]["key"]>>;
};

export const LayerContext = createContext<Partial<Context<any>>>({});

type Props<T extends Layer[]> = {
  layers: T;
};

export const LayerProvider = <T extends Layer[]>({
  layers,
  children,
}: Props<T> & React.PropsWithChildren) => {
  const [$layers] = useState(
    new Map(layers.map((layer) => [layer.key, layer]))
  );
  const [selectedLayer, selectLayer] = useState(layers[0].key);
  const layer = $layers.get(selectedLayer);

  return (
    <LayerContext.Provider
      value={{
        layer,
        selectedLayer,
        selectLayer,
        layers: $layers,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};

export const useLayer = <T extends Layer[]>() =>
  useContext(LayerContext) as Context<T>;
