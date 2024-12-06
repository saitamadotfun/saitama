<script lang="ts" setup>
import { signInWithPopup } from "firebase/auth";
import type { SocialLogin } from "~/config/socialsLogin";

const isSubmitting = ref(false);

const auth = useFirebaseAuth();
const { signInWithIdToken } = useUser();

const emit = defineEmits<{ submit: [value: boolean] }>();
const props = defineProps<SocialLogin & { disabled?: boolean }>();

const onSubmit = () => {
  const provider = new props.plugin();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });

  if (auth) {
    emit("submit", true);
    isSubmitting.value = true;
    return signInWithPopup(auth, provider)
      .then(async ({ user }) => {
        const idToken = await user.getIdToken();
        return signInWithIdToken(idToken);
      })
      .finally(() => {
        isSubmitting.value = false;
        emit("submit", false);
      });
  }
};
</script>
<template>
  <button
    :disabled="isSubmitting && disabled"
    class="flex items-center space-x-4 border border-black p-3 rounded-md"
    @click="onSubmit"
  >
    <div
      class="text-2xl"
      :class="icon"
    />
    <div class="flex-1 flex items-center justify-center">
      <div
        v-if="isSubmitting"
        class="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"
      />
      <span v-else>{{ name }}</span>
    </div>
  </button>
</template>
