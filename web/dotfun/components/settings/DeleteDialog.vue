<script lang="ts" setup>
const props = defineProps<{ workspaceId: string }>();
const open = defineModel<boolean>({ required: true });

const isSubmitting = ref(false);
const { deleteWorkspace } = useWorkspace();

const onDelete = () => {
  isSubmitting.value = true;
  return deleteWorkspace(props.workspaceId)
    .then(() => {
      navigateTo("/workspaces");
    })
    .finally(() => (isSubmitting.value = false));
};
</script>
<template>
  <ActionDialog
    v-model="open"
    :is-submitting="isSubmitting"
    title="Delete Workspace"
    description="Deleting a workspace will delete all sites under workspace and can't be undo."
    action="Delete"
    @on-action="onDelete"
  />
</template>
