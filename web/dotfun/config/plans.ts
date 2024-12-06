export type Plan = {
  [key: string]: {
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
  }[];
};

export const subscriptionPlans: Plan = {
  personal: [
    {
      name: "Mini",
      description: "Meme pages are ",
      price: {
        currency: "euro",
        amount: 5,
      },
      perks: {
        summaries: ["2 pages", "10 GB bandwidth", "Custom domain"],
        details: [
          {
            name: "Publish",
            icon: "i-mdi:arrow-up-box",
            perks: [
              { enabled: true, value: ["Home", "+ 404 page"] },
              { value: "CMS collections" },
            ],
          },
          {
            name: "Collaboration",
            icon: "i-iconamoon:cursor-fill",
            perks: [
              { enabled: true, value: ["3 editors max ", "%price per editor"] },
              { enabled: true, value: ["3 day", "version history"] },
            ],
          },
          {
            name: "Hosting",
            icon: "i-mdi:database",
            perks: [
              { enabled: true, value: ["500MB", "storage"] },
              { enabled: true, value: ["10GB", "bandwidth"] },
              { enabled: true, value: ["5MB", "file uploads"] },
            ],
          },
          {
            name: "Support",
            icon: "i-mdi:help-circle",
            perks: [{ enabled: true, value: ["Community", "support"] }],
          },
        ],
      },
    },
    {
      name: "Basic",
      description: "Basic meme pages are ",
      price: {
        currency: "euro",
        amount: 15,
      },
      perks: {
        summaries: ["1,000 pages", "50 GB bandwidth", "Password protect"],
        details: [
          {
            name: "Publish",
            icon: "i-mdi:arrow-up-box",
            perks: [
              { enabled: true, value: ["1,000", "Pages"] },
              { value: ["2", "CMS collections"] },
            ],
          },
          {
            name: "Collaboration",
            icon: "i-iconamoon:cursor-fill",
            perks: [
              { enabled: true, value: ["3 editors max ", "%price per editor"] },
              { enabled: true, value: ["7 day", "version history"] },
            ],
          },
          {
            name: "Hosting",
            icon: "i-mdi:database",
            perks: [
              { enabled: true, value: ["1GB", "storage"] },
              { enabled: true, value: ["50GB", "bandwidth"] },
              { enabled: true, value: ["10MB", "file uploads"] },
            ],
          },
          {
            name: "Support",
            icon: "i-mdi:help-circle",
            perks: [{ enabled: true, value: ["Community", "support"] }],
          },
        ],
      },
    },
    {
      name: "Pro",
      description: "Growing meme pages are ",
      price: {
        currency: "euro",
        amount: 30,
      },
      perks: {
        summaries: ["10,000 pages", "100 GB bandwidth", "10 CMS collections"],
        details: [
          {
            name: "Publish",
            icon: "i-mdi:arrow-up-box",
            perks: [
              { enabled: true, value: ["10,000", "Pages"] },
              { value: ["10", "CMS collections"] },
            ],
          },
          {
            name: "Collaboration",
            icon: "i-iconamoon:cursor-fill",
            perks: [
              { enabled: true, value: ["3 editors max ", "%price per editor"] },
              { enabled: true, value: ["30 day", "version history"] },
            ],
          },
          {
            name: "Hosting",
            icon: "i-mdi:database",
            perks: [
              { enabled: true, value: ["10GB", "storage"] },
              { enabled: true, value: ["100GB", "bandwidth"] },
              { enabled: true, value: ["20MB", "file uploads"] },
            ],
          },
          {
            name: "Support",
            icon: "i-mdi:help-circle",
            perks: [{ enabled: true, value: ["Community", "support"] }],
          },
        ],
      },
    },
  ],
};
