export const keys = new Set();

export const Key = (key: string): import("./types/key").Key => {
  if (key && keys.has(key))
    throw new Error("Block with key=" + key + " already exist");
  keys.add(key);
  Object.assign(key, { hash: Buffer.from(key).toString("hex") });
  return key as import("./types/key").Key;
};
