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
