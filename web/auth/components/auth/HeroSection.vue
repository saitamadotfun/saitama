<template>
  <div
    class="flex flex-col p-4 md:flex-1 md:bg-gradient-to-t md:from-black md:via-black md:to-black/75 md:text-white md:rounded-xl"
  >
    <NuxtLink to="/">
      <Logo
        width="128"
        class="fill-black md:fill-white"
        class-inverted="fill-white md:fill-black"
      />
    </NuxtLink>
    <div class="mt-auto flex flex-col space-y-2 lt-md:hidden">
      <h1 class="text-6xl font-black font-roboto">
        Idea? <br />
        Deploy, End.
      </h1>
      <p class="text-white/75">From idea to website in one punch</p>
    </div>
  </div>
</template>
