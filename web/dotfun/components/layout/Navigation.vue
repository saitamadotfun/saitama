<script setup lang="ts">
import { layoutNavigations } from "~/config/navigations";
const mobileMenuVisible = useMobileMenu();
</script>
<template>
  <nav
    role="menubar"
    aria-labelledby="menubutton"
    class="lt-md:fixed lt-md:inset-0 lt-md:bg-black/5 lt-md:backdrop-blur-sm lt-md:z-50 md:flex md:justify-center"
    :class="mobileMenuVisible ? 'lt-md:flex-col' : 'lt-md:hidden'"
  >
    <div
      class="lt-md:bg-white lt-md:pb-4"
      :class="
        mobileMenuVisible
          ? 'lt-md:animate-duration-100 lt-md:animate-slide-in-down'
          : ''
      "
    >
      <header class="flex md:hidden">
        <div class="ml-auto">
          <button
            class="p-2"
            @click="mobileMenuVisible = false"
          >
            <div class="i-mdi:close text-base text-black/75" />
          </button>
        </div>
      </header>
      <ul
        role="menu"
        aria-labelledby="menubutton"
        class="flex lt-md:flex-1 lt-md:flex-col lt-md:space-y-4 md:space-x-4 md:flex-row"
      >
        <li
          role="none"
          v-for="navigation in layoutNavigations"
        >
          <LayoutNavigationItem
            role="menuitem"
            :navigation
          />
        </li>
      </ul>
    </div>
  </nav>
</template>
