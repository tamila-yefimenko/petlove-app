import { RootState } from "../store";

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectError = (state: RootState) => state.favorites.error;
