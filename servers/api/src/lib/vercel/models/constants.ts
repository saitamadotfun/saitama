export const frameworks = [
  "blitzjs",
  "nextjs",
  "gatsby",
  "remix",
  "astro",
  "hexo",
  "eleventy",
  "docusarus-2",
  "docusaurus",
  "preact",
  "solidstart-1",
  "solidstart",
  "dojo",
  "ember",
  "vue",
  "scully",
  "ionic-angular",
  "angular",
  "polymer",
  "svelte",
  "sveltekit",
  "sveltekit-1",
  "ionic-react",
  "create-react-app",
  "gridsome",
  "umijs",
  "sapper",
  "saber",
  "stencil",
  "nuxtjs",
  "rewoodjs",
  "hugo",
  "jekyll",
  "brunch",
  "middleman",
  "zola",
  "hydrogen",
  "vite",
  "vitepress",
  "parcel",
  "fasthtml",
  "sanity-v3",
  "sanity",
  "storybook",
] as const;

export type Framework = (typeof frameworks)[number];
