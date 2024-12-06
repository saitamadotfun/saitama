<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
  middleware: "protected",
});

const siteArchiveState = useSiteArchive();
const workspaceId = getWorkspaceId();

const sites = computed(() => siteArchiveState.all);

await useAsyncData(async () => {
  return siteArchiveState.getSites({
    deleted: "true",
    workspace: workspaceId.value,
  });
});
</script>
<template>
  <NuxtLayout>
    <main
      v-if="sites && sites.length > 0"
      class="grid gap-4 p-4 lt-sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
    >
      <SiteListItem
        v-for="site in sites"
        :site="site"
      />
    </main>
    <div
      v-else
      class="m-auto flex flex-col items-center justify-center text-center space-y-2"
    >
      <div
        class="size-8 flex items-center justify-center bg-black text-white rounded-full"
      >
        <div class="i-mdi:delete text-xl" />
      </div>
      <div>
        <h1 class="text-base md:text-lg">No Archived Projects</h1>
        <p class="text-xs text-black/75 md:text-sm">
          All archived projects will be listed here.
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
