import { RootState } from "../store";

export const selectItems = (state: RootState) => state.friends.items;
export const selectError = (state: RootState) => state.friends.error;
