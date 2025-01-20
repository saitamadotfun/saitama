<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import { mixed, number, object, string } from "yup";

const open = defineModel<boolean>({ required: true });

const { api } = useApi();
const { createTemplate } = useTemplate();

const { errors, isSubmitting, defineField, handleSubmit, handleReset } =
  useForm({
    initialValues: {
      name: "",
      description: "",
      preview: undefined as unknown as File,
      price: {
        currency: "EUR" as const,
        amount: 0,
      },
      metadata: {
        repo: "",
        type: "github" as const,
        framework: "",
        tags: "",
        categories: "",
        previewURL: "",
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
        previewURL: string().url().required("Preview URL is a required field"),
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
const [previewURL] = defineField("metadata.previewURL");

const onSubmit = handleSubmit(({ preview, ...data }) => {
  return api.asset
    .create([
      { file: preview, name: preview.name, metadata: { alt: data.name } },
    ])
    .then(({ data: [preview] }) =>
      createTemplate({
        ...data,
        preview: preview.id,
        metadata: {
          ...data.metadata,
          tags: data.metadata.tags.trim().split(/\,/g).filter(Boolean),
          categories: data.metadata.categories
            .trim()
            .split(/\,/g)
            .filter(Boolean),
        },
        price: {
          ...data.price,
          amount: Number(data.price.amount),
        },
      })
    )
    .then(() => toast.success("Template created successfully"))
    .then(handleReset)
    .catch(() => toast.error("Oops! Failed to create template, try again."));
});
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
            >New Template</DialogTitle
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
                  ([value], callback) => {
                    callback(false);
                    preview = value;
                  }
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
            <InputWithError :error="errors['metadata.previewURL']">
              <InputWithDetail
                v-model="previewURL"
                is="input"
                name="previewURL"
                title="Preview URL"
                description="Live preview url"
                placeholder="Preview URL"
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
              >Create template</span
            >
          </button>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
