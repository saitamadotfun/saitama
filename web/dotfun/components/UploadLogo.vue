<script lang="ts" setup>
import type { Asset } from "@saitamadotfun/sdk";

defineProps<{ alt?: string }>();
const logo = defineModel<Asset | undefined>({ required: true });

const emit = defineEmits<{
  submit: [file: File, setIsSubmitting: (value: boolean) => void];
}>();
const isSubmitting = ref(false);
const inputEl = ref<HTMLInputElement | null>(null);

const file = ref<File | null>(null);
const preview = computed(() =>
  file.value ? URL.createObjectURL(file.value) : null
);
</script>
<template>
  <div class="flex flex-col space-y-2">
    <label>Logo</label>
    <div class="flex items-center space-x-2">
      <Avatar
        :src="preview ?? logo?.uri"
        :alt="alt"
      />
      <button
        type="button"
        :disabled="isSubmitting"
        class="btn !btn-primary items-center space-x-2 capitalize rounded-md"
        @click="inputEl?.click()"
      >
        <span> Upload Image </span>
        <div
          v-if="isSubmitting"
          class="size-6 border-3 border-white border-t-transparent rounded-full animate-spin"
        />
      </button>
    </div>
    <input
      ref="inputEl"
      type="file"
      accept="image/*"
      hidden
      @change="(event) => {
        const input =( event.target as HTMLInputElement);
        const files = input.files;
        if(files && files.length > 0) {
             file = files.item(0)!;
             isSubmitting = true;
            emit('submit', file, (value) => {
              file = null;
              isSubmitting = value;

            })
        };
      }"
    />
  </div>
</template>
