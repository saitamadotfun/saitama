export const useWorkspaceId = () => useState<string | null>(() => null);

export const getWorkspaceId = () => {
  const route = useRoute();
  const workspaceId = useWorkspaceId();

  return computed(() =>
    route.params.workspace
      ? (route.params.workspace as string)
      : workspaceId.value ?? undefined
  );
};
