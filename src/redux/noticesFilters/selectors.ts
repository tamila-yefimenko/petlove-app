import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectFiltersForFetch = createSelector(
  (state: RootState) => state.noticesFilters,
  (filters) => ({
    keyword: filters.keyword,
    category: filters.category,
    species: filters.species,
    sex: filters.sex,
    locationId: filters.locationId,
    byPopularity: filters.byPopularity,
    byPrice: filters.byPrice,
    page: filters.page,
  })
);
