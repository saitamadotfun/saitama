import { Api } from "@saitamadotfun/sdk";

type State = {
  apiURL: string;
  accessToken: string | undefined | null;
};

export const useApi = defineStore("api", {
  state: (): State => {
    const config = useRuntimeConfig();
    const apiURL = import.meta.server
      ? config.API_BASE_URL
      : config.public.API_BASE_URL;
    return {
      apiURL,
      accessToken: undefined,
    };
  },
  getters: {
    api: (state) => new Api(state.apiURL, state.accessToken),
  },
});
