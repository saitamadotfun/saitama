<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  ListboxLabel,
} from "@headlessui/vue";

type Props<T> = {
  title: string;
  description?: string;
  name: string;
  placeholder: string;
  options: readonly T[];
  getText: (option: T) => string;
};

defineProps<Props<any>>();

const model = defineModel<any>();
</script>
<template>
  <div class="relative flex flex-col space-y-2">
    <Listbox
      as="template"
      v-model="model"
    >
      <ListboxLabel>
        <p class="capitalize">{{ title }}</p>
        <p
          v-if="description"
          class="text-xs"
        >
          {{ description }}
        </p>
      </ListboxLabel>
      <ListboxButton
        class="flex-1 flex items-center border border-black rounded p-2"
      >
        <div class="flex-1 text-sm text-start">
          <span
            v-if="model"
            class="capitalize"
            >{{ getText(model) }}</span
          >
          <span
            v-else
            class="text-black/75"
          >
            {{ placeholder }}
          </span>
        </div>
        <div
          type="button"
          class="!bg-black !text-white p-1 rounded-full"
        >
          <div class="i-mdi:chevron-down text-base" />
        </div>
      </ListboxButton>
      <ListboxOptions
        v-if="options.length > 0"
        class="absolute inset-x-0 top-[98%] flex flex-col p-2 bg-black/2 backdrop-blur-3xl shadow rounded-b-md overflow-y-scroll"
      >
        <ListboxOption
          v-for="(option, index) in options"
          :key="index"
          :value="option"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            class="flex space-x-2 items-center p-2 rounded cursor-pointer"
            :class="{ 'bg-black/5': active, 'bg-black/10': selected }"
          >
            <div
              v-if="selected"
              class="i-mdi:check text-xl"
            />
            <slot
              :option
              :index
              :active
              :selected
            />
          </li>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>
