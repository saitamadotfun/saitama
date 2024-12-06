<script lang="ts" setup>
const mobileMenuVisible = useMobileMenu();
const route = useRoute();

const isWaitlistRoute = computed(() => /^\/waitlist/g.test(route.path));
</script>
<template>
  <header class="flex items-center bg-white text-black p-2 md:p-4">
    <NuxtLink
      href="/"
      class="px-2"
    >
      <img
        src="~/assets/icons/ic_logo.svg"
        alt="Saitama"
        width="96"
        height="96"
        class="lt-md:w-20 lt-md:h-8"
      />
    </NuxtLink>
    <div class="flex-1 flex items-center space-x-8">
      <LayoutNavigation class="flex-1" />
      <div class="flex items-center lt-md:flex-1 lt-md:justify-end">
        <NuxtLink
          v-if="!isWaitlistRoute"
          href="/workspaces"
          class="btn btn-primary rounded lt-md:hidden"
          >Get started</NuxtLink
        >
        <button
          id="menubutton"
          aria-haspopup="true"
          aria-controls="menu"
          aria-label="Menu"
          :aria-expanded="mobileMenuVisible"
          class="p-2 cursor-pointer md:hidden"
          @click="mobileMenuVisible = true"
        >
          <div class="i-mdi-menu text-xl" />
        </button>
      </div>
    </div>
  </header>
</template>
