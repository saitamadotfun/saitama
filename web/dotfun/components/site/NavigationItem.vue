<script lang="ts" setup>
import type { NavigationWithIcon } from "~/config/navigations";

const isMenuVisible = useMobileSiteMenu();
const workspaceId = useWorkspaceId();
const props = defineProps<{
  navigation: NavigationWithIcon & {
    matcher: RegExp;
    condition?: (...args: any[]) => boolean;
  };
}>();

const { user } = useUser();
const route = useRoute();

const workspace = computed(() =>
  route.params.workspace
    ? (route.params.workspace as string)
    : workspaceId.value
);
const isActive = computed(() => props.navigation.matcher.test(route.fullPath));
const execCondition = computed(() =>
  props.navigation.condition ? props.navigation.condition(user) : true
);
</script>
<template>
  <NuxtLink
    v-if="execCondition"
    :href="navigation.link.replace(':workspace', workspace ?? '')"
    class="flex items-center space-x-2 p-2"
    :class="isActive ? 'text-black' : 'text-black/50 hover:text-black/60'"
    @click="isActive ? null : (isMenuVisible = false)"
  >
    <div
      :class="navigation.icon"
      class="text-lg"
    />
    <span class="first-letter:uppercase">{{ navigation.name }}</span>
  </NuxtLink>
</template>
