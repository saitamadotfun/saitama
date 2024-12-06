import type { Api } from "@saitamadotfun/sdk";

export const useMember = defineStore("member", {
  actions: {
    async updateMember([workspaceId, ...args]: Parameters<
      Api["member"]["update"]
    >) {
      const { api } = useApi();
      const workspaceState = useWorkspace();
      const workspace = await workspaceState.getWorkspace(workspaceId);

      if (workspace) {
        const member = await api.member
          .update(workspaceId, ...args)
          .then(({ data }) => data);
        if (Array.isArray(workspace.members)) {
          const currentMemberIndex = workspace.members.findIndex(
            (value) => value.id === member.id
          );
          if (currentMemberIndex)
            workspace.members[currentMemberIndex] = member;
          else workspace.members.push(member);
        } else workspace.members = [member];

        return member;
      }

      return null;
    },

    async deleteMember([workspaceId, ...args]: Parameters<
      Api["member"]["delete"]
    >) {
      const { api } = useApi();
      const workspaceState = useWorkspace();
      const workspace = await workspaceState.getWorkspace(workspaceId);

      if (workspace) {
        const member = await api.member
          .delete(workspaceId, ...args)
          .then(({ data }) => data);
        if (Array.isArray(workspace.members))
          workspace.members = workspace.members.filter(
            (value) => value.id !== member.id
          );

        return member;
      }

      return null;
    },
  },
});
