<script lang="ts" setup>
import { format } from "~/utils/format";
import type { Workspace } from "@saitamadotfun/sdk";

const props = defineProps<{ workspace: Workspace }>();
const workspaceId = getWorkspaceId();

const active = computed(() => props.workspace.id === workspaceId.value);
</script>
<template>
  <NuxtLink
    :class="active ? '' : 'text-black/75'"
    :href="format('/%/sites/', workspace.id)"
    class="flex items-center space-x-2 p-2 hover:bg-black/5 hover:text-black hover:rounded"
  >
    <div
      v-if="active"
      class="i-mdi:check"
    />
    <div>{{ workspace.name }}</div>
  </NuxtLink>
</template>
