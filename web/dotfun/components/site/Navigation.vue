<script setup lang="ts">
import type { RouteParamsGeneric } from "vue-router";
import { siteNavigations } from "~/config/navigations";

const subscribers = ref<Function[]>([]);
const navigationVisible = useMobileSiteMenu();
const navigation = ref<HTMLDivElement | null>(null);

const route = useRoute();
const { user } = useUser();
const workspaceId = useWorkspaceId();

const onWorkspaceChange = (params: RouteParamsGeneric) => {
  if (params.workspace) workspaceId.value = route.params.workspace as string;
};

onBeforeRouteLeave(({ params }) => onWorkspaceChange(params));

watch(navigation, (value) => {
  if (value) {
    subscribers.value.push(
      onClickOutside(value, () => {
        navigationVisible.value = false;
      })
    );
  }
});

onMounted(() => onWorkspaceChange(route.params));
onUnmounted(() => subscribers.value.map((subscriber) => subscriber()));
</script>
<template>
  <div
    :class="
      navigationVisible
        ? 'animate-slide-in-left animate-duration-100'
        : 'lt-md:!hidden'
    "
    class="lt-md:fixed lt-md:inset-0 lt-md:bg-black/25 lt-md:flex lt-md:flex-col lt-md:z-30"
  >
    <nav
      ref="navigation"
      class="w-64 flex flex-col space-y-4 p-2 lt-md:flex-1 lt-md:bg-white"
    >
      <template v-for="(navigations, name) in siteNavigations">
        <div
          v-if="/admin/.test(name) ? user?.admin : true"
          class="flex flex-col space-y-2"
        >
          <h1 class="font-medium first-letter:uppercase px-2">
            {{ name }}
          </h1>
          <div>
            <SiteNavigationItem
              v-for="(navigation, index) in navigations"
              :key="index"
              :navigation="navigation"
            />
          </div>
        </div>
      </template>
    </nav>
  </div>
</template>
