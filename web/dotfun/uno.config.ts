import {
  defineConfig,
  presetIcons,
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [presetIcons(), presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    fontFamily: {
      sans: ["Open+Sans"],
      inter: ["Inter"],
      roboto: ["Roboto+Condensed"],
    },
    colors: {
      primary: "#000000",
      invert: "#FFFFFF",
      highlight: "#EAEAEA",
      background: "#F8F8F8",
    },
    screens: {},
  },
  shortcuts: {
    btn: "flex items-center justify-center px-4 py-2 text-xs uppercase md:text-sm",
    "btn-primary": "bg-black text-white hover:bg-black/75 active:bg-black",
  },
  safelist: [
    "i-mingcute:telegram-fill",
    "i-mingcute:discord-fill",
    "i-line-md:twitter-x",
    "i-fa-brands:google",
    "i-fa-brands:github",
    "i-fa-brands:apple",
    "i-mdi:arrow-up-box",
    "i-iconamoon:cursor-fill",
    "i-mdi:database",
    "i-mdi:help-circle",
    "i-mdi:account",
    "i-mdi:settings",
    "i-mdi:credit-card",
    "i-mdi:collage",
    "i-mdi:delete",
    "i-mdi:laptop",
    "i-mdi:key",
    "i-mdi:plus-circle",
    "i-material-symbols:edit",
    "i-mdi:lock",
    "i-material-symbols:group",
    "i-mdi:code-block-tags"
  ],
});
