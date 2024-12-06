<script lang="ts" setup>
type Props = {
  icon: string;
  iconClass: string;
  name: string;
  quantity: number;
  price?: string;
};

defineProps<Props>();
</script>
<template>
  <div class="flex items-center p-3 md:p-4">
    <div class="flex-1 flex items-center space-x-2">
      <div
        class="w-8 h-8 flex items-center justify-center rounded"
        :class="iconClass"
      >
        <div
          :class="icon"
          class="text-base"
        />
      </div>
      <h1 class="capitalize">{{ name }}</h1>
    </div>
    <div class="flex items-center space-x-2">
      <div
        v-if="price"
        :class="iconClass"
        class='text-xs px-2 rounded md:text-sm'
      >
        {{ price }}
      </div>
      <p class="text-sm">x{{ quantity }}</p>
    </div>
  </div>
</template>
