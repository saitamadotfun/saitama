<script lang="ts" setup>
import type { Domain } from "@saitamadotfun/sdk";

const props = defineProps<{ domain: Domain }>();
const name = computed(() => {
  const part = props.domain.origin.split(".").filter(Boolean);
  return part.at(0);
});
</script>
<template>
  <div class="flex flex-col bg-white rounded">
    <div class="flex items-center p-4">
      <h1 class="flex-1 text-base font-medium">{{ domain.origin }}</h1>
      <div>
        <DomainMenu />
      </div>
    </div>
    <table>
      <thead>
        <tr class="p-2 bg-black/5">
          <th>Type</th>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-black/5">
        <tr>
          <td>CNAME</td>
          <td>{{ name ? name : "www" }}</td>
          <td>cname.vercel-dns.com.</td>
        </tr>
        <tr v-if="(name && name === 'www') || !name">
          <td>A</td>
          <td>@</td>
          <td>76.76.21.21</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
th {
  @apply px-4 py-2 font-normal text-xs text-start text-black/75 md:text-sm;
}

td {
  @apply text-sm px-4 py-2 md:text-base;
}
</style>
