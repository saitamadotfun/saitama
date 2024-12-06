import type { IconType } from "react-icons";
import {
  IoDesktopOutline,
  IoLaptopOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";

export const Device = {
  DESKTOP: "desktop",
  LAPTOP: "laptop",
  MOBILE_PORTRAIT: "phone",
} as const;

export type Device = {
  type: (typeof Device)[keyof typeof Device];
  name: string;
  icon: IconType;
};

export const devices: Device[] = [
  {
    type: Device.DESKTOP,
    name: "Desktop",
    icon: IoDesktopOutline,
  },
  {
    type: Device.LAPTOP,
    name: "Laptop",
    icon: IoLaptopOutline,
  },
  {
    type: Device.MOBILE_PORTRAIT,
    name: "Phone",
    icon: IoPhonePortraitOutline,
  },
];

export const resolveDeviceClassName = (device: Device[keyof Device]) => {
  switch (device) {
    case Device.MOBILE_PORTRAIT:
      return ["phone", "!w-lg"];
    case Device.DESKTOP:
      return ["tablet", "!w-screen !lt-xl:w-7xl"];
    case Device.LAPTOP:
      return ["tablet", "laptop", "!w-screen !lt-xl:w-7xl"];
  }
};
