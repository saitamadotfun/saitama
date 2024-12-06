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
      roboto: ["Roboto+Condensed"]
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
    btn: "flex items-center justify-center px-4 py-2 text-xs uppercase",
    "btn-primary": "bg-black text-white",
  },
  safelist: [
    "i-mingcute:telegram-fill",
    "i-mingcute:discord-fill",
    "i-line-md:twitter-x",
    "i-fa-brands:google",
    "i-fa-brands:github",
    "i-fa-brands:apple"
  ],
});