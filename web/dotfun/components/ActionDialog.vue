<script lang="ts" setup>
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

defineProps<{
  isSubmitting?: boolean;
  title: string;
  description: string;
  action: string;
  modelValue: boolean;
}>();
const emit = defineEmits<{
  onAction: [];
  "update:modelValue": [value: boolean];
}>();
</script>
<template>
  <Dialog
    class="relative z-20"
    :open="modelValue"
    @close="emit('update:modelValue', false)"
  >
    <DialogOverlay class="fixed inset-0 bg-black/75" />
    <div class="fixed inset-0 flex flex-col">
      <DialogPanel
        class="m-auto flex flex-col space-y-4 bg-white p-4 rounded-md max-w-xs"
      >
        <div class="flex flex-col space-y-2">
          <DialogTitle class="text-base font-medium md:text-lg">{{
            title
          }}</DialogTitle>
          <DialogDescription class="text-xs text-black/75 md:text-sm">{{
            description
          }}</DialogDescription>
        </div>
        <div class="flex space-x-2">
          <button
            class="flex-1 btn bg-black/5 py-3 rounded"
            @click="emit('update:modelValue', false)"
          >
            Cancel
          </button>
          <button
            :disabled="isSubmitting"
            class="flex-1 btn bg-red-500 text-white !py-0 rounded"
            @click="emit('onAction')"
          >
            <div
              v-if="isSubmitting"
              class="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"
            />
            <span v-else>
              {{ action }}
            </span>
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
