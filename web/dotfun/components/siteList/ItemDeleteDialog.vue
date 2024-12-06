<script lang="ts" setup>
const props = defineProps<{ siteId: string }>();
const open = defineModel<boolean>({ required: true });

const { deleteSite } = useSite();
const isSubmitting = ref(false);

const onDelete = () => {
  isSubmitting.value = true;
  return deleteSite(props.siteId).finally(() => (isSubmitting.value = false));
};
</script>
<template>
  <ActionDialog
    v-model="open"
    :is-submitting="isSubmitting"
    title="Delete Site"
    description="Deleting a site will delete it for all collaborators and cannot be undone."
    action="Delete Site"
    @on-action="onDelete"
  />
</template>
