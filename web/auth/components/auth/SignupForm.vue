<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import { object, string } from "yup";
import { useFirebaseAuth } from "vuefire";
import { sendSignInLinkToEmail } from "firebase/auth";

import { socialLogins } from "~/config/socialsLogin";
import { actionCodeSettings } from "~/config/authActionCodeSettings";

const auth = useFirebaseAuth();
const isLoggingIn = ref(false);

const validationSchema = object({
  email: string().email().required(),
});

const { defineField, errors, handleSubmit, isSubmitting } = useForm<{
  email: string;
}>({
  validationSchema,
});
const [email] = defineField("email");

const onSubmit = handleSubmit(({ email }) => {
  if (auth)
    return sendSignInLinkToEmail(auth, email, actionCodeSettings())
      .then(() => window.localStorage.setItem("auth.email", email))
      .then(() => {
        toast.success("Email sent to " + email + ". Check your inbox.");
      })
      .catch((error) => {
        toast.error(error);
        console.error(error);
      });
});
</script>
<template>
  <div class="flex-1 flex flex-col px-4">
    <div class="flex-1 flex flex-col justify-center md:max-w-md md:self-center">
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col">
          <h1 class="text-xl font-medium">Login or Sign up</h1>
          <p class="text-black/75">
            A magic link sent to your email. An account will be automatically
            created for new users.
          </p>
        </div>
        <form
          class="flex flex-col space-y-8"
          @submit.prevent="onSubmit"
        >
          <InputWithError :error="errors.email">
            <Input
              v-model="email"
              placeholder="johndeo@example.com"
              icon="i-mdi:email"
              name="email"
              type="email"
            />
          </InputWithError>
          <button
            :disabled="isSubmitting"
            type="submit"
            class="!btn !btn-primary rounded"
            :class="isSubmitting ? '!p-2' : '!p-4'"
          >
            <div
              v-if="isSubmitting"
              class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
            />
            <span v-else> Send email link </span>
          </button>
        </form>
        <div class="flex flex-col space-y-4">
          <div class="text-center">OR</div>
          <div class="flex flex-col">
            <AuthOauthSignInButton
              v-for="socialLogin in socialLogins"
              v-bind="socialLogin"
              :disabled="isLoggingIn"
              @submit="(value) => (isLoggingIn = value)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 max-w-md self-center">
      <p class="text-black/75">
        Don't have an account? Use any of the options above and your account
        will be automatically registered.
      </p>
    </div>
  </div>
</template>
