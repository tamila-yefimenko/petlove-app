import { RootState } from "../store";

export const selectIsPageLoading = (state: RootState) =>
  state.global.isPageLoading;
export const selectIsListLoading = (state: RootState) =>
  state.global.isListLoading;
