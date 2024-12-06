import { knobs } from "../../knob";

//const sizeOptions = ["fixed", "relative", "fill", "fit-content"] as const;

export const StyleKnob = knobs({
  position: {
    properties: {
      position: {
        control: {
          type: "select",
          options: ["absolute", "fixed", "relative", "sticky", "static"],
        },
      },
    },
  },
  size: {
    properties: {
      width: {
        control: [
          { type: "input" },
          {
            type: "select",
            options: ["fixed", "relative", "fill", "fit-content"],
          },
        ],
      },
      height: {
        control: [
          { type: "input" },
          {
            type: "select",
            options: ["fixed", "relative", "fill", "fit-content"],
          },
        ],
      },
      grow: {
        control: {
          type: "radio",
          variants: [
            {
              title: () => <div />,
              value: "",
            },
            {
              title: () => <div />,
              value: "",
            },
            {
              title: () => <div />,
              value: "",
            },
          ],
        },
      },
      minMax: {
        lazy: true,
        properties: {
          minWidth: {
            control: [
              { type: "input" },
              { type: "select", options: ["fixed", "relative"] },
            ],
          },
          maxWidth: {
            control: [
              { type: "input" },
              { type: "select", options: ["fixed", "relative"] },
            ],
          },
          minHeight: {
            control: [
              { type: "input" },
              { type: "select", options: ["fixed", "relative"] },
            ],
          },
          maxHeight: {
            control: [
              { type: "input" },
              { type: "select", options: ["fixed", "relative"] },
            ],
          },
        },
      },
    },
  },
  effects: {
    lazy: true,
    properties: {
      text: {
        dialog: true,
        properties: {},
      },
    },
  },
  overlays: {
    properties: {},
  },
  cursor: {
    lazy: true,
    properties: {},
  },
  styles: {
    lazy: true,
    properties: {
      opacity: {
        control: [{ type: "input" }, { type: "slider", min: 0, max: 1 }],
      },
      visible: {
        control: { type: "toggle" },
      },
      blending: {
        control: {
          type: "select",
          options: [
            "normal",
            "darken",
            "multiply",
            "color-burn",
            "lighten",
            "screen",
            "color-dodge",
            "overlay",
            "soft-light",
            "hard-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity",
          ],
        },
      },
      draggable: {
        control: { type: "toggle" },
      },
      mask: {
        dialog: true,
        properties: {},
      },
      filters: {
        lazy: true,
        properties: {
          blur: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 100 }],
          },
          backgroundBlur: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 100 }],
          },
          brightness: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 200 }],
          },
          contrast: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 200 }],
          },
          grayScale: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 100 }],
          },
          hue: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 360 }],
          },
          invert: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 100 }],
          },
          saturate: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 200 }],
          },
          sepia: {
            control: [{ type: "input" }, { type: "slider", min: 0, max: 100 }],
          },
        },
      },
      overflow: {
        control: { type: "select", options: ["hidden", "scroll", "visible"] },
      },
      overflowX: {
        control: { type: "select", options: ["hidden", "scroll"] },
      },
      overflowY: {
        control: { type: "select", options: ["hidden", "scroll"] },
      },
      pointer: {
        control: { type: "select", options: ["none", "auto"] },
      },
      userSelect: {
        control: { type: "select", options: ["none", "auto"] },
      },
      zIndex: {
        control: { type: "input" },
      },
      overscroll: {
        control: { type: "select", options: ["contain", "none"] },
      },
    },
  },
  transforms: {
    lazy: true,
    properties: {
      scale: { control: { type: "input" } },
      skew: {
        control: [{ type: "input" }, { type: "radio", variants: ["2D", "3D"] }],
      },
      rotate: {
        control: [{ type: "input" }, { type: "input" }],
      },
      depth: {
        control: [{ type: "input" }, { type: "slider", min: -500, max: 500 }],
      },
      perspective: {
        control: [{ type: "input" }, { type: "slider", min: 500, max: 5000 }],
      },
      origin: { control: [{ type: "input" }, { type: "input" }] },
      backface: { control: { type: "radio", variants: ["visible", "hidden"] } },
      preserve: {
        control: { type: "toggle", values: ["true", "false"] },
      },
    },
  },
  text: {
    properties: {
      font: { control: { type: "select", options: [] } },
      weight: {
        control: {
          type: "select",
          options: [
            "Thin",
            "Thin Italic",
            "Extra Light",
            "Extra Light Italic",
            "Light",
            "Light Italic",
            "Regular",
            "Italic",
            "Medium",
            "Medium Italic",
            "Semibold",
            "Semibold italic",
            "Bold",
            "Bold Italic",
            "Extra Bold",
            "Extra bold Italic",
            "Black",
            "Black Italic",
          ],
        },
      },
      color: { control: { type: "input" } },
      size: {
        control: [
          { type: "input" },
          {
            type: "select",
            options: [{ title: "Pixels", value: "px" }, "fit"],
          },
        ],
      },
      letter: {
        control: [
          { type: "input" },
          {
            type: "select",
            options: ["em", { title: "Pixels", value: "px" }],
          },
        ],
      },
      line: {
        control: [
          { type: "input" },
          {
            type: "select",
            options: [
              "em",
              { title: "Pixels", value: "px" },
              { title: "Percentage", value: "%" },
            ],
          },
        ],
      },
      align: {
        control: {
          type: "radio",
          variants: [
            { title: () => <></>, value: "" },
            { title: () => <></>, value: "" },
            { title: () => <></>, value: "" },
          ],
        },
      },
    },
  },
} as const);
