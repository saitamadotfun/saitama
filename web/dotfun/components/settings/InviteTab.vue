<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";
</script>

<template>
  <TabPanel class="flex flex-col space-y-8 px-4">
    <div class="flex flex-col space-y-2">
      <label>Invite via link</label>
      <div class="flex items-center space-x-2">
        <div
          class="flex items-center bg-white border divide-x rounded lt-md:flex-1"
        >
          <input
            :disabled="true"
            class="p-2 text-black/60 lt-md:flex-1 md:max-w-48"
            value="https://saitama.fun/join/zeroboost/"
          />
          <div class="text-black/75 p-2">Editor</div>
        </div>
        <button class="btn bg-black/5 p-2 rounded">
          <div class="i-mdi:refresh text-base text-black/75" />
        </button>
        <button class="btn btn-primary rounded">Copy</button>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <label>Invite via Email</label>
      <div class="flex items-center space-x-2">
        <div
          class="flex items-center bg-white border divide-x rounded focus-within:ring-3 focus-within:ring-black/10 lt-md:flex-1"
        >
          <input
            placeholder="Emails (comma seperated)"
            class="p-2 placeholder-black/60 lt-md:flex-1"
          />
          <div class="flex items-center space-x-2 p-2">
            <span class="text-black/75">Editor</span>
            <div class="i-mdi:chevron-down" />
          </div>
        </div>
        <button class="btn btn-primary rounded">Invite</button>
      </div>
    </div>
  </TabPanel>
</template>
