export type Asset = {
  id: string;
  name: string;
  uri: string;
  type: "image" | "video" | "file";
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};
