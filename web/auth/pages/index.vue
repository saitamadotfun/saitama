<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
<template>
  <main class="flex-1 flex px-4 lt-md:flex-col md:py-4">
    <AuthHeroSection />
    <AuthSignupForm />
  </main>
</template>
