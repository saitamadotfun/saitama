<template>
  <section class="m-auto absolute inset-0 flex flex-col max-w-6xl md:inset-0">
    <div class="flex-1 relative flex flex-col">
      <div
        class="flex-1 flex flex-col justify-center items-center space-y-4 z-50 xl:absolute xl:inset-x-0 xl:inset-t-48 xl:space-y-8"
      >
        <div
          class="flex items-center space-x-2 border-2 border-black pl-1 pr-4 py-1 rounded-full"
        >
          <div class="bg-black text-white px-3 py-1 rounded-full">
            Live
          </div>
          <NuxtLink
            target="_blank"
            href="https://dexscreener.com/solana/4ltrv6y4chrrc2ysuncw1friunxyobpl1mmj2vgcmoon"
            class="flex items-center space-x-4"
          >
            <span>Trade Now</span>
            <div class="i-mdi:arrow-up rotate-45 text-lg" />
          </NuxtLink>
        </div>
        <div class="flex flex-col text-center">
          <h1 class="text-2xl md:text-6xl lg:text-6xl">From idea to</h1>
          <div class="flex text-7xl md:text-9xl lg:text-9xl">
            <div class="relative">
              <div
                class="absolute -top-8 -left-12.5 md:-top-6 md:-left-13 flex flex-col items-center justify-center"
              >
                <Pill text="Fun" />
                <Pill
                  text="Fast"
                  class="translate-x-4 -mt-1 z-10"
                />
                <Pill
                  text="In a punch"
                  class="translate-x-12 -mt-1 z-20"
                />
              </div>
              <h1 class="font-bold">W</h1>
            </div>
            <div class="relative">
              <h1 class="font-bold">ebsite</h1>
              <div
                class="absolute -bottom-3 -right-8 rotate-2.5 md:-bottom-1.5 md:-right-8"
              >
                <Pill text="Meme-centric templates!" />
              </div>
            </div>
          </div>
          <h1 class="text-2xl md:text-6xl lg:text-6xl">in One Punch</h1>
        </div>
        <NuxtLink
          href="/workspaces"
          class="btn btn-primary rounded lg:px-10"
          >Get Started</NuxtLink
        >
      </div>

      <NuxtImg
        width="128"
        height="128"
        alt="Habibi"
        src="/illustrations/il_habibi.svg"
        class="absolute top-40 left-10 md:left-50 md:top-50 z-10 lg:top-70 lg:left-90"
      />
      <NuxtImg
        width="128"
        height="128"
        alt="Whoami"
        src="/illustrations/il_whoami.svg"
        class="absolute bottom-20 -left-5 md:bottom-30 md:left-15 z-10 lg:bottom-10 lg:left-40"
      />
      <NuxtImg
        width="128"
        height="128"
        alt="Ciger"
        src="/illustrations/il_ciger.svg"
        class="absolute bottom-85 right-0 md:bottom-75 md:right-45 z-10 lg:bottom-75 lg:right-70"
      />
      <NuxtImg
        width="128"
        height="128"
        alt="Pepe"
        src="/illustrations/il_pepe.svg"
        class="absolute bottom-30 -right-10 md:bottom-25 md:right-15 z-10 lg:bottom-0 lg:right-65"
      />
    </div>
  </section>
</template>
