import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectKeyword = (state: RootState) => state.noticesFilters.keyword;

export const selectCategory = (state: RootState) =>
  state.noticesFilters.category;

export const selectSpecies = (state: RootState) => state.noticesFilters.species;

export const selectSex = (state: RootState) => state.noticesFilters.sex;

export const selectLocationId = (state: RootState) =>
  state.noticesFilters.locationId;

export const selectByPopularity = (state: RootState) =>
  state.noticesFilters.byPopularity;

export const selectByPrice = (state: RootState) => state.noticesFilters.byPrice;

export const selectPage = (state: RootState) => state.noticesFilters.page;

export const selectLocations = (state: RootState) =>
  state.noticesFilters.allLocations;

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
  })
);
