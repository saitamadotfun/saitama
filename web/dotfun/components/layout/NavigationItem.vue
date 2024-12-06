<script setup lang="ts">
import type { Navigation } from "~/config/navigations";

const route = useRoute();

type Props = {
  navigation: Navigation;
};

const props = defineProps<Props>();

const active = computed(() => {
  if (route.hash) return route.hash === props.navigation.link;
  else return route.path === props.navigation.link;
});


</script>
<template>
  <NuxtLink
    :href="navigation.link"
    class="flex items-center space-x-2 px-4 py-1 hover:text-black lt-md:text-xs text-sm md:p-2"
    :class="active ? 'text-black' : 'text-black/75'"
  >
    <span :class="active ? 'border-b-1.5 border-black pb-0.5' : ''">
      {{ navigation.name }}
    </span>
    <div
      v-if="navigation.external"
      class="i-mdi:arrow-up rotate-45"
    />
  </NuxtLink>
</template>
