<script lang="ts" setup>
import { TabPanel } from "@headlessui/vue";
import type { Workspace } from "@saitamadotfun/sdk";
import { toast } from "vue3-toastify";

const props = defineProps<{ workspace: Pick<Workspace, "name" | "id"> }>();
const emit = defineEmits<{ submit: [workspace?: Workspace | undefined] }>();

const { api } = useApi();
const { updateWorkspace } = useWorkspace();

const file = ref<File>();
const isSubmitting = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const logo = computed(() =>
  file.value ? URL.createObjectURL(file.value) : undefined
);

const onSelectFile = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const fileItem = files.item(0);
    if (fileItem) file.value = fileItem;
  }
};

const onSubmit = async () => {
  isSubmitting.value = true;
  const derefFile = file.value;

  if (derefFile) {
    const [asset] = await api.asset
      .create([
        {
          file: derefFile,
          name: derefFile.name,
          metadata: { alt: props.workspace.name },
        },
      ])
      .then(({ data }) => data);

    const workspace = await updateWorkspace(props.workspace.id, {
      logo: asset.id,
    });

    return emit("submit", workspace);
  }

  return emit("submit");
};

const onContinue = () =>
  onSubmit()
    .then(() => toast.success("New workspace created"))
    .catch((error) => {
      console.error(error);
      toast.error("Oops! Error uploading image");
    })
    .finally(() => (isSubmitting.value = false));
</script>
<template>
  <TabPanel class="flex-1 flex flex-col justify-center space-y-4">
    <div class="flex flex-col">
      <Avatar
        :src="logo"
        :alt="workspace.name"
      />
      <h1 class="text-lg font-medium">Upload Logo</h1>
      <div class="inline text-xs text-black/75 md:text-sm">
        <span> Please upload an image that is min </span>
        <pre class="inline">200 x 200px</pre>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        hidden="true"
        @change="onSelectFile"
      />
      <button
        class="btn btn-primary rounded py-3"
        @click="fileInput ? fileInput.click() : void 0"
      >
        Select image
      </button>
      <button
        class="btn bg-black/10 rounded py-0"
        @click="onContinue"
      >
        <div
          v-if="isSubmitting"
          class="my-2 size-6 border-3 border-black border-t-transparent rounded-full animate-spin"
        />
        <span
          v-else
          class="py-3"
        >
          Continue
        </span>
      </button>
    </div>
  </TabPanel>
</template>
