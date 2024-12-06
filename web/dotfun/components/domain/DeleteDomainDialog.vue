<script lang="ts" setup>
const open = defineModel<boolean>( { required: true });
const isSubmitting = ref(false);

const onDelete = () => {};
</script>
<template>
  <ActionDialog
    v-model="open"
    :is-submitting="isSubmitting"
    title="Delete Domain"
    description="Would you like to remove the domain from your project? After continuning, your site will no longer be accessible through this domain."
    action="Delete domain"
    @on-action="onDelete"
  />
</template>
