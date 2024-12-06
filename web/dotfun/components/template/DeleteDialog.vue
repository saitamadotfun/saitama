<script lang="ts" setup>
const props = defineProps<{ templateId: string }>();
const open = defineModel<boolean>({ required: true });

const isSubmitting = ref(false);
const { deleteTemplate } = useTemplate();

const onDelete = () => {
  isSubmitting.value = true;
  return deleteTemplate(props.templateId).finally(
    () => (isSubmitting.value = false)
  );
};
</script>
<template>
  <ActionDialog
    v-model="open"
    :is-submitting="isSubmitting"
    title="Delete Template"
    description="Deleting a template will delete it for all users and cannot be undone."
    action="Delete"
    @on-action="onDelete"
  />
</template>
