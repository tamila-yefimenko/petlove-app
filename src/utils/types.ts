import { OneNews } from "../redux/news/operations";

export interface IUser {
  name: string | null;
  email: string | null;
}

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: IUser;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isError: boolean;
  isPending: boolean;
}

export interface NewsState {
  items: OneNews[];
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  page: number;
  limit: number;
  totalPages: number;
  query: string | undefined;
}

export interface FetchNewsParams {
  page: number;
  limit?: number;
  // category?: string;
  keyword?: string;
}
