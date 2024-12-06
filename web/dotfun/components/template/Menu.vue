<script lang="ts" setup>
import type { Template } from "@saitamadotfun/sdk";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const props = defineProps<{
  class?: string;
  template: Template;
  iconClass?: string;
}>();

const showEditDialog = ref(false);
const showDeleteDialog = ref(false);

const menuItems = [
  { name: "Edit", action: "edit" },
  { name: "Delete", action: "delete" },
] as const;

const onAction = (action: (typeof menuItems)[number]["action"]) => {
  switch (action) {
    case "delete":
      showDeleteDialog.value = true;
      break;
    case "edit":
      showEditDialog.value = true;
      break;
  }
};
</script>
<template>
  <Menu
    as="div"
    :class="props.class"
    class="relative"
  >
    <MenuButton
      class="flex items-center justify-center !bg-white/10 px-1 rounded-md"
    >
      <div
        :class="iconClass"
        class="i-mdi:more-vert text-base text-white/75"
      />
    </MenuButton>
    <MenuItems
      class="min-w-36 absolute flex flex-col bg-white p-2 rounded-md shadow lt-md:-left-24"
    >
      <MenuItem
        as="button"
        v-for="(menuItem, index) in menuItems"
        :key="index"
        class="flex text-black/75 p-2 text-xs md:text-sm hover:bg-black hover:text-white hover:rounded"
        @click.prevent="onAction(menuItem.action)"
      >
        {{ menuItem.name }}
      </MenuItem>
    </MenuItems>
  </Menu>
  <TemplateDeleteDialog
    v-model="showDeleteDialog"
    :template-id="template.id"
  />
  <TemplateEditDialog
    v-model="showEditDialog"
    :template="template"
  />
</template>
