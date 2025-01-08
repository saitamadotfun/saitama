<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
  middleware: "protected",
});

const siteStore = useSite();
const route = useRoute();
const sites = computed(() => siteStore.all);
await useAsyncData(async () => {
  return siteStore.getSites({
    workspace: route.params.workspace as string,
    deleted: "false",
  });
});
</script>
<template>
  <NuxtLayout>
    <main
      v-if="sites && sites.length > 0"
      class="grid gap-4 p-4 lt-sm:grid-cols-2 grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
    >
      <SiteListItem
        v-for="site in sites"
        :key="site.id"
        :site="site"
      />
    </main>
    <main
      v-else
      class="m-auto flex flex-col items-center justify-center text-center space-y-2"
    >
      <div
        class="size-8 flex items-center justify-center bg-black text-white rounded-full"
      >
        <div class="i-mdi:collage text-xl" />
      </div>
      <div>
        <h1 class="text-base md:text-lg">No Sites</h1>
        <p class="text-xs text-black/75 md:text-sm">
          Create a new site using a template to get started.
        </p>
      </div>
    </main>
  </NuxtLayout>
</template>
