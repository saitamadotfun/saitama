<script lang="ts" setup>
import { toast } from "vue3-toastify";
import { TabPanel } from "@headlessui/vue";

import { format } from "~/utils/format";
import { formatPrice } from "~/utils/currency";
import { processCreateForm, type CreateForm } from "~/form/createForm";

const emit = defineEmits<{ previous: [] }>();
const props = defineProps<CreateForm>();

const { api } = useApi();
const { user } = useUser();
const isSubmitting = ref(false);

const workspaceId = getWorkspaceId();

const onSubmit = () => {
  isSubmitting.value = true;
  if (workspaceId.value)
    return toast
      .promise(
        processCreateForm(api, { ...props, workspace: workspaceId.value! }),
        {
          pending: "Creating and deploying site.",
          success: "Site created successfully.",
          error: "Oops! an unexpected error occur while creating site.",
        }
      )
      .then((site) => {
        if (workspaceId.value) {
          const redirectURL = format(
            "%/%/sites/%/",
            window.location.origin,
            workspaceId.value,
            site.id
          );

          if (props.template.metadata.bumfiPaymentLink)
            window.open(
              getBumfiPaymentLink(props.template.metadata.bumfiPaymentLink.id, {
                redirect_to: redirectURL,
                email: user?.email,
                customer_ident: user?.id,
              }),
              "_self"
            );
          else navigateTo(redirectURL);
        }
      })
      .finally(() => (isSubmitting.value = false));
};
</script>
<template>
  <TabPanel class="flex flex-col space-y-8">
    <div>
      <h1 class="text-lg font-medium">Checkout</h1>
      <p class="text-xs text-black/75">
        Pay once for all access including hosting
      </p>
    </div>
    <div class="flex flex-col space-y-2 md:max-w-sm">
      <div class="grid bg-white/50 rounded divide-y">
        <CreateCheckoutItem
          name="template"
          :quantity="1"
          icon="i-mdi:view-grid"
          icon-class="bg-violet-100 text-violet-700"
          :price="formatPrice(template.price)"
        />
        <CreateCheckoutItem
          name="custom domains"
          :quantity="1"
          icon="i-mdi:domain"
          icon-class="bg-red-100 text-red-500"
          :price="domain.free ? 'FREE' : '€50'"
        />

        <CreateCheckoutItem
          name="add ons"
          :quantity="0"
          icon="i-mdi:tools"
          icon-class="bg-green-500/10 text-green-500"
          price="€0.00"
        />
      </div>
      <div class="flex items-center py-2 text-base">
        <p class="flex-1">Total amount</p>
        <p class="font-bold font-medium">
          {{
            formatPrice({
              currency: template.price?.currency,
              amount: template.price.amount + (domain.free ? 0 : 50),
            })
          }}
        </p>
      </div>
    </div>
    <div class="flex justify-end space-x-4">
      <button
        type="button"
        class="py-2 border-b border-black"
        @click="emit('previous')"
      >
        PREV
      </button>
      <button
        :disabled="isSubmitting"
        type="button"
        class="py-2 border-b border-black"
        @click="onSubmit"
      >
        NEXT
      </button>
    </div>
  </TabPanel>
</template>
