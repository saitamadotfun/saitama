<script lang="ts" setup>
type Props = {
  is: "input" | "textarea";
  disabled?: boolean;
  title: string;
  description?: string;
  name: string;
  placeholder: string;
  attrs?: any;
  icon?: string;
};

defineProps<Props>();

const model = defineModel();
</script>
<template>
  <div class="flex flex-col space-y-2">
    <label>
      <p class="capitalize">{{ title }}</p>
      <p
        v-if="description"
        class="text-xs text-black/75 md:text-sm"
      >
        {{ description }}
      </p>
    </label>
    <div class="flex-1 input flex items-center border border-black px-2 rounded">
      <div
        v-if="icon"
        :class="icon"
        class="text-lg"
      />
      <component
        :value="model"
        :is
        :placeholder
        :name
        :disabled="disabled"
        @change="(event: InputEvent) => {
         const value =  (event.target as HTMLInputElement).value;
         $emit('update:modelValue', value);
        }"
        class="flex-1 p-2 placeholder-black/50 placeholder-text-sm"
      />
    </div>
  </div>
</template>
