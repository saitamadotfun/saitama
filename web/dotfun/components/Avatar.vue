<script lang="ts" setup>
defineProps<{ src?: string | null; alt?: string | null }>();
</script>
<template>
  <NuxtImg
    v-if="src"
    :src="src"
    width="40"
    height="40"
    class="size-8 rounded border shadow-sm"
  />
  <div
    v-else
    class="size-8 flex items-center justify-center bg-black text-white text-xl rounded uppercase"
  >
    <span v-if="alt && alt.length > 0"
      >{{ alt.at(0) }}{{ alt.length > 1 ? alt.at(alt.length - 1) : "" }}</span
    >
    <span v-else>?</span>
  </div>
</template>
