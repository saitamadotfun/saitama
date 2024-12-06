export const Control = {
  input: "input",
  select: "select",
  radio: "radio",
  color: "color",
  switch: "switch",
  map: "map",
  list: "list",
  asset: "asset"
} as const;

export type Control = keyof typeof Control;
