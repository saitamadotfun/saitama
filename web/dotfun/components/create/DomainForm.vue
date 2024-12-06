<script lang="ts" setup>
import { boolean, object, string } from "yup";
import { useForm } from "vee-validate";
import { TabPanel } from "@headlessui/vue";
import type { DomainExist } from "@saitamadotfun/sdk";
import { domainAutocomplete } from "@saitamadotfun/sdk/external";

const modelValue = defineModel<DomainExist>();
const emit = defineEmits<{
  previous: [];
  change: [value: DomainExist];
}>();

const { api } = useApi();
const domains = ref<DomainExist[]>([]);

const validationSchema = object({
  domain: object({
    origin: string().required(),
    free: boolean().required(),
    exist: boolean().required(),
  }).required("domain is a required field"),
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    domain: modelValue.value,
  },
});

const [domain] = defineField("domain");
const onSubmit = handleSubmit(({ domain }) => {
  modelValue.value = domain;
  if (domain) emit("change", domain);
});

const onSearch = (value: string) => {
  const origins = domainAutocomplete(value);
  return api.domain
    .checkExists(...origins)
    .then(({ data }) => (domains.value = data));
};

watch(domain, (value) => {
  if (value) onSubmit();
});
</script>
<template>
  <TabPanel
    as="form"
    class="flex-1 flex flex-col space-y-8"
    @submit.prevent="onSubmit"
  >
    <div>
      <h1 class="text-lg font-medium">Provide domain</h1>
      <p class="text-xs text-black/75">
        Use our free domain or connect domain from your dns service
      </p>
    </div>
    <div class="flex-1 flex flex-col">
      <InputWithError :error="errors.domain">
        <SearchWithDetail
          is="input"
          title="Domain"
          name="origin"
          placeholder="example.com"
          description="Buy or add existing custom domain"
          v-model="domain"
          :options="domains"
          :getText="(option: DomainExist) => option?.origin"
          @search="onSearch"
        >
          <template v-slot="{ option }">
            <div class="flex items-center space-x-2">
              <button
                v-if="option.exist"
                class="px-4 py-0.5 bg-red-100 text-red-500 rounded-md"
              >
                UNAVAILABLE
              </button>
              <button
                v-else-if="option.free"
                class="px-4 py-0.5 bg-green-100 text-green-500 rounded-md"
              >
                FREE
              </button>
              <span> {{ option.origin }}</span>
            </div>
          </template>
        </SearchWithDetail>
      </InputWithError>
    </div>
    <div class="flex justify-end space-x-4">
      <button
        type="button"
        class="btn-outline"
        @click="emit('previous')"
      >
        Prev
      </button>
      <button
        type="submit"
        class="btn-outline"
      >
        Next
      </button>
    </div>
  </TabPanel>
</template>
