<script setup lang="ts">
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import type { Template } from "@saitamadotfun/sdk";
import { mixed, number, object, string } from "yup";
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const open = defineModel<boolean>({ required: true });
const props = defineProps<{ template: Template }>();

const { api } = useApi();
const { updateTemplate } = useTemplate();

const { errors, isSubmitting, defineField, handleSubmit, setFieldValue } =
  useForm({
    initialValues: {
      name: props.template.name,
      description: props.template.description,
      preview: props.template.preview,
      price: props.template.price,
      metadata: {
        repo: props.template.metadata.repo,
        type: props.template.metadata.type,
        framework: props.template.metadata.framework,
        tags: props.template.metadata.tags.join(","),
        categories: props.template.metadata.categories.join(","),
      },
    },
    validationSchema: object({
      name: string().required(),
      preview: mixed().required(),
      description: string().required(),
      price: object({
        amount: number().min(0).typeError("Invalid amount"),
      }),
      metadata: object({
        framework: string().required("Framework is a required field"),
        repo: string().required("Repo is a required field"),
        tags: string().required("Tags is a required field"),
        categories: string().required("Categories is a required field"),
      }),
    }),
  });

const [name] = defineField("name");
const [preview] = defineField("preview");
const [description] = defineField("description");
const [amount] = defineField("price.amount");
const [repo] = defineField("metadata.repo");
const [tags] = defineField("metadata.tags");
const [framework] = defineField("metadata.framework");
const [categories] = defineField("metadata.categories");

const onSubmit = handleSubmit(({ preview, ...data }) => {
  return updateTemplate(props.template.id, {
    ...data,
    preview: preview.id,
    metadata: {
      ...data.metadata,
      tags: data.metadata.tags.trim().split(/\,/g).filter(Boolean),
      categories: data.metadata.categories.trim().split(/\,/g).filter(Boolean),
    },
    price: {
      ...data.price,
      amount: Number(data.price.amount),
    },
  })
    .then(() => toast.success("Template updated successfully"))
    .catch(() => toast.error("Oops! Failed to updating template, try again."));
});

const onPreviewSubmit = (file: File) => {
  return api.asset
    .create([{ file, name: file.name, metadata: { alt: props.template.name } }])
    .then(({ data: [asset] }) => {
      setFieldValue("preview", asset);
      return updateTemplate(props.template.id, {
        preview: asset.id,
      });
    });
};
</script>
<template>
  <Dialog
    :open="open"
    class="relative z-20"
    @close="open = false"
  >
    <DialogOverlay class="fixed inset-0 bg-black/25" />
    <div class="fixed inset-0 flex flex-col justify-end">
      <DialogPanel
        class="flex flex-col space-y-4 bg-white rounded-t-md md:w-md lt-md:rounded-md md:ml-auto"
      >
        <header class="flex items-center p-2 bg-black/5">
          <DialogTitle class="flex-1 text-lg md:text-xl font-medium"
            >Update Template</DialogTitle
          >
          <div>
            <button
              class="p-2"
              @click="open = false"
            >
              Close
            </button>
          </div>
        </header>
        <form
          class="flex flex-col space-y-4 p-4"
          @submit.prevent="onSubmit"
        >
          <div class="flex flex-col space-y-2">
            <InputWithError :error="errors.name">
              <InputWithDetail
                v-model="name"
                is="input"
                name="name"
                title="Name"
                placeholder="Template name"
              />
            </InputWithError>
            <InputWithError :error="errors.description">
              <InputWithDetail
                v-model="description"
                is="textarea"
                name="description"
                title="Description"
                placeholder="Template description"
              />
            </InputWithError>
            <InputWithError :error="errors['price.amount']">
              <InputWithDetail
                v-model="amount"
                is="input"
                name="price"
                title="Price"
                icon="i-mdi:currency-eur"
                placeholder="Template price"
              />
            </InputWithError>
            <InputWithError :error="errors.preview">
              <InputFile
                v-model="preview"
                label="Preview"
                placeholder="Select an image"
                @change="
                  ([value], callback) =>
                    onPreviewSubmit(value).finally(() => callback(false))
                "
              />
            </InputWithError>
            <InputWithError :error="errors['metadata.repo']">
              <InputWithDetail
                v-model="repo"
                is="input"
                name="repo"
                title="Repository URL"
                placeholder="github.com/org"
              />
            </InputWithError>
            <InputWithError :error="errors['metadata.framework']">
              <SelectWithDetail
                v-model="framework"
                name="framework"
                :options="['nextjs']"
                title="Framework"
                placeholder="Template framework"
                :get-text="(option) => option"
              >
                <template v-slot="{ option }">
                  <span class="capitalize">
                    {{ option }}
                  </span>
                </template>
              </SelectWithDetail>
            </InputWithError>
            <InputWithError :error="errors['metadata.categories']">
              <InputWithDetail
                v-model="categories"
                is="input"
                name="categories"
                title="Categories"
                description="Categories seperated with comma"
                placeholder="NFT"
              />
            </InputWithError>
            <InputWithError :error="errors['metadata.tags']">
              <InputWithDetail
                v-model="tags"
                is="input"
                name="tags"
                title="Tags"
                description="Tags seperated with comma"
                placeholder="Token Launch"
              />
            </InputWithError>
          </div>
          <button
            :disabled="isSubmitting"
            type="submit"
            class="btn !btn-primary p-0 rounded"
          >
            <div
              v-if="isSubmitting"
              class="w-6 h-6 my-2 border-3 border-white border-t-transparent rounded-full animate-spin"
            />
            <span
              v-else
              class="py-3"
              >Update template</span
            >
          </button>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
