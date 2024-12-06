<script lang="ts" setup>
import { Tab, TabList, TabGroup, TabPanels } from "@headlessui/vue";
import { accountTabs } from "~/config/tabs";

definePageMeta({
  layout: "dashboard",
  middleware: "protected",
});
</script>
<template>
  <NuxtLayout>
    <main class="flex-1 flex flex-col">
      <div class="px-4 py-2 md:py-4">
        <p class="text-lg font-bold">Account</p>
      </div>
      <TabGroup
        as="div"
        class="flex-1 flex lt-md:flex-col lt-md:space-y-8 md:items-start md:space-x-4"
        vertical
      >
      
        <TabList
          class="flex px-4 lt-md:max-w-vw lt-md:space-x-2 lt-md:snap-x lt-md:overflow-x-scroll md:flex-col md:space-y-2 md:min-w-48"
        >
          <Tab
            v-for="(tab, index) in accountTabs"
            :key="index"
            v-slot="{ selected }"
            as="template"
          >
            <button
              class="md:flex-1 flex items-center space-x-2 px-2 py-1 text-nowrap lt-md:min-w-24 lt-md:snap-center"
              :class="
                selected ? '!bg-black text-white rounded' : 'text-black/50'
              "
            >
              <div
                :class="tab.icon"
                class="text-lg"
              />
              <span>
                {{ tab.name }}
              </span>
            </button>
          </Tab>
        </TabList>
        <TabPanels class="flex-1 flex flex-col md:max-w-md">
          <AccountProfileTab />
          <AccountWorkspaceListTab />
        </TabPanels>
      </TabGroup>
    </main>
  </NuxtLayout>
</template>
