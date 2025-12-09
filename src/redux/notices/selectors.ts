import { RootState } from "../store";

export const selectNotices = (state: RootState) => state.notices.items;
export const selectError = (state: RootState) => state.notices.error;
export const selectQuery = (state: RootState) => state.notices.query;
export const selectPage = (state: RootState) => state.notices.page;
export const selectPerPage = (state: RootState) => state.notices.perPage;
export const selectTotalPages = (state: RootState) => state.notices.totalPages;
