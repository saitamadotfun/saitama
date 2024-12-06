<script lang="ts" setup>
import { RadioGroupOption } from "@headlessui/vue";

const props = defineProps<{
  name: string;
  description: string;
  price: {
    currency: "euro" | "dollar";
    amount: number;
  };
  perks: {
    summaries: string[];
    details: {
      name: string;
      icon: string;
      perks: { enabled?: boolean; value: string | string[] }[];
    }[];
  };
}>();
</script>
<template>
  <RadioGroupOption
    v-slot="{ checked }"
    :value="props"
    as="template"
  >
    <div
      :class="checked ? 'border-black' : 'border-black/10'"
      class="min-w-xs flex flex-col space-y-6 border p-4 rounded cursor-pointer hover:border-black/50 focus:border-black md:min-w-sm  2xl:min-w-md"
    >
      <div class="flex flex-col space-y-4">
        <div>
          <p class="text-xl font-medium md:text-2xl">
            {{ name }}
          </p>
          <div>
            <span class="text-4xl font-bold">€{{ price.amount }}</span>
            <span class="text-black/75">/months </span>
          </div>
        </div>
        <div class="flex flex-col">
          <button
            class="p-2 rounded"
            :class="checked ? 'bg-black text-white' : 'bg-black/5 '"
          >
            Select Plan
          </button>
        </div>
      </div>
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-2">
          <div
            v-for="(summary, index) in perks.summaries"
            :key="index"
            class="flex items-center space-x-2"
          >
            <div class="i-mdi:check" />
            <span>
              {{ summary }}
            </span>
          </div>
        </div>
        <div class="flex flex-col space-y-4">
          <div
            v-for="(detail, index) in perks.details"
            :key="index"
            class="flex flex-col space-y-2"
          >
            <div class="flex items-center space-x-2">
              <div
                :class="detail.icon"
                class="text-xl"
              />
              <span>{{ detail.name }}</span>
            </div>
            <div class="flex flex-col space-y-2">
              <div
                v-for="(perk, index) in detail.perks"
                :key="index"
                class="flex items-center space-x-2"
                :class="perk.enabled ? '' : 'text-black/50'"
              >
                <div
                  v-if="perk.enabled"
                  class="i-mdi:check"
                />
                <div
                  v-else
                  class="i-mdi:circle text-[8px]"
                />
                <div
                  v-if="Array.isArray(perk.value)"
                  class="flex items-center space-x-1"
                >
                  <div
                    v-for="value in perk.value"
                    :class="perk.enabled ? 'last:text-black/75' : ''"
                  >
                    {{ value }}
                  </div>
                </div>
                <div v-else>{{ perk.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RadioGroupOption>
</template>
