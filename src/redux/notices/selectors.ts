import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  selectCategory,
  selectKeyword,
  selectLocationId,
  selectSex,
  selectSpecies,
} from "../noticesFilters/selectors";

export const selectNotices = (state: RootState) => state.notices.items;
export const selectError = (state: RootState) => state.notices.error;
export const selectQuery = (state: RootState) => state.notices.query;
// export const selectPage = (state: RootState) => state.notices.page;
export const selectPerPage = (state: RootState) => state.notices.perPage;
export const selectTotalPages = (state: RootState) => state.notices.totalPages;

export const selectFilteredNotices = createSelector(
  [
    selectNotices,
    selectKeyword,
    selectCategory,
    selectSpecies,
    selectSex,
    selectLocationId,
  ],
  (notices, keyword, category, species, sex, locationId) => {
    const normalizedKeyword = keyword.toLowerCase().trim();

    return notices.filter((notice) => {
      const byKeyword =
        !keyword ||
        notice.title.toLowerCase().includes(normalizedKeyword) ||
        notice.name.toLowerCase().includes(normalizedKeyword);

      const byCategory =
        !category || notice.category.toLowerCase() === category.toLowerCase();

      const bySpecies =
        !species || notice.species.toLowerCase() === species.toLowerCase();

      const bySex = !sex || notice.sex.toLowerCase() === sex.toLowerCase();

      const byLocation = !locationId || notice.location === locationId;

      return byKeyword && byCategory && bySpecies && bySex && byLocation;
    });
  }
);
