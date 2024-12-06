<script lang="ts" setup>
import { object, string } from "yup";
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import { TabPanel } from "@headlessui/vue";

const emit = defineEmits<{
  "update:modelValue": [value: { name: string }];
  submit: [value: { name: string }];
}>();
const props = defineProps<{ modelValue: { name: string } }>();

const { createWorkspace } = useWorkspace();

const { defineField, errors, handleSubmit, isSubmitting } = useForm<{
  name: string;
}>({
  validationSchema: object({ name: string().required() }),
  initialValues: props.modelValue,
});
const [name, attrs] = defineField("name");
const onSubmit = handleSubmit((values) => {
  return createWorkspace(values)
    .then((values) => {
      emit("update:modelValue", values);
      emit("submit", values);
    })
    .catch((error) => {
      console.error(error);
      toast.error("Oops! Error creating workspace, try again.");

      return Promise.reject(error);
    });
});
</script>
<template>
  <TabPanel class="flex-1 flex flex-col justify-center space-y-4">
    <div class="flex flex-col">
      <Avatar :alt="name" />
      <h1 class="text-base font-medium md:text-lg">Create Workspace</h1>
    </div>
    <form
      class="flex flex-col space-y-4 md:space-y-2"
      @submit.prevent="onSubmit"
    >
      <InputWithError :error="errors.name">
        <Input
          v-model="name"
          v-bind="attrs"
          placeholder="Workspace name"
          name="name"
          type="text"
        />
      </InputWithError>
      <button
        :disabled="isSubmitting"
        class="btn btn-primary p-0 rounded"
      >
        <div
          v-if="isSubmitting"
          class="my-2 size-6 border-3 border-white border-t-transparent rounded-full animate-spin"
        />
        <span
          v-else
          class="py-3"
          >Create workspace</span
        >
      </button>
    </form>
  </TabPanel>
</template>
