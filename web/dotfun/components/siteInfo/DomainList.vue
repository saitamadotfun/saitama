<script lang="ts" setup>
import type { Domain } from "@saitamadotfun/sdk";

defineProps<{ domains: Domain[] }>();
</script>
<template>
  <div class="flex flex-col space-y-4">
    <div>
      <h1 class="text-base md:text-lg">Domains</h1>
      <p class="text-xs text-black/75 md:text-sm">
        Set the following record on your DNS provider to continue
      </p>
    </div>
    <div class="flex flex-col space-y-4">
      <SiteInfoDomain
        v-for="domain in domains"
        :key="domain.id"
        :domain="domain"
      />
    </div>
  </div>
</template>
