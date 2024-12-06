export type Tab = {
  icon?: string;
  name: string;
};

export const accountTabs: Tab[] = [
  {
    name: "Profile",
    icon: "i-mdi:account",
  },
  {
    name: "Workspaces",
    icon: "i-mdi:collage",
  },
  // {
  //   name: "Sessions",
  //   icon: "i-mdi:laptop",
  // },
  // {
  //   name: "API",
  //   icon: "i-mdi:key",
  // },
];

export const workspaceSettingsTabs: Tab[] = [
  {
    name: "Details",
    icon: "i-material-symbols:edit",
  },
  {
    name: "Members",
    icon: "i-material-symbols:group",
  },
  // {
  //   name: "Invite",
  //   icon: "i-mdi:plus-circle",
  // },
  // {
  //   name: "Plans",
  //   icon: "i-mdi:credit-card",
  // },
  // {
  //   name: "Permissions",
  //   icon: "i-mdi:lock",
  // },
];
