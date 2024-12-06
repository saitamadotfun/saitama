<script lang="ts" setup>
import { computed, ref } from "vue";

const value = defineModel<Record<string, any>>();
const emit = defineEmits<{
  change: [
    files: File[],
    callback: (isSubmitting: boolean) => Promise<void> | void
  ];
}>();

defineProps({
  label: {
    required: false,
  },
  placeholder: {
    required: true,
    default: "Choose a file",
  },
});

const isSubmitting = ref(false);
const files = ref<File[] | null>(null);

const peak = computed(() => {
  if (files.value) {
    const [file] = files.value;
    if (file) return file;
  }
  return null;
});

const preview = computed(() =>
  peak.value ? URL.createObjectURL(peak.value) : null
);

const fileEl = ref<HTMLInputElement | null>(null);
</script>
<template>
  <div class="flex flex-col space-y-2">
    <label v-if="label">{{ label }}</label>
    <div
      class="flex items-center space-x-2 border border-black p-1 rounded cursor-pointer"
      @click="fileEl?.click()"
    >
      <div>
        <img
          v-if="preview"
          :src="preview"
          width="32"
          height="32"
          class="w-8 h-8 rounded"
        />
        <img
          v-else-if="value"
          :src="value.uri"
          :alt="value.metadata?.alt"
          width="32"
          height="32"
          class="w-8 h-8 rounded"
        />
        <div
          v-else
          class="flex items-center justify-center w-8 h-8 bg-black/5 rounded"
        >
          <div class="i-mdi:image" />
        </div>
      </div>
      <div class="flex-1">
        <div v-if="peak">{{ peak.name }}</div>
        <div v-else>{{ placeholder }}</div>
      </div>
      <div
        v-if="isSubmitting"
        class="m-auto w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"
      />
    </div>
    <input
      ref="fileEl"
      type="file"
      accept="image/*"
      :disabled="isSubmitting"
      hidden
      @change="
        (event) => {
          const target = event.target as HTMLInputElement;
          if(target.files && target.files.length > 0)
            {
              files = Array.from(target.files);
              isSubmitting = true;
              emit('change', files, (value: boolean) => {
                files = null;
                isSubmitting = value;
              })
            }
        }
      "
    />
  </div>
</template>
