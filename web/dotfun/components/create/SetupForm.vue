<script lang="ts" setup>
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { TabPanel } from "@headlessui/vue";
import { categories } from "@saitamadotfun/sdk/constants";

import type { SetupForm } from "~/form/createForm";

const setup = defineModel<SetupForm>();
const emit = defineEmits<{ change: [value: SetupForm] }>();

const validationSchema = object({
  name: string().required(),
  description: string().required(),
  category: string().required(),
});

const { defineField, handleSubmit, errors } = useForm<SetupForm>({
  validationSchema,
  initialValues: setup.value,
});
const [name, nameAttrs] = defineField("name");
const [category, categoryAttrs] = defineField("category");
const [description, descriptionAttrs] = defineField("description");

const onSubmit = handleSubmit((values) => {
  setup.value = values;
  if (values) emit("change", values);
});
</script>
<template>
  <TabPanel
    as="form"
    class="flex flex-col space-y-8"
    @submit.prevent="onSubmit"
  >
    <div>
      <h1 class="text-lg font-medium">Create now</h1>
      <p class="text-xs text-black/75">
        Setup site and fill in basic details below
      </p>
    </div>
    <div class="flex flex-col space-y-4">
      <InputWithError :error="errors.name">
        <InputWithDetail
          v-model="name"
          :attrs="nameAttrs"
          is="input"
          title="name"
          name="name"
          placeholder="Site name"
          description="What is the name of your site?"
        />
      </InputWithError>
      <InputWithError :error="errors.description">
        <InputWithDetail
          v-model="description"
          :attrs="descriptionAttrs"
          is="textarea"
          title="description"
          name="description"
          placeholder="Site description"
          description="Write a short description of your site"
        />
      </InputWithError>
      <InputWithError :error="errors.category">
        <SelectWithDetail
          v-model="category"
          :attrs="categoryAttrs"
          title="category"
          name="category"
          placeholder="Select a category"
          description="What is your site category?"
          :options="categories"
          :get-text="(option) => option"
        >
          <template v-slot="{ option }">
            <span class="first-letter:capitalize">
              {{ option }}
            </span>
          </template>
        </SelectWithDetail>
      </InputWithError>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        class="py-2 border-b border-black"
      >
        NEXT
      </button>
    </div>
  </TabPanel>
</template>
