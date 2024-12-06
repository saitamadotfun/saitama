<script lang="ts" setup>
type Props = {
  icon?: string;
  placeholder: string;
  name: string;
  type: "email" | "text";
};

const props = defineProps<Props>();
const model = defineModel<string>();
</script>
<template>
  <div
    class="input flex items-center space-x-2 border-1 border-black bg-white px-2 rounded focus-within:ring-3 focus-within:ring-black/50"
  >
    <div
      v-if="icon"
      :class="icon"
      class="icon text-lg text-black/50"
    />
    <input
      v-model="model"
      v-bind="props"
      class="flex-1 bg-transparent placeholder-black/50 py-2 focus:outline-none"
    />
  </div>
</template>
<style scoped>
.input:focus-within .icon {
  color: black;
}
</style>
