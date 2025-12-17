import { createSlice } from "@reduxjs/toolkit";
import { FavoriteState } from "../../utils/types";
import { addToFavorites, deleteFromFavorites } from "./operations";

const initialState: FavoriteState = {
  favorites: [],
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.pending, (state, action) => {
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(deleteFromFavorites.pending, (state, action) => {
        state.error = null;
      })
      .addCase(deleteFromFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(deleteFromFavorites.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
