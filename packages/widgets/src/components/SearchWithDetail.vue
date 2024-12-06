<script lang="ts" setup>
import { useDebounceFn } from "@vueuse/core";
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

type Props<T> = {
  title: T;
  description?: string;
  name: string;
  placeholder: string;
  options: T[];
  getText: (option: T) => string;
};

defineProps<Props<any>>();
const emit = defineEmits<{ search: [value: string] }>();
const model = defineModel<any>();

const onSearch = useDebounceFn((value: string) => emit("search", value), 500);
</script>
<template>
  <Combobox
    as="div"
    v-model="model"
    class="relative flex flex-col space-y-2 z-10"
  >
    <ComboboxLabel>
      <p class="capitalize">{{ title }}</p>
      <p
        v-if="description"
        class="text-xs"
      >
        {{ description }}
      </p>
    </ComboboxLabel>
    <div
      class="input flex-1 flex items-center border border-black/75 rounded p-2 z-0"
    >
      <ComboboxInput
        :placeholder
        :value="getText(model)"
        class="flex-1 text-sm placeholder-black/75"
        @change="(event) => onSearch(event.target.value)"
      />
      <button class="p-1">
        <div class="icon i-mdi:search text-xl" />
      </button>
    </div>
    <ComboboxOptions
      v-if="options.length > 0"
      class="absolute inset-x-0 top-[98%] bg-black/2 backdrop-blur-3xl p-2 shadow rounded-b-md z-1000"
    >
      <ComboboxOption
        v-for="(option, index) in options"
        :key="index"
        :value="option"
        class="p-2 rounded hover:bg-black/5 cursor-pointer"
      >
        <slot
          :option
          :index
        />
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>
