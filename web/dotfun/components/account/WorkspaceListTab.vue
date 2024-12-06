<script lang="ts" setup>
import { format } from "~/utils/format";
import { TabPanel } from "@headlessui/vue";

const workspaceStore = useWorkspace();

const workspaces = computed(() => workspaceStore.all);
</script>
<template>
  <TabPanel class="flex-1 flex flex-col px-4">
    <div
      v-for="workspace in workspaces"
      :key="workspace.id"
      class="flex items-center space-x-4 py-2"
    >
      <Avatar
        :src="workspace.logo?.uri"
        :alt="workspace.name"
      />
      <div class="flex-1">
        <b class="text-base font-medium">{{ workspace.name }}</b>
        <p class="text-xs text-black/75">Free workspace / Admin</p>
      </div>
      <div>
        <NuxtLink
          :href="format('/%/settings/', workspace.id)"
          class="bg-black/5 px-4 py-2 rounded text-sm"
          >Settings</NuxtLink
        >
      </div>
    </div>
  </TabPanel>
</template>
