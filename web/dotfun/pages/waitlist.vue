<script lang="ts" setup>
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { toast } from "vue3-toastify";

useSeoMeta({
  description:
    "Be among the first to experience our meme website builder. Sign up now to secure early access and enjoy exclusive perks before the official launch.",
});

defineRouteRules({
  prerender: true,
});

definePageMeta({
  layout: "default"
})

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: object({
    email: string().email().required(),
  }),
});

const [email, emailAttrs] = defineField("email");

const loading = ref(false);
const firestore = useFirestore();
const waitlist = ref(collection(firestore, "waitlist"));

const onSubmit = handleSubmit(async (value) => {
  loading.value = true;

  const q = query(waitlist.value, where("email", "==", value.email));
  const exist = await getDocs(q);
  if (exist.empty) {
    return addDoc(waitlist.value, value)
      .then(() => {
        resetForm();
        toast.success("Hurray, we just added you to our waitlist.");
      })
      .catch(() => toast.error("Oops, an unexpected error occur."))
      .finally(() => (loading.value = false));
  }

  loading.value = false;

  return toast.error("Huh, you already on our waitlist.");
});
</script>
<template>
  <NuxtLayout class="flex-1 flex flex-col">
    <LayoutHeader />
    <div
      class="flex-1 flex flex-col justify-center space-y-4 lt-md:px-4 md:self-center md:min-w-sm"
    >
      <div class="flex flex-col">
        <div class="self-start flex items-center text-sm px-2 bg-amber rounded">
          <span>We are building saitama </span>
          <div class="i-mdi:lightning-bolt" />
        </div>
        <div class="text-4xl font-bold">
          <h1>Join waitlist for</h1>
          <h1
            class="font-black bg-clip-text bg-gradient-to-r from-black via-black/50 to-black/25 text-transparent"
          >
            Saitama
          </h1>
        </div>
      </div>
      <form
        class="flex flex-col space-y-4"
        @submit="onSubmit"
      >
        <div class="flex flex-col">
          <Input
            v-model="email"
            icon="i-mdi:email"
            name="email"
            type="email"
            placeholder="Enter email address"
            v-bind="emailAttrs"
          />
          <div
            v-if="errors.email"
            class="text-xs first-letter:uppercase text-red md:text-sm"
          >
            {{ errors.email }}
          </div>
        </div>
        <button
          :disabled="loading"
          class="flex items-center justify-center space-x-2 bg-black text-white py-2 rounded"
        >
          <div
            v-if="loading"
            class="size-6 border-2 border-white border-t-transparent rounded-full animate-spin"
          />
          <template v-else>
            <span>Join the waitlist</span>
            <div class="i-mdi:arrow-right text-base" />
          </template>
        </button>
      </form>
    </div>
    <LayoutFooter />
  </NuxtLayout>
</template>
