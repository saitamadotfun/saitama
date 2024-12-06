<script lang="ts" setup>
import { format } from "~/utils/format";
const props = defineProps<{ class: string }>();

const workspaceId = getWorkspaceId();
const menuVisible = useMobileSiteMenu();
const openCreateDialog = ref(false);
const showTemplateCreateDialog = useTemplateDialog();

const route = useRoute();

const templatePage = computed(() =>
  /^(\/?admin\/templates\/)/.test(route.fullPath)
);
</script>
<template>
  <div>
    <header
      :class="props.class"
      class="flex bg-white p-2"
    >
      <div class="flex items-center space-x-2">
        <button
          class="p-2 md:hidden"
          @click="menuVisible = true"
        >
          <div class="i-mdi:menu text-xl" />
        </button>
        <SiteHeaderMenu />
      </div>
      <div class="flex-1" />
      <div class="flex space-x-2 md:space-x-4">
        <button
          v-if="templatePage"
          class="btn space-x-2 bg-black/5 rounded md:px-4"
          @click="showTemplateCreateDialog = true"
        >
          <div class="i-mdi:plus text-base lt-md:hidden" />
          <span class="capitalize"> New Template </span>
        </button>
        <NuxtLink
          v-else-if="workspaceId"
          :href="format('/%/settings/', workspaceId)"
          class="btn bg-black/5 rounded hidden md:px-4"
        >
          Invite Member
        </NuxtLink>
        <button
          class="btn space-x-2 border border-black rounded md:px-4"
          @click="openCreateDialog = true"
        >
          <div class="i-mdi:plus text-base lt-md:hidden" />
          <span class="capitalize"> New Project</span>
        </button>
      </div>
    </header>
    <CreateDialog v-model="openCreateDialog" />
  </div>
</template>
