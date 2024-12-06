import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Vue3Toasity);
});
