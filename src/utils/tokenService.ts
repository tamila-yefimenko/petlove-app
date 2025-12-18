import type { AxiosError } from "axios";
import { goitAPI } from "../redux/auth/operations";

export const TokenService = {
  setAuthHeader(token: string) {
    goitAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  clearAuthHeader() {
    delete goitAPI.defaults.headers.common.Authorization;
  },

  isTokenExpired(error: AxiosError) {
    return error.response?.status === 401;
  },

  getTokenFromHeader(): string | null {
    const header = goitAPI.defaults.headers.common.Authorization;

    if (typeof header === "string" && header.startsWith("Bearer ")) {
      return header.slice(7);
    }

    return null;
  },
};
