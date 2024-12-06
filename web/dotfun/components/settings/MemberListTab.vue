<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";

const { user } = useUser();
const workspaceStore = useWorkspace();
const workspaceId = getWorkspaceId();

const workspace = computed(() => workspaceStore.get(workspaceId.value!)!);
const members = computed(() => workspace.value.members);
</script>

<template>
  <TabPanel class="flex flex-col space-y-8 px-4">
    <div class="flex flex-col space-y-2">
      <div class="flex items-center space-x-2">
        <Avatar
          :src="workspace.logo?.uri"
          :alt="workspace.name"
        />
        <p>{{ members.length }} Editor</p>
      </div>
    </div>
    <div>
      <div
        v-for="member in members"
        :key="member.id"
        class="flex items-center space-x-4"
      >
        <Avatar :alt="member.user.lastName ?? member.user.firstName" />
        <div class="flex-1 flex flex-col">
          <p>
            {{
              workspace.owner === member.user.id ? "You" : member.user.firstName
            }}
          </p>

          <p class="text-xs text-black/75 md:text-sm">
            {{ member.user.email }}
          </p>
        </div>
        <div>
          <p class="text-sm text-black/75 capitalize">
            {{ member.role }}
          </p>
        </div>
      </div>
    </div>
  </TabPanel>
</template>
