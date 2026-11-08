export interface AuthUser {
  id: number;
  name: string;
}

export interface AuthResponse {
  access_token: string
  id: number
  name: string
  permissions: string[] | null
  refresh_token: string
}
export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  permissions: string[];
}

export interface LoginRequest {
  code: string;
  password: string;
}

export interface Permission {
  id: number;
  name: string;
}


export interface UserDate {
  id: number;
  name: string;
  level: number;
  permissions: string[]
}