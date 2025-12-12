import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchLocations,
  fetchSex,
  fetchSpecies,
  searchCities,
} from "./operations";

const initialState = {
  keyword: "",
  category: "",
  sex: "",
  species: "",
  locationId: "",
  byPopularity: null,
  byPrice: null,
  page: 1,

  categories: [],
  sexList: [],
  speciesList: [],
  allLocations: [],
  searchResults: [],

  error: null,
};

const noticesFiltersSlice = createSlice({
  name: "noticesFilters",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setByPrice(state, action) {
      state.byPrice = action.payload;
    },

    setByPopularity(state, action) {
      state.byPopularity = action.payload;
    },
    resetFilters() {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.speciesList = action.payload;
      })
      .addCase(fetchSex.fulfilled, (state, action) => {
        state.sexList = action.payload;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.allLocations = action.payload;
      })
      .addCase(searchCities.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

export const { setFilter, setByPrice, setByPopularity, setPage, resetFilters } =
  noticesFiltersSlice.actions;

export const noticesFiltersReducer = noticesFiltersSlice.reducer;
