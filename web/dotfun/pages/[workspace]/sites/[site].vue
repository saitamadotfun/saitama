<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
  middleware: "protected",
});

const siteState = useSite();
const route = useRoute();

const id = computed(() => route.params.site as string);

onMounted(() => siteState.ping(id.value));

const { data } = await useAsyncData(async () => {
  return siteState.getSite(id.value);
});

const site = computed(() => siteState.get(id.value) ?? data.value);

if (site.value)
  useSeoMeta({
    title: site.value.name,
    description: site.value.metadata.description,
    ogImage: site.value.template.preview.uri,
  });
</script>
<template>
  <NuxtLayout>
    <div class="flex-1 flex flex-col bg-black/5 py-8">
      <div
        v-if="site"
        class="flex flex-col space-y-8 px-4 md:self-center"
      >
        <SiteInfoDetail :site="site" />
        <SiteInfoDomainList :domains="site.domains" />
      </div>
    </div>
  </NuxtLayout>
</template>
