import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  presets: [presetUno()],
  safelist: [
    "md:hidden",
    "lt-md:hidden",
    "!w-screen",
    "!lt-xl:w-7xl",
    "!w-lg",
  ]
});
