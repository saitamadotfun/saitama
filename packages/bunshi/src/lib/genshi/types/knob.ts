export type Select = {
  type: "select";
  options: (
    | string
    | { title: string | (() => React.ReactNode); value: string }
  )[];
};

export type Radio = {
  type: "radio";
  variants: (
    | string
    | { title: string | (() => React.ReactNode); value: string }
  )[];
};

export type Input = {
  type: "input";
};

export type Toggle = {
  type: "toggle";
  values?: [string, string];
};

export type Slider = {
  type: "slider";
  max: number;
  min: number;
};

export type Custom = {
  type: "custom";
  render: (args: any) => React.ReactNode;
};

export type Control = Select | Radio | Toggle | Input | Slider | Custom;

export type ControlValue<T extends Control> = T extends Input
  ? string
  : T extends Select
  ? T["options"][number]
  : T extends Radio
  ? T["variants"][number]
  : T extends Toggle
  ? T["values"] extends []
    ? T["values"][number]
    : boolean
  : T extends Slider
  ? number
  : T extends Custom
  ? unknown
  : never;

export type KnobValue<T extends KnobProperties[keyof KnobProperties]> =
  T extends Knob<any>
    ? T[keyof T] extends KnobProperties
      ? KnobValue<T[keyof T][keyof T[keyof T]]>
      : never
    : T extends { control: Control }
    ? ControlValue<T["control"]>
    : T extends { control: Control[] }
    ? ControlValue<T["control"][number]>
    : never;

export type KnobProperties = {
  [k: string]:
    | Knob<KnobProperties>
    | {
        control: Control | Control[];
      };
};

export type Knob<T extends KnobProperties> = {
  lazy?: boolean;
  dialog?: boolean;
  properties: {
    [key in keyof T]: T[key] & {
      transform?: (value: KnobValue<T[key]>) => void;
    };
  };
};
