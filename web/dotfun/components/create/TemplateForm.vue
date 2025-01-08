<script lang="ts" setup>
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
  TabPanel,
} from "@headlessui/vue";
import type { Template } from "@saitamadotfun/sdk";

const selected = defineModel<Template>();

const templateStore = useTemplate();
const templates = computed(() => templateStore.all);

const emit = defineEmits<{
  previous: [];
  change: [template: Template];
}>();
</script>
<template>
  <TabPanel class="flex flex-col space-y-4">
    <RadioGroup
      v-model="selected"
      class="flex flex-col space-y-4"
    >
      <div class="flex items-center">
        <div class="flex flex-col">
          <RadioGroupLabel class="text-lg font-medium"
            >Select a template</RadioGroupLabel
          >
          <RadioGroupDescription class="flex text-xs text-black/75">
            Pick a template from the presets below
          </RadioGroupDescription>
        </div>
        <div class="flex-1 flex justify-end">
          <button
            type="button"
            class="btn-outline"
            @click="emit('previous')"
          >
            Prev
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 md:flex md:flex-wrap">
        <RadioGroupOption
          v-for="template in templates"
          :value="template"
        >
          <div
            class="relative shrink-0 bg-black/10 h-56 shadow-sm shadow-black/25 rounded-md cursor-pointer transition-all hover:scale-95 md:w-40"
            @click.prevent="
              () => {
                selected = template;
                emit('change', template);
              }
            "
          >
            <NuxtImg
              fit="fill"
              src="/test.png"
              width="512"
              height="512"
              class="w-full h-full object-fill rounded-md"
            />
            <div
              v-if="selected?.id === template.id"
              class="absolute flex justify-center items-center top-2 right-2"
            >
              <div class="i-mdi:check-circle text-3xl text-white z-10" />
              <div class="absolute rounded-full p-3 bg-black" />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-b from-black/25 via-black/25 to-black/75 blur-sm p-4"
            />
            <div class="absolute bottom-0 inset-x-0 p-2 z-10">
              <h1 class="text-base text-white">
                {{ template.name }}
              </h1>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </TabPanel>
</template>
