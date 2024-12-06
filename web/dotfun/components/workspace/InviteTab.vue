<script lang="ts" setup>
import { useForm } from "vee-validate";
import { TabPanel } from "@headlessui/vue";
import type { Workspace } from "@saitamadotfun/sdk";
import { array, object, string, ValidationError } from "yup";
import { toast } from "vue3-toastify";

const props = defineProps<{ workspace: Pick<Workspace, "id" | "name"> }>();
const emit = defineEmits<{ submit: [value?: Workspace] }>();

const { inviteMembers } = useWorkspace();

const { defineField, errors, handleSubmit, setFieldError, isSubmitting } =
  useForm<{
    emails: string;
  }>({
    validationSchema: object({
      emails: string().required(),
    }),
  });
const [emails, attrs] = defineField("emails");

const onSubmit = handleSubmit((values) => {
  const emails = values.emails.split(/\s+|,/).filter(Boolean);
  return array(string().email().required())
    .required()
    .validate(emails)
    .then((emails) => inviteMembers(props.workspace.id, { emails }))
    .then((values) => emit("submit", values))
    .catch((error) => {
      if (error instanceof ValidationError)
        setFieldError("emails", error.errors);
      toast.error("Oops! Sending invite failed.");
    });
});
</script>
<template>
  <TabPanel class="flex-1 flex flex-col space-y-4">
    <div class="flex-1 flex flex-col justify-center space-y-4">
      <div class="flex flex-col">
        <Avatar :alt="workspace.name" />
        <h1 class="text-lg font-medium">Invite Editors</h1>
      </div>
      <form
        class="flex flex-col justify-center space-y-4"
        @submit.prevent="onSubmit"
      >
        <InputWithError :error="errors.emails">
          <Input
            v-model="emails"
            v-bind="attrs"
            placeholder="Emails (comma seperated)"
            name="emails"
            type="text"
          />
        </InputWithError>
        <div class="flex flex-col space-y-2">
          <button
            :disabled="isSubmitting"
            type="submit"
            class="btn !btn-primary rounded py-0"
          >
            <div
              v-if="isSubmitting"
              class="my-2 size-6 border-3 border-white border-t-transparent rounded-full animate-spin"
            />
            <span
              v-else
              class="py-3"
            >
              Send Invites
            </span>
          </button>
          <button
            type="button"
            class="btn !bg-black/10 rounded py-3"
          >
            Copy invite link
          </button>
        </div>
      </form>
    </div>
    <button
      class="btn"
      @click="emit('submit')"
    >
      skip
    </button>
  </TabPanel>
</template>
