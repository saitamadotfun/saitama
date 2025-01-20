<script lang="ts" setup>
const templateStore = useTemplate();

const templates = computed(() => templateStore.all);

useAsyncData(() => templateStore.getTemplates());
</script>
<template>
  <div class="flex flex-col space-y-2">
    <div class="flex items-center px-4">
      <div class="flex-1 flex flex-col">
        <h1 class="text-2xl font-bold">Featured templates</h1>
        <p class="text-sm text-black/75">Showcasing our top picked templates</p>
      </div>
      <div>
        <NuxtLink
          href="/workspaces"
          class="flex items-center space-x-2 p-2 hover:bg-black/5 active:bg-white"
        >
          <p>Browse all</p>
          <div class="i-mdi:plus-circle-outline text-xl" />
        </NuxtLink>
      </div>
    </div>
    <div class="h-80 flex space-x-4 p-4 overflow-x-scroll">
      <div
        v-for="template in templates"
        :key="template.id"
        class="shrink-0 w-56 h-72 relative"
      >
        <img
          :src="template.preview.uri"
          width="512"
          height="512"
          :alt="template.preview.metadata?.alt"
          class="w-full h-full absolute inset-0 rounded-md -z-10"
        />
        <NuxtLink
          :href="template.metadata.previewURL"
          target="_blank"
          class="group absolute inset-0 flex flex-col bg-gradient-to-b from-black/50 via-black/50 to-black p-2 text-white cursor-pointer rounded-md"
        >
          <div
            class="ml-auto i-mdi:arrow-up rotate-45 text-2xl opacity-0 transition-all group-hover:opacity-100"
          />
          <div class="mt-auto flex flex-col">
            <p
              class="flex-1 text-lg font-medium group-hover:underline group-hover:underline-dashed"
            >
              {{ template.name }}
            </p>
            <p
              class="text-sm text-white/75 line-clamp-2 tracking-tighter group-hover:underline group-hover:underline-dashed"
            >
              {{ template.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
