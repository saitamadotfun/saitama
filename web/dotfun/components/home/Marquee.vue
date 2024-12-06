<template>
  <div class="flex bg-highlight overflow-x-hidden">
    <div class="flex space-x-4 px-4 animate-marquee">
      <HomeMarqueeItem
        v-for="i in 8"
        :key="i"
      />
    </div>
  </div>
</template>
