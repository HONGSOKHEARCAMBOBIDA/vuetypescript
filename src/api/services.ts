import api from "./index";
import type { ApiResponse } from "../types/api";
import type { AuthResponse, LoginRequest, RefreshTokenResponse, UserDate } from "../types/auth";
import type { AxiosResponse } from "axios";

export const refreshToken = (): Promise<
  AxiosResponse<ApiResponse<RefreshTokenResponse>>
> => api.post("/refresh", {}, { withCredentials: true });

export const logoutUser = () => api.post("/logout");

export const getuserdate = (): Promise<AxiosResponse<ApiResponse<UserDate>>> =>
  api.get<ApiResponse<UserDate>>("/view.user.data");

export const login = (
  data: LoginRequest
): Promise<AxiosResponse<ApiResponse<AuthResponse>>> =>
  api.post<ApiResponse<AuthResponse>>("/login", data)
