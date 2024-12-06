<script setup lang="ts">
type Props = { text: string };
defineProps<Props>();
</script>
<template>
  <div class="shrink-0 flex items-center space-x-1  uppercase bg-white px-1 border border-black rounded-full">
    <p class="text-xs shrink-0">
      {{ text }}
    </p>
    <div class="flex items-center justify-center w-3 h-3 border border-black/75 rounded-full">
      <div class="i-mdi-arrow-right -rotate-45 text-xs" />
    </div>
  </div>
</template>
