<script lang="ts" setup>
defineRouteRules({
  prerender: true,
});
</script>
<template>
  <NuxtLayout>
    <div
      class="flex-1 flex flex-col space-y-8 overflow-y-scroll overflow-x-hidden"
    >
      <div class="relative flex flex-col h-xl lg:h-2xl">
        <LayoutHeader class="sticky top-0 z-50" />
        <div class="flex flex-col h-md md:h-xl lg:h-2xl overflow-hidden">
          <HomeBackground class="h-md md:h-xl lg:h-2xl" />
          <HomeHeroSection class="z-10" />
          <div class="flex-1" />
          <HomeMarquee class="z-20" />
        </div>
      </div>
      <HomeTestimonies />
      <HomeFaq />
      <LayoutFooter />
    </div>
  </NuxtLayout>
</template>
