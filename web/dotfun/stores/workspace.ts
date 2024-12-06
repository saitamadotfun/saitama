import type { Api, Workspace } from "@saitamadotfun/sdk";

type State = {
  workspaces: Map<Workspace["id"], Workspace>;
};

export const useWorkspace = defineStore("workspace", {
  state: (): State => ({
    workspaces: new Map(),
  }),
  getters: {
    all: (state) => Array.from(state.workspaces.values()),
  },
  actions: {
    get(id: Workspace["id"]) {
      return this.workspaces.get(id);
    },
    async createWorkspace(...args: Parameters<Api["workspace"]["create"]>) {
      const { api } = useApi();
      const workspace = await api.workspace
        .create(...args)
        .then(({ data }) => data);
      this.workspaces.set(workspace.id, workspace);
      return workspace;
    },
    async getWorkspace(...args: Parameters<Api["workspace"]["retrieve"]>) {
      const local = this.get(...args);
      if (local) return local;

      const { api } = useApi();

      const workspace = await api.workspace
        .retrieve(...args)
        .then(({ data }) => data);
      this.workspaces.set(workspace.id, workspace);

      return workspace;
    },
    async getWorkspaces(...args: Parameters<Api["workspace"]["list"]>) {
      const { api } = useApi();
      const workspaces = await api.workspace
        .list(...args)
        .then(({ data }) => data);
      this.workspaces = workspaces.reduceRight(
        (workspaces, workspace) => workspaces.set(workspace.id, workspace),
        this.workspaces
      );

      return workspaces;
    },
    async updateWorkspace(...args: Parameters<Api["workspace"]["update"]>) {
      const { api } = useApi();
      const workspace = await api.workspace
        .update(...args)
        .then(({ data }) => data);
      this.workspaces.set(workspace.id, workspace);
      return workspace;
    },
    async deleteWorkspace(...args: Parameters<Api["workspace"]["delete"]>) {
      const { api } = useApi();
      const workspace = await api.workspace
        .delete(...args)
        .then(({ data }) => data);
      this.workspaces.delete(workspace.id);
      return workspace;
    },

    async inviteMembers(
      ...[id, ...args]: Parameters<Api["workspace"]["invites"]>
    ) {
      const { api } = useApi();
      const workspace = await this.getWorkspace(id);
      const members = await api.workspace
        .invites(id, ...args)
        .then(({ data }) => data);
      if (Array.isArray(workspace.members)) workspace.members.push(...members);
      else workspace.members = members;

      return workspace;
    },
  },
});
