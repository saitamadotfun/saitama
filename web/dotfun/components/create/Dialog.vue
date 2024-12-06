<script lang="ts" setup>
import { useForm } from "vee-validate";
import { breakpointsTailwind } from "@vueuse/core";
import {
  TabGroup,
  TabPanels,
  Dialog,
  DialogOverlay,
  DialogPanel,
} from "@headlessui/vue";
import type { DomainExist, Template } from "@saitamadotfun/sdk";

const open = defineModel<boolean>();
const templateStore = useTemplate();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isVertical = computed(() => breakpoints.isGreaterOrEqual("md"));

const formIndex = ref(0);
const { defineField,  handleReset } = useForm({
  initialValues: {
    setup: {
      name: "",
      category: "",
      description: "",
    },
    domain: {} as DomainExist,
    template: {} as Template,
  },
});
const [setup] = defineField("setup");
const [domain] = defineField("domain");
const [template] = defineField("template");

const onClose = () => {
  formIndex.value = 0;
  open.value = false;

  return handleReset();
};

await useAsyncData(async () => templateStore.getTemplates());
</script>
<template>
  <Dialog
    class="relative z-10"
    :open="modelValue"
    @close="onClose"
  >
    <DialogOverlay class="fixed inset-0 bg-black/25" />
    <div class="fixed inset-0 flex flex-col justify-end md:justify-center">
      <DialogPanel
        class="bg-white rounded-t-xl h-10/11 overflow-y-scroll md:self-center md:w-2xl md:h-6/10 md:rounded-xl"
      >
        <TabGroup
          :key="formIndex"
          :selectedIndex="formIndex"
          as="div"
          class="flex-1 flex flex-col gap-x-8 p-8 lt-md:gap-y-4 lt-lg:px-4 md:flex-row"
          :vertical="isVertical"
        >
          <CreateTab class="md:w-1/3 md:self-start" />
          <TabPanels class="flex-1">
            <CreateSetupForm
              v-model="setup"
              @change="formIndex = 1"
            />
            <CreateTemplateForm
              v-model="template"
              @change="formIndex = 2"
              @previous="formIndex = 0"
            />
            <CreateDomainForm
              v-model="domain"
              @change="formIndex = 3"
              @previous="formIndex = 1"
            />
            <CreatePaymentForm
              v-bind="{ setup, template, domain }"
              @previous="formIndex = 2"
            />
          </TabPanels>
        </TabGroup>
      </DialogPanel>
    </div>
  </Dialog>
</template>
