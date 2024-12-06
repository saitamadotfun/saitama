import type { Api, User } from "@saitamadotfun/sdk";

type State = {
  user: User | null;
};
export const useUser = defineStore("user", {
  state: (): State => {
    return {
      user: null,
    };
  },
  actions: {
    async getUser() {
      const { api } = useApi();
      const user = await api.user.retrieve("me").then(({ data }) => data);
      this.user = user;
      return user;
    },
    async createUser(...args: Parameters<typeof Api.prototype.user.create>) {
      const { api } = useApi();
      const user = await api.user.create(...args).then(({ data }) => data);
      this.user = user;

      return user;
    },
    async updateUser(...args: Parameters<typeof Api.prototype.user.update>) {
      const { api } = useApi();
      const user = await api.user.update(...args).then(({ data }) => data);
      this.user = user;
      return user;
    },
    async deleteUser(...args: Parameters<typeof Api.prototype.user.delete>) {
      const { api } = useApi();
      const user = await api.user.delete(...args).then(({ data }) => data);
      this.user = null;
      return user;
    },
  },
});
