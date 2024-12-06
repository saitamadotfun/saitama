"use client";

import { createContext, useContext, useState } from "react";

import { Device, devices } from "../config/devices";

type Context = {
  device: (typeof devices)[number]["type"];
  setDevice: React.Dispatch<
    React.SetStateAction<(typeof devices)[number]["type"]>
  >;
  showControl: boolean;
  showLayer: boolean;
  setShowControl: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLayer: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContext = {
  device: Device.DESKTOP,
};

export const PreviewStateContext =
  createContext<Partial<Context>>(defaultContext);

export const PreviewStateProvider = ({ children }: React.PropsWithChildren) => {
  const [showLayer, setShowLayer] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [device, setDevice] = useState<(typeof devices)[number]["type"]>(
    Device.DESKTOP
  );

  return (
    <PreviewStateContext.Provider
      value={{
        device,
        setDevice,
        showControl,
        setShowControl,
        showLayer,
        setShowLayer,
      }}
    >
      {children}
    </PreviewStateContext.Provider>
  );
};

export const usePreviewState = () => useContext(PreviewStateContext) as Context;
