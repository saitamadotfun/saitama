<script lang="ts" setup>
const { getWorkspaces, all } = useWorkspace();

const workspaceId = getWorkspaceId();
const mutatableWorkspaceId = useWorkspaceId();

await useAsyncData(async () => {
  if (all.length === 0) {
    const workspaces = await getWorkspaces();
    if (workspaces.length > 0 && !workspaceId.value)
      mutatableWorkspaceId.value = workspaces[0].id;
    return workspaces;
  }

  return [];
});
</script>
<template>
  <main
    class="fixed inset-0 flex flex-col bg-background font-sans text-[14px] md:text-base"
  >
    <SiteHeader class="shadow-sm" />
    <div class="flex-1 flex">
      <SiteNavigation />
      <div class="flex-1 flex flex-col bg-black/5">
        <slot />
      </div>
    </div>
  </main>
</template>
