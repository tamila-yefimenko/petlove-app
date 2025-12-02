import { RootState } from "../store";

export const selectNews = (state: RootState) => state.news.items;
export const selectError = (state: RootState) => state.news.error;
export const selectQuery = (state: RootState) => state.news.query;
export const selectPage = (state: RootState) => state.news.page;
export const selectLimit = (state: RootState) => state.news.limit;
export const selectTotalPages = (state: RootState) => state.news.totalPages;
