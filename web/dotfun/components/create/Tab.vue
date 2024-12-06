<script lang="ts" setup>
import { TabList, Tab } from "@headlessui/vue";
const tabs = ["Setup", "Choose Template", "Connect Domain", "Payment"];
</script>
<template>
  <TabList class="flex rounded-md md:flex-col">
    <Tab
      v-for="(tab, index) in tabs"
      as="template"
      v-slot="{ selected }"
    >
      <div
        class="flex items-center !outline-none cursor-pointer"
        :class="{ 'lt-md:flex-1': index !== tabs.length - 1 }"
      >
        <div
          class="tab__button"
          :class="{
            'md:border-black md:text-white': selected,
            'md:border-black/25': !selected,
          }"
        >
          <div
            class="pill"
            :class="selected ? 'bg-black text-white' : 'bg-black/10'"
          >
            {{ index + 1 }}
          </div>
          <div
            v-if="false"
            class="pill bg-green-500"
          >
            <div class="i-mdi:check text-base text-white" />
          </div>
          <div class="text-black text-nowrap lt-md:hidden">{{ tab }}</div>
        </div>
        <div
          v-if="index !== tabs.length - 1"
          class="flex-1 h-0.5 md:hidden"
          :class="{ 'bg-black': selected, 'bg-black/10': !selected }"
        />
      </div>
    </Tab>
  </TabList>
</template>
<style scoped>
.tab__button {
  @apply flex items-center space-x-2 md:p-4  md:border-l-4;
}

.tab__button .pill {
  @apply flex items-center justify-center size-6 xl:size-8 p-2 rounded-full;
}
</style>
