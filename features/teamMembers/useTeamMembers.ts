import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMemberById,
  getTeamMembers,
  updateTeamMember,
} from "@/clientApi/teamMembersApi";
import {
  CreateTeamMemberPayload,
  TeamMemberApiItem,
  TeamMembersQueryParams,
  UpdateTeamMemberPayload,
} from "@/models/teamMember";

export const TEAM_MEMBERS_QUERY_KEYS = {
  all: ["team-members"] as const,
  list: (params?: TeamMembersQueryParams) =>
    ["team-members", "list", params] as const,
  detail: (id: string) => ["team-members", "detail", id] as const,
};

export function useTeamMembersQuery(params?: TeamMembersQueryParams) {
  return useQuery({
    queryKey: TEAM_MEMBERS_QUERY_KEYS.list(params),
    queryFn: () => getTeamMembers(params),
    staleTime: 0,
  });
}

export function useTeamMemberDetailQuery(id: string | null, enabled = true) {
  return useQuery({
    queryKey: id
      ? TEAM_MEMBERS_QUERY_KEYS.detail(id)
      : ["team-members", "detail", "none"],
    queryFn: () => (id ? getTeamMemberById(id) : Promise.reject("No id")),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCreateTeamMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTeamMemberPayload) => createTeamMember(payload),
    onSuccess: (newItem) => {
      if (newItem) {
        queryClient.setQueriesData<TeamMemberApiItem[]>(
          { queryKey: ["team-members", "list"] },
          (old) => {
            if (!old) return [newItem];
            const filtered = old.filter((m) => m.id !== newItem.id);
            return [newItem, ...filtered];
          }
        );
      }
      queryClient.invalidateQueries({
        queryKey: TEAM_MEMBERS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useUpdateTeamMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTeamMemberPayload) => updateTeamMember(payload),
    onSuccess: (updatedItem, variables) => {
      queryClient.setQueriesData<TeamMemberApiItem[]>(
        { queryKey: ["team-members", "list"] },
        (old) =>
          old
            ? old.map((m) =>
                m.id === variables.id
                  ? {
                      ...m,
                      name: updatedItem?.name || variables.name,
                      jobTitle: updatedItem?.jobTitle || variables.jobTitle,
                      imageUrl: updatedItem?.imageUrl || m.imageUrl,
                    }
                  : m
              )
            : []
      );

      if (updatedItem) {
        queryClient.setQueryData<TeamMemberApiItem>(
          TEAM_MEMBERS_QUERY_KEYS.detail(variables.id),
          updatedItem
        );
      }

      queryClient.invalidateQueries({
        queryKey: TEAM_MEMBERS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteTeamMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTeamMember(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData<TeamMemberApiItem[]>(
        { queryKey: ["team-members", "list"] },
        (old) => (old ? old.filter((m) => m.id !== deletedId) : [])
      );
      queryClient.removeQueries({
        queryKey: TEAM_MEMBERS_QUERY_KEYS.detail(deletedId),
      });
      queryClient.invalidateQueries({
        queryKey: TEAM_MEMBERS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}
