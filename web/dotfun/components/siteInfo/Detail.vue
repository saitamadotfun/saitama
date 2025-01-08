<script lang="ts" setup>
import moment from "moment";
import type { Site } from "@saitamadotfun/sdk";

const props = defineProps<{ site: Site }>();

const lastDeployment = computed(() => props.site.deployments.at(-1));
</script>
<template>
  <div class="flex space-x-4">
    <div>
      <NuxtImg
        :src="site.template.preview.uri"
        :alt="site.template.preview.metadata?.alt"
        width="512"
        height="512"
        fit="fill"
        class="w-48 h-56 bg-black rounded-md shadow"
      />
    </div>
    <div class="flex-1">
      <h1 class="text-2xl font-bold first-letter:capitalize">
        {{ site.name }}
      </h1>
      <div class="flex flex-col space-y-2">
        <div>
          <small class="text-xs text-black/75">Domains</small>
          <NuxtLink
            v-for="domain in site.domains"
            :href="'https://' + domain.origin"
            class="flex items-center"
            target="_blank"
          >
            <span>{{ domain.origin }}</span>
            <div class="i-mdi:arrow-up rotate-45" />
          </NuxtLink>
        </div>
        <div v-if="site.metadata.vercelProjectURL">
          <small class="text-xs text-black/75">Vercel Link</small>
          <NuxtLink
            :href="'https://' + site.metadata.vercelProjectURL"
            target="_blank"
            class="flex items-center"
          >
            <span>{{ site.metadata.vercelProjectURL }}</span>
            <div class="i-mdi:arrow-up rotate-45" />
          </NuxtLink>
        </div>
        <div class="flex lt-md:flex-col lt-md:space-y-2 md:space-x-4">
          <div v-if="lastDeployment">
            <small class="text-xs text-black/75">Status</small>
            <div class="flex items-center space-x-2">
              <div
                class="size-3 rounded-full"
                :class="
                  lastDeployment.status === 'READY'
                    ? 'bg-green-500'
                    : lastDeployment.status === 'ERROR'
                    ? 'bg-red-500'
                    : lastDeployment.status === 'CANCELED'
                    ? 'bg-slate-200'
                    : 'bg-amber-500'
                "
              />
              <span class="lowercase first-letter:uppercase">{{
                lastDeployment.status
              }}</span>
            </div>
          </div>
          <div>
            <small class="text-xs text-black/75">Created</small>
            <div>
              <p>{{ moment(site.createdAt).startOf("hour").fromNow() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <SiteListItemMenu
        icon-class="!text-black"
        :site="site"
      />
    </div>
  </div>
</template>
