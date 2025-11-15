import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectIsError = (state: RootState) => state.auth.isError;
export const selectIsPending = (state: RootState) => state.auth.isPending;
