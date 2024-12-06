<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const actions = [
  { name: "Refresh", action: "refresh" },
  { name: "Delete", action: "delete" },
] as const;

const showDeleteDomainDialog = ref(false);
</script>
<template>
  <Menu
    as="div"
    class="relative"
  >
    <MenuButton class="p-2">
      <div class="i-mdi:dots-vertical" />
    </MenuButton>
    <MenuItems
      class="min-w-30 absolute flex flex-col bg-white p-2 shadow rounded lt-md:-left-24"
    >
      <MenuItem
        v-for="action in actions"
        as="button"
        class="flex text-black/75 p-2 text-xs md:text-sm hover:bg-black hover:text-white hover:rounded"
        @click="
          () => {
            switch (action.action) {
              case 'refresh':
                break;
              case 'delete':
                showDeleteDomainDialog = true;
                break;
            }
          }
        "
        >{{ action.name }}</MenuItem
      >
    </MenuItems>
  </Menu>
  <DomainDeleteDomainDialog v-model="showDeleteDomainDialog" />
</template>
