import { store } from "../store";
import { toast } from "react-toastify";
import { TokenService } from "../../utils/tokenService";
import { goitAPI, refreshThunk, logoutThunk } from "../auth/operations";
import { navigateTo } from "../../utils/navigateHelper";
import { AxiosError } from "axios";

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

let isLoggingOut = false;

export const handleLogout = async (
  message = "Session expired. Please log in again.",
  redirectTo = "/login"
) => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    toast.error(message);

    TokenService.clearAuthHeader();

    await store.dispatch(logoutThunk());
  } finally {
    navigateTo(redirectTo);
    isLoggingOut = false;
  }
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token as string);
  });
  failedQueue = [];
};

export const setupAuthInterceptor = () => {
  goitAPI.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (!error.response) {
        return Promise.reject(error);
      }

      if (TokenService.isTokenExpired(error) && originalRequest._retry) {
        await handleLogout();
        return Promise.reject(error);
      }

      if (TokenService.isTokenExpired(error) && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return goitAPI(originalRequest);
          });
        }

        isRefreshing = true;

        try {
          const result = await store.dispatch(refreshThunk());

          if (refreshThunk.fulfilled.match(result)) {
            const newToken = result.payload.token;

            TokenService.setAuthHeader(newToken);
            processQueue(null, newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return goitAPI(originalRequest);
          }

          throw new Error("Refresh failed");
        } catch (err) {
          processQueue(err as AxiosError, null);
          await handleLogout();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
