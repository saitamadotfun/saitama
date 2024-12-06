<script lang="ts" setup>
import moment from "moment";
import type { Site } from "@saitamadotfun/sdk";

import { format } from "~/utils/format";

const workspaceId = getWorkspaceId();

defineProps<{ site: Site }>();
</script>
<template>
  <NuxtLink
    :href="format('/%/sites/%/', workspaceId!, site.id)"
    class="relative flex flex-col site cursor-pointer max-w-56"
  >
    <NuxtImg
      :src="site.template.preview.uri"
      :alt="site.template.preview.metadata?.alt"
      width="256"
      height="256"
      fit="contain"
      class="h-64 md:h-72 rounded"
    />
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black blur-sm"
    />
    <div
      class="absolute inset-x-0 bottom-0 flex flex-col z-5 text-white p-2 md:p-4"
    >
      <div class="flex">
        <p class="flex-1 text-base font-medium md:text-lg">
          {{ site.name }}
        </p>
        <button
          class="flex items-center justify-center bg-violet-500/25 text-violet-500 px-2 text-sm rounded tag"
        >
          {{ site.template.price ? "PAID" : "FREE" }}
        </button>
        <SiteListItemMenu
          class="menu"
          :site="site"
        />
      </div>
      <p class="text-white/50 text-xs text-nowrap">
        {{ moment(site.createdAt).fromNow() }}
      </p>
    </div>
  </NuxtLink>
</template>
<style>
.site .tag {
  @apply flex;
}

.site:hover .tag {
  @apply hidden;
}

.site .menu {
  @apply hidden;
}

.site:hover .menu {
  @apply flex;
}
</style>
