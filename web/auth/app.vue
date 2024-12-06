<script setup lang="ts">
import "@unocss/reset/tailwind.css";
import "vue3-toastify/dist/index.css";

import "~/assets/css/index.css";

useSeoMeta({
  themeColor: "#FFFFFF",
  ogImage: "/screenshot.png",
  twitterCard: "summary_large_image",
  description:
    "Build your next meme token website in minutes with Saitama's fast and easy customizable templates. Choose from fun, meme-inspired templates perfect for token and community launches.",
});
</script>
<template>
  <div class="fixed inset-0 flex flex-col bg-background">
    <NuxtPage class="font-sans text-[14px] md:text-base" />
  </div>
</template>
