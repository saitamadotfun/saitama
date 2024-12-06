<script lang="ts" setup>
import moment from "moment";
import { formatPrice } from "~/utils/currency";

definePageMeta({
  layout: "dashboard",
});

const templateState = useTemplate();
const { getTemplates } = useTemplate();

const templates = computed(() => templateState.all);

const showTemplateCreateDialog = useTemplateDialog();

await useAsyncData(() => getTemplates());
</script>
<template>
  <NuxtLayout>
    <main class="flex-1 flex flex-col space-y-4">
      <div class="flex items-center space-x-4 px-4">
        <SearchWithDetail
          class="w-full md:max-w-1/2 xl:max-w-1/3"
          name=""
          placeholder="Search for a template"
          title=""
          :options="[]"
          :get-text="(option) => option"
        />
      </div>
      <div
        class="flex-1 flex flex-col max-w-screen max-h-screen overflow-scroll md:px-4"
      >
        <table class="w-full">
          <thead class="py-4">
            <tr class="bg-black/5 text-black/75">
              <th>Name</th>
              <th>Price</th>
              <th>Creator</th>
              <th>Created</th>
              <th>Updated</th>
              <th class="opacity-0">Updated</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-black/5">
            <tr
              v-for="template in templates"
              :key="template.id"
            >
              <td class="space-x-2 w-5/10 md:w-2/10">
                <img
                  :src="template.preview.uri"
                  :alt="template.preview.metadata?.alt"
                  width="48"
                  height="48"
                  class="m-auto inline ml-auto size-8 rounded md:size-12"
                />
                <span>
                  {{ template.name }}
                </span>
              </td>
              <td
                v-if="template.price"
                class='lt-md:text-end lt-md:!px-0'
             
              >
                {{ formatPrice(template.price) }}
              </td>
              <td>{{ template.user.email }}</td>
              <td>
                {{ moment(template.createdAt).startOf("hour").fromNow() }}
              </td>
              <td>
                {{ moment(template.updatedAt).startOf("hour").fromNow() }}
              </td>
              <td>
                <TemplateMenu
                  :template="template"
                  icon-class="!text-black/75"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    <TemplateCreateDialog v-model="showTemplateCreateDialog" />
  </NuxtLayout>
</template>
<style>
th {
  @apply text-start font-normal px-4 py-2 whitespace-nowrap;
}
tbody tr {
  @apply hover:bg-black/2;
}
td {
  @apply px-4 py-2 whitespace-nowrap md:py-4;
}
</style>
