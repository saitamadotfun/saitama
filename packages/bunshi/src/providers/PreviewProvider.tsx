"use client";

import React, { createContext, useContext, useState } from "react";

import type { ExtractProps, Layer, Block } from "../lib";

import { useLayer } from "./LayerProvider";
import { PreviewStateProvider } from "./PreviewStateProvider";

type Context<
  T extends Block[],
  K extends T[number]["key"] = T[number]["key"],
  V extends ExtractProps<T[number]["argsType"]> = ExtractProps<
    T[number]["argsType"]
  >
> = {
  globalProps: Map<Layer["key"], Map<K, V>>;
  updateGlobalProps: (name: K, props: V) => void;
  control?: (() => React.ReactNode)[];
  controls: Map<K, (() => React.ReactNode)[]>;
  addControls: (name: K, ...control: (() => React.ReactNode)[]) => void;
  currentBlock: T[number]["title"];
  setCurrentBlock: React.Dispatch<React.SetStateAction<T[number]["title"]>>;
};

export const PreviewContext = createContext<Partial<Context<any>>>({});

export function PreviewProvider<
  T extends Block[],
  K extends T[number]["key"] = T[number]["key"],
  V extends ExtractProps<T[number]["argsType"]> = ExtractProps<
    T[number]["argsType"]
  >
>({ children }: React.PropsWithChildren) {
  const { layer, selectedLayer } = useLayer();
  const [globalProps, setGlobalProps] = useState(
    new Map<Layer["key"], Map<K, V>>()
  );

  const [controls, setControls] = useState(
    new Map<K, (() => React.ReactNode)[]>()
  );

  const [currentBlock, setCurrentBlock] = useState(layer.children[0]?.key as K);
  const control = controls.get(currentBlock)!;

  const updateGlobalProps = (name: K, value: V) =>
    setGlobalProps((props) => {
      if (!selectedLayer) return props;

      let localProps = props.get(selectedLayer);
      if (!localProps) {
        localProps = new Map();
        props.set(selectedLayer, new Map());
      }
      localProps.set(name, value);
      return new Map(props);
    });

  const addControls = (name: K, ...value: (() => React.ReactNode)[]) =>
    setControls((props) => {
      props.set(name, value);
      return new Map(props);
    });

  return (
    <PreviewContext.Provider
      value={{
        control,
        currentBlock,
        setCurrentBlock,
        globalProps,
        updateGlobalProps,
        controls,
        addControls,
      }}
    >
      <PreviewStateProvider>{children}</PreviewStateProvider>
    </PreviewContext.Provider>
  );
}

export const usePreview = <T extends Block[]>() =>
  useContext(PreviewContext) as Context<T>;
