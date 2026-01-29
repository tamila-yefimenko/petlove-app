import { RootState } from "../store";

export const selectName = (state: RootState) => state.user.name;
export const selectEmail = (state: RootState) => state.user.email;
export const selectPhone = (state: RootState) => state.user.phone;
export const selectAvatar = (state: RootState) => state.user.avatar;
export const selectError = (state: RootState) => state.user.error;
export const selectNoticesViewed = (state: RootState) =>
  state.user.noticesViewed;
export const selectNoticesFavourite = (state: RootState) =>
  state.user.noticesFavourite;
export const selectPets = (state: RootState) => state.user.pets;
