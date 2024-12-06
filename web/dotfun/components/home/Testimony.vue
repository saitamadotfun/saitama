<script setup lang="ts">
type Props = {
  avatar: string;
  name: string;
  tag: string;
  text: string;
};

defineProps<Props>();
</script>
<template>
  <div
    class="md:max-w-sm sm:max-w-96 flex items-start space-x-2 bg-white p-4 rounded-md shadow"
  >
    <NuxtImg
      :src="avatar"
      :alt="name"
      width="64"
      height="64"
      format="webp"
      class="w-10 h-10 rounded-full"
    />

    <div class="flex flex-col space-y-2">
      <div class="flex flex-col">
        <h1 class="font-medium">{{ name }}</h1>
        <p class="text-xs text-black/75">{{ tag }}</p>
      </div>
      <div>
        <p class="text-xs text-black/75 md:text-sm">
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>
