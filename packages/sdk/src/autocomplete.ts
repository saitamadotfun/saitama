import tlds from "tlds";
const domains = ["saitama.fun"];

export const domainAutocomplete = (value: string) => {
  const parts = value.split(/\./);
  const last = parts.at(-1);
  if (parts.length > 1 && last && tlds.includes(last)) return [value];
  const [name] = value.split(/\./);
  return domains.map((domain) => name.concat(".", domain));
};
