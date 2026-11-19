export type AdminRole = "SuperAdmin" | "Admin" | (string & {});

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthTokenData {
  accessToken: string;
  refreshToken?: string;
  email: string;
  fullName: string;
  role?: AdminRole;
  roles?: AdminRole[];
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  accesstoken?: string;
  accessToken?: string;
}

export interface CurrentAdminSession {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  roles?: AdminRole[];
}
