<script setup lang="ts">
import clsx from "clsx";
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/vue";

type Props = {
  title: string;
  content: string;
};

defineProps<Props>();
</script>
<template>
  <Disclosure v-slot="{ open }">
    <ul class="flex flex-col bg-white shadow rounded-md md:w-md">
      <DisclosureButton
        as="li"
        class="shrink-0 flex items-center space-x-16 text-start px-4 py-2 md:py-4"
        :class="clsx(open ? 'border-b' : 'border-none')"
      >
        <div class="flex-1 text-xs md:text-sm">{{ title }}</div>
        <button
          :aria-label="title"
          class="bg-black p-1 text-white rounded-full cursor-pointer"
        >
          <div
            :class="
              clsx(' text-lg', open ? 'i-mdi:chevron-up' : 'i-mdi:chevron-down')
            "
          />
        </button>
      </DisclosureButton>
      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel>
          <p
            class="p-4 text-xs md:text-sm"
            v-html="content"
          />
        </DisclosurePanel>
      </Transition>
    </ul>
  </Disclosure>
</template>
