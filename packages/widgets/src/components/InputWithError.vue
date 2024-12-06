<script lang="ts" setup>
defineProps<{ error?: string }>();
</script>
<template>
  <div class="flex flex-col space-y-2">
    <slot />
    <small
      v-if="error"
      class="text-xs text-red first-letter:capitalize"
    >
      {{ error }}
    </small>
  </div>
</template>
