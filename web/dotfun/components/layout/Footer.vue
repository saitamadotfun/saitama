<script setup lang="ts">
import { homeSocials } from "~/config/socials";
</script>

<template>
  <footer class="bg-white p-4">
    <div class="flex items-end">
      <div class="flex-1 flex flex-col">
        <img
          src="~/assets/icons/ic_logo_tm.svg"
          alt="Saitama"
          width="64"
          height="64"
          class="w-20 h-8 md:w-24"
        />
        <div class="flex space-x-2 text-xs text-black/75">
          <span> © Saitama 2024 </span>
          <div class="flex space-x-2">
            <NuxtLink
              to="/legal/privacy-policy/"
              class="underline"
              >Privacy Policy</NuxtLink
            >
          </div>
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <NuxtLink
          v-for="social in homeSocials"
          :aria-label="social.name"
          :href="social.link"
          target="_open"
          class="bg-black text-white p-1 rounded"
        >
          <div :class="social.icon" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
