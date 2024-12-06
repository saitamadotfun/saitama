<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";

const { api } = useApi();
const workspaceStore = useWorkspace();

const workspaceId = getWorkspaceId();
const showDeleteWorkspaceDialog = ref(false);

const workspace = computed(() => workspaceStore.get(workspaceId.value!)!);
await useAsyncData(async () => workspaceStore.getWorkspace(workspaceId.value!));

const { defineField, setFieldValue, handleSubmit } = useForm({
  initialValues: {
    name: workspace.value?.name,
    logo: workspace.value?.logo,
  },
});

const [logo] = defineField("logo");
const [name] = defineField("name");

const updateLogo = (file: File, setIsSubmitting: (value: boolean) => void) => {
  return api.asset
    .create([
      { file, name: file.name, metadata: { alt: workspace.value.name } },
    ])
    .then(({ data: [asset] }) => {
      setFieldValue("logo", asset);

      return workspaceStore.updateWorkspace(workspace.value.id, {
        logo: asset.id,
      });
    })
    .then(() => toast.success("Workspace logo updated successfully."))
    .finally(() => setIsSubmitting(false));
};

const onSubmit = handleSubmit((values) => {
  return workspaceStore
    .updateWorkspace(workspace.value.id, {
      name: values.name,
    })
    .then(() => toast.success("Workspace updated successfully."));
});
</script>

<template>
  <TabPanel
    as="form"
    class="flex flex-col space-y-8 px-4"
    @submit.prevent="onSubmit"
  >
    <div class="flex flex-col space-y-4">
      <UploadLogo
        v-model="logo"
        :alt="workspace?.name"
        @submit="updateLogo"
      />
      <InputWithDetail
        v-model="name"
        is="input"
        title="Name"
        placeholder="Workspace name"
        name="name"
      />
    </div>
    <div class="flex items-center space-x-4">
      <button
        type="button"
        class="btn !bg-red-500 text-white capitalize rounded"
        @click="showDeleteWorkspaceDialog = true"
      >
        Delete Workspace
      </button>
      <button
        type="submit"
        class="btn !bg-black/10 capitalize rounded"
      >
        Update Workspace
      </button>
    </div>
    <SettingsDeleteDialog
      v-if="workspaceId"
      v-model="showDeleteWorkspaceDialog"
      :workspace-id="workspaceId"
    />
  </TabPanel>
</template>
