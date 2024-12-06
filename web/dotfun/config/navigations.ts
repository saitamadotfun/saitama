import type { User } from "@saitamadotfun/sdk";

export type Navigation = {
  name: string;
  link: string;
  external?: boolean;
};

export const layoutNavigations: Navigation[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Categories",
    link: "#categories",
  },
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Contact us",
    link: "mailto:hr@saitamadotfun.fun",
    external: true,
  },
];

export type NavigationWithIcon = Navigation & {
  icon: string;
};

export const siteNavigations: Record<
  string,
  (NavigationWithIcon & {
    matcher: RegExp;
    condition?: (...args: any) => boolean;
  })[]
> = {
  General: [
    {
      icon: "i-mdi:account",
      name: "Account",
      link: "/account",
      matcher: /^\/?account\/?$/,
    },
    {
      icon: "i-mdi:settings",
      name: "Settings",
      link: "/:workspace/settings/",
      matcher: /^\/:?[0-9\-A-Za-z_]+\/settings\/?$/,
    },
  ],
  admin: [
    {
      icon: "i-mdi:code-block-tags",
      name: "Templates",
      link: "/admin/templates/",
      matcher: /^(\/?admin\/templates)/,
      condition: (user: User) => user.admin,
    },
  ],
  projects: [
    {
      icon: "i-mdi:collage",
      name: "Sites",
      link: "/:workspace/sites/",
      matcher: /^\/:?[0-9\-A-Za-z_]+\/sites\/?$/,
    },
    {
      icon: "i-mdi:delete",
      name: "Archive",
      link: "/:workspace/sites/archived/",
      matcher: /^\/:?[0-9\(-A-Za-z)_]+\/sites\/archived\/?$/,
    },
  ],
};
