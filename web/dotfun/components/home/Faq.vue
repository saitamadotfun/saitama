<script setup lang="ts">
import { homeFaqs } from "~/config/faqs";
</script>

<template>
  <section class="flex flex-col space-y-8">
    <div class="flex flex-col text-center px-4">
      <h1 class="text-2xl font-medium">Frequently asked questions</h1>

      <div
        class="inline items-center justify-center text-xs text-black/75 md:text-sm"
      >
        <span>
          These are the most most commonly asked questions about Saitama.
        </span>
        <br class="lt-md:hidden" />
        <span> Can't find what you're looking for? </span>
        <a
          href="mailto:hr@saitamafun.fun"
          target="_blank"
          class="underline underline-black"
          >Chat to our friendly team!</a
        >
      </div>
    </div>
    <div
      class="m-auto flex flex-col lt-md:space-y-4 max-w-sm lt-md:p-2 md:min-w-4xl md:flex-row md:space-x-4"
    >
      <div class="flex flex-col space-y-4">
        <HomeFaqItem
          v-for="faq in homeFaqs.slice(0, homeFaqs.length / 2)"
          v-bind="faq"
        />
      </div>
      <div class="flex flex-col space-y-4">
        <HomeFaqItem
          v-for="faq in homeFaqs.slice(homeFaqs.length / 2)"
          v-bind="faq"
        />
      </div>
    </div>
  </section>
</template>
