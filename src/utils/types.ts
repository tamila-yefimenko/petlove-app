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

export interface OneNews {
  id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
}

export interface NewsState {
  items: OneNews[];
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
  keyword?: string;
}

export interface GlobalState {
  isLoading: boolean;
}

export interface WorkDay {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}

export interface Friend {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  phone: string;
  email: string;
  workDays: WorkDay[];
}

export interface FriendsState {
  items: Friend[];
  error: string | null;
}
