<script lang="ts" setup>
import copy from "copy-to-clipboard";
import { toast } from "vue3-toastify";
import type { Site } from "@saitamadotfun/sdk";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { format } from "~/utils/format";

const props = defineProps<{ class?: string; site: Site; iconClass?: string }>();

const showDeleteDialog = ref(false);
const showArchiveDialog = ref(false);
const showEditSiteDialog = ref(false);

const { api } = useApi();
const siteState = useSite();
const siteArchiveState = useSiteArchive();
const workspace = useWorkspaceId();

const menuItems = props.site.deleted
  ? ([
      { name: "Unarchive", action: "unarchive" },
      { name: "Delete", action: "delete" },
    ] as const)
  : ([
      {
        name: "Open in New Tab",
        action: "new-tab",
      },
      {
        name: "Copy Link",
        action: "copy-link",
      },
      {
        name: "Open Editor",
        action: "open-editor",
      },
      { name: "Edit", action: "edit" },
      {
        name: "Archive",
        action: "archive",
      },
    ] as const);

const onUnarchived = () =>
  api.site
    .update(props.site.id, { deleted: false })
    .then(({ data: site }) => {
      siteState.set(site);
      siteArchiveState.delete(site);
      return toast.success("Site unarchived");
    })
    .catch((error) => {
      toast.error("Oops! Failed to unarchive site");
      return Promise.reject(error);
    });

const onAction = (action: (typeof menuItems)[number]["action"]) => {
  switch (action) {
    case "archive":
      showArchiveDialog.value = true;
      break;
    case "unarchive":
      return onUnarchived();
    case "delete":
      showDeleteDialog.value = true;
      break;
    case "new-tab":
      window.open(format("/%/sites/%/", workspace.value, props.site.id));
      break;
    case "open-editor":
      window.open(
        format("https://%/editor", props.site.metadata.vercelProjectURL)
      );
      break;
    case "copy-link":
      copy(format("%/%/", window.location.href, props.site.id), {
        onCopy: () => toast.success("Site link copied successfully."),
      });
      break;
    case "edit":
      showEditSiteDialog.value = true;
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
  <SiteListItemArchiveDialog
    v-model="showArchiveDialog"
    :site-id="site.id"
  />
  <SiteListItemDeleteDialog
    v-model="showDeleteDialog"
    :site-id="site.id"
  />
  <SiteListItemEditDialog
    v-model="showEditSiteDialog"
    :site="site"
  />
</template>
