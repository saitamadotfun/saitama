<script setup lang="ts">
import { useForm } from "vee-validate";
import type { Site } from "@saitamadotfun/sdk";
import {
  Dialog,
  DialogPanel,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import { mixed, object, string } from "yup";
import { toast } from "vue3-toastify";

const props = defineProps<{ site: Site }>();
const open = defineModel<boolean>({ required: true });

const { api } = useApi();
const { updateSite } = useSite();

const { isSubmitting, defineField, handleSubmit, errors } = useForm({
  initialValues: {
    name: props.site.name,
    metadata: {
      title: props.site.metadata.title,
      description: props.site.metadata.description,
      settings: {
        favicon: props.site.metadata.settings?.favicon,
        socialPreview: props.site.metadata.settings?.socialPreview,
      },
    },
  },
  validationSchema: object({
    name: string().required(),
    metadata: object({
      title: string().required(),
      description: string().required(),
      settings: object({
        favicon: mixed(),
        preview: mixed(),
      }),
    }).required(),
  }),
});

const [name] = defineField("name");
const [title] = defineField("metadata.title");
const [description] = defineField("metadata.description");
const [siteFavicon] = defineField("metadata.settings.favicon");
const [sitePreview] = defineField("metadata.settings.socialPreview");

const updateFile = (files: File[], key: "favicon" | "socialPreview") => {
  return api.asset
    .create(
      files.map((file) => ({
        file,
        name: file.name,
        metadata: { alt: file.name },
      }))
    )
    .then(({ data }) => {
      const [asset] = data;
      return updateSite(props.site.id, {
        metadata: {
          ...props.site.metadata,
          settings: {
            ...props.site.metadata.settings,
            [key]: asset,
          },
        },
      });
    });
};

const onSubmit = handleSubmit((value) => {
  return updateSite(props.site.id, value)
    .then(() => toast.success("Site info updated successfully"))
    .catch(() => toast.error("Oops! an unexpected error occur, try again."));
});
</script>
<template>
  <Dialog
    :open="open"
    @close="() => (open = false)"
  >
    <DialogOverlay class="fixed inset-0 bg-black/25" />
    <div class="fixed inset-0 flex flex-col items-center justify-center">
      <DialogPanel class="w-sm flex flex-col space-y-2 bg-white p3 rounded-md">
        <header class="flex items-center">
          <DialogTitle class="flex-1 text-lg font-medium"
            >Edit Site</DialogTitle
          >
          <button
            class="p-2"
            @click="open = false"
          >
            <div class="i-mdi:close text-lg" />
          </button>
        </header>
        <form
          class="flex flex-col space-y-4"
          @submit.prevent="onSubmit"
        >
          <div class="flex flex-col space-y-2">
            <InputWithError :error="errors.name">
              <InputWithDetail
                v-model="name"
                is="input"
                name="email"
                placeholder="Name"
                title="Site name"
                type="text"
                attrs=""
              />
            </InputWithError>
            <InputWithError :error="errors['metadata.title']">
              <InputWithDetail
                v-model="title"
                is="input"
                name="title"
                placeholder="Site title"
                title="Title"
                type="text"
                attrs=""
              />
            </InputWithError>
            <InputWithError :error="errors['metadata.description']">
              <InputWithDetail
                v-model="description"
                is="textarea"
                name="description"
                placeholder="Description"
                title="Site Description"
                type="text"
                attrs=""
              />
            </InputWithError>
            <InputWithError :error="errors['metadata.settings.favicon']">
              <InputFile
                v-model="siteFavicon"
                label="Site Favicon"
                placeholder="Choose a file"
                @change="
                  (files, callback) =>
                    updateFile(files, 'favicon')
                      .then(() =>
                        toast.success('Site favicon updated successfully')
                      )
                      .finally(() => callback(false))
                "
              />
            </InputWithError>
            <InputWithError :error="errors['metadata.settings.socialPreview']">
              <InputFile
                v-model="sitePreview"
                label="Site Preview"
                placeholder="Choose a file"
                @change="
                  (files, callback) =>
                    updateFile(files, 'socialPreview')
                      .then(() =>
                        toast.success('Site preview updated successfully')
                      )
                      .finally(() => callback(false))
                "
              />
            </InputWithError>
          </div>
          <button
            :disabled="isSubmitting"
            class="!btn !btn-primary py-3 rounded"
            type="submit"
          >
            <div
              v-if="isSubmitting"
              class="m-auto w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"
            />
            <span v-else>Save</span>
          </button>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
