import { addComponent, createResolver, defineNuxtModule } from "nuxt/kit";

export default defineNuxtModule({
  setup: () => {
    const resolver = createResolver(import.meta.url);

    addComponent({
      name: "Input",
      filePath: resolver.resolve("./components/Input.vue"),
    });
    addComponent({
      name: "InputFile",
      filePath: resolver.resolve("./components/InputFile.vue"),
    });
    addComponent({
      name: "Logo",
      filePath: resolver.resolve("./components/Logo.vue"),
    });
    addComponent({
      name: "InputWithDetail",
      filePath: resolver.resolve("./components/InputWithDetail.vue"),
    });
    addComponent({
      name: "InputWithError",
      filePath: resolver.resolve("./components/InputWithError.vue"),
    });
    addComponent({
      name: "SearchWithDetail",
      filePath: resolver.resolve("./components/SearchWithDetail.vue"),
    });
    addComponent({
      name: "SelectWithDetail",
      filePath: resolver.resolve("./components/SelectWithDetail.vue"),
    });
  },
});
