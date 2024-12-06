<script lang="ts" setup>
import { format } from "~/utils/format";

definePageMeta({
  layout: "root",
  middleware: "protected",
});

const showCreateWorkspaceDialog = ref(false);

const workspaceStore = useWorkspace();
const workspaces = computed(() => workspaceStore.all);

await useAsyncData(async () => {
  return workspaceStore.getWorkspaces();
});
</script>
<template>
  <NuxtLayout>
    <div
      class="flex-1 flex flex-col justify-center space-y-4 px-4 md:min-w-sm md:self-center"
    >
      <div>
        <h1 class="text-xl font-medium">Welcome back</h1>
        <p class="text-xs text-black/75 md:text-sm">
          Choose a workspace below to get back to working with your team.
        </p>
      </div>
      <div
        v-if="workspaces.length > 0"
        class="bg-slate/10 px-2 py-2 rounded-xl shadow-sm divide-y divide-slate/25"
      >
        <NuxtLink
          v-for="workspace in workspaces"
          :key="workspace.id"
          :href="format('/%/sites', workspace.id)"
          class="flex space-x-4 items-center px-2 py-4 cursor-pointer hover:bg-black/5 hover:rounded-md"
        >
          <div>
            <Avatar
              :src="workspace.logo?.uri"
              :alt="workspace.name"
            />
          </div>
          <div class="flex-1 flex flex-col">
            <p class="text-base">{{ workspace.name }}</p>
            <small class="text-xs md:text-sm text-black/75"
              >{{ workspace.members?.length ?? 0 }} members</small
            >
          </div>
          <div>
            <button class="btn btn-primary px-4 py-1.5 rounded-full">
              Open
            </button>
          </div>
        </NuxtLink>
      </div>
      <div>
        <button
          class="flex items-center space-x-2"
          @click="showCreateWorkspaceDialog = true"
        >
          <div class="p-3 bg-stone/10 rounded">
            <div class="i-mdi:plus text-base text-black/75" />
          </div>
          <p>Create New Workspace</p>
        </button>
      </div>
      <WorkspaceCreateDialog v-model="showCreateWorkspaceDialog" />
    </div>
  </NuxtLayout>
</template>
