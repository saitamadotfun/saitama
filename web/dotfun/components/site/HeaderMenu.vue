<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";

const openCreateWorkspaceDialog = ref(false);
const workspaceStore = useWorkspace();

const workspaceId = getWorkspaceId();
const workspaces = computed(() => workspaceStore.all);
const workspace = computed(() => workspaceStore.get(workspaceId.value!));

await useAsyncData(() => workspaceStore.getWorkspace(workspaceId.value!));
</script>
<template>
  <div>
    <Menu
      as="div"
      class="relative z-10"
    >
      <MenuButton
        v-if="workspace"
        class="flex items-center space-x-2"
      >
        <Avatar
          :src="workspace.logo?.uri"
          :alt="workspace.name"
        />
        <span>{{ workspace.name }}</span>
        <div class="i-mdi:chevron-down text-base" />
      </MenuButton>
      <MenuItems
        class="absolute w-56 bg-white p-2 mt-2 rounded-md border shadow-2xl shadow-black/5"
      >
        <div class="flex flex-col space-y-2">
          <p class="text-xs text-black/75">Workspaces</p>
          <div class="flex flex-col">
            <SiteHeaderMenuItem
              v-for="workspace in workspaces"
              :key="workspace.id"
              :workspace="workspace"
            />
          </div>
          <button
            class="flex items-center justify-center space-x-2 py-2 hover:bg-black/5 hover:text-black hover:rounded"
            @click="openCreateWorkspaceDialog = true"
          >
            <div class="i-mdi:plus" />
            <span>Create new workspace</span>
          </button>
        </div>
      </MenuItems>
    </Menu>
    <WorkspaceCreateDialog v-model="openCreateWorkspaceDialog" />
  </div>
</template>
