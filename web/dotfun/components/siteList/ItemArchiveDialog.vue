<script lang="ts" setup>
const props = defineProps<{ siteId: string }>();
const open = defineModel<boolean>({ required: true });

const { updateSite } = useSite();
const siteArchiveState = useSiteArchive();
const isSubmitting = ref(false);

const onArchive = () => {
  isSubmitting.value = true;
  return updateSite(props.siteId, { deleted: true })
    .then((site) => siteArchiveState.set(site))
    .finally(() => (isSubmitting.value = false));
};
</script>
<template>
  <ActionDialog
    v-model="open"
    :is-submitting="isSubmitting"
    title="Archive Site"
    description="This will move the site to the workspace archive for all workspace members and unpublish its sites."
    action="Archive Site"
    @on-action="onArchive"
  />
</template>
