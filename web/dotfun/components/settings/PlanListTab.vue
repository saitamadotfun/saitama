<script lang="ts" setup>
import { RadioGroup, TabPanel } from "@headlessui/vue";
import { subscriptionPlans } from "~/config/plans";
</script>
<template>
  <TabPanel>
    <RadioGroup
      v-for="[group, plans] in Object.entries(subscriptionPlans)"
      :key="group"
      class="flex flex-col space-y-8 lt-md:px-4"
    >
      <div
        class="self-center max-w-vw px-16 snap-x flex space-x-4 overflow-x-scroll"
      >
        <SubscriptionPlan
          v-for="(plan, index) in plans"
          :key="index"
          v-bind="plan"
          class="snap-center"
        />
      </div>
    </RadioGroup>
  </TabPanel>
</template>
