export interface TeamMemberApiItem {
  id: string;
  name: string;
  jobTitle: string;
  imageUrl: string | null;
}

export interface TeamMembersQueryParams {
  PageNumber?: number;
  PageSize?: number;
}

export interface CreateTeamMemberPayload {
  name: string;
  jobTitle: string;
  imageFile: File;
}

export interface UpdateTeamMemberPayload {
  id: string;
  name: string;
  jobTitle: string;
  imageFile?: File | null;
}
