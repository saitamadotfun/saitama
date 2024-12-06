<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";
</script>

<template>
  <TabPanel>
    <div class="flex items-center space-x-2 bg-black/5 p-2 rounded-md">
      <div class="bg-black text-white px-2 rounded text-xs md:text-sm">Note</div>
      <span class="text-xs md:text-sm"
        >These settings apply across the whole workspace</span
      >
    </div>
  </TabPanel>
</template>
