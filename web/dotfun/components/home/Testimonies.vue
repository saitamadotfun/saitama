<script setup lang="ts">
import { homeTestimonies } from "~/config/testimonies";
</script>

<template>
  <section class="flex flex-col px-2">
    <div
      class="m-auto flex flex-col space-y-8 bg-highlight p-4 md:p-8 rounded-xl md:min-w-4xl md:min-h-xl"
    >
      <div class="flex flex-col text-center">
        <h1 class="text-2xl font-medium">Testimonies</h1>
        <p class="text-xs text-black/75 md:text-sm">
          Saitama is a go-to tool for whales and developers.
          <br class="lt-sm:hidden" />Delivering fast meme site templates that
          are customizable.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-y-4 sm:gap-x-4 sm:grid-cols-2">
        <HomeTestimony
          v-for="testimony in homeTestimonies"
          v-bind="testimony"
          class="lt-sm:m-auto"
        />
      </div>
    </div>
  </section>
</template>
