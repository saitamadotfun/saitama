<script lang="ts" setup>
import type { Workspace } from "@saitamadotfun/sdk";
import {
  TabGroup,
  TabPanels,
  Dialog,
  DialogOverlay,
  DialogPanel,
} from "@headlessui/vue";

import { format } from "~/utils/format";

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
defineProps<{ modelValue: boolean }>();

const router = useRouter();

const formIndex = ref(0);
const workspace = ref<Pick<Workspace, "id" | "name">>({ name: "", id: "" });

const onClose = () => {
  formIndex.value = 0;
  workspace.value = { name: "", id: "" };
  emit("update:modelValue", false);
};
</script>
<template>
  <Dialog
    as="div"
    class="relative z-10"
    :open="modelValue"
    @close="onClose"
  >
    <DialogOverlay class="fixed inset-0 bg-black/25" />
    <div class="fixed inset-0 flex flex-col px-4">
      <DialogPanel
        class="my-auto h-sm flex flex-col bg-white p-4 rounded-md md:mx-auto md:w-sm"
        
      >
        <header>
          <button @click="onClose">
            <div class="i-mdi:close text-xl text-stone-700" />
          </button>
        </header>
        <TabGroup
          as="template"
          :key="formIndex"
          :selected-index="formIndex"
        >
          <TabPanels as="template">
            <WorkspaceCreateTab
              v-model="workspace"
              @submit="formIndex = 1"
            />
            <WorkspaceInviteTab
              :workspace="workspace"
              @submit="formIndex = 2"
            />
            <WorkspaceLogoTab
              :workspace="workspace"
              @submit="
                () => {
                  router.push(format('/%/sites/', workspace.id));
                  onClose();
                }
              "
            />
          </TabPanels>
        </TabGroup>
      </DialogPanel>
    </div>
  </Dialog>
</template>
