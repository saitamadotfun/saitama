<script lang="ts" setup>
import { TabPanel } from "@headlessui/vue";
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";

import { format } from "~/utils/format";

const config = useRuntimeConfig();
const { user, updateUser } = useUser();
const { defineField, handleSubmit, isSubmitting } = useForm({
  initialValues: user,
});

const authUrl = computed(() =>
  import.meta.server ? config.AUTH_BASE_URL : config.public.API_BASE_URL
);

const [firstName] = defineField("firstName");
const [lastName] = defineField("lastName");
const [email] = defineField("email");

const onSubmit = handleSubmit((value) => {
  if (user)
    return updateUser(user.id, value).then(() =>
      toast.success("Update account successful.")
    );
});
</script>
<template>
  <TabPanel
    v-if="user"
    as="form"
    class="flex-1 flex flex-col space-y-4 lt-md:mx-4 lt-md:self-start lt-md:w-9/13"
    @submit.prevent="onSubmit"
  >
    <div class="flex flex-col space-y-2">
      <div class="flex space-x-4">
        <InputWithDetail
          is="input"
          v-model="firstName"
          title="First name"
          placeholder="John"
          name="email"
          type="email"
          attrs=""
          class="md:max-w-5/10 lt-md:max-w-5/11"
        />
        <InputWithDetail
          is="input"
          v-model="lastName"
          title="Last name"
          placeholder="Doe"
          name="email"
          type="email"
          attrs=""
          class="md:max-w-5/11 lt-md:max-w-5/10"
        />
      </div>
      <div>
        <InputWithDetail
          :disabled="true"
          is="input"
          v-model="email"
          title="Email"
          placeholder="johndoe@example.com"
          name="email"
          type="email"
          attrs=""
          class="max-w-full disabled"
        />
      </div>
    </div>
    <div class="flex space-x-4">
      <NuxtLink
        type="button"
        :href="format('%/logout', authUrl)"
        class="flex-1 btn !bg-red-500 text-white p-3 capitalize rounded"
      >
        Logout
      </NuxtLink>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="flex-1 btn !btn-primary capitalize rounded"
      >
        <div
          v-if="isSubmitting"
          class="size-6 border-3 border-white border-t-transparent rounded-full animate-spin"
        />
        <span v-else>Update</span>
      </button>
    </div>
  </TabPanel>
</template>
