<script lang="ts" setup>
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const { signInWithIdToken } = useUser();
const auth = useFirebaseAuth();

const error = ref<unknown>(null);

onMounted(async () => {
  if (auth)
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("auth.email");
      if (!email)
        email = window.prompt("Please provide your email for confirmation");
      if (email)
        return signInWithEmailLink(auth, email, window.location.href)
          .then(async ({ user }) => {
            const idToken = await user.getIdToken();
            return signInWithIdToken(idToken);
          })
          .catch((err) => {
            error.value = err;
            return Promise.reject(err);
          });
      return;
    }

  navigateTo("/", { replace: true });
});
</script>
<template>
  <div
    v-if="error"
    class="m-auto flex flex-col items-center justify-center space-y-4"
  >
    <div class="flex flex-col items-center justify-center space-y-2">
      <h1 class="text-lg font-medium md:text-xl">
        Oops! an unexpected error occur
      </h1>
      <pre
        class="text-xs bg-black/5 p-2 rounded max-w-sm text-wrap md:text-sm"
        >{{ error }}</pre
      >
    </div>
    <NuxtLink
      href="/"
      class="bg-black text-white px-4 py-2 rounded"
      >Login</NuxtLink
    >
  </div>
  <div
    v-else
    className="m-auto w-8 h-8 border-3 border-black rounded-full border-t-transparent animate-spin"
  />
</template>
