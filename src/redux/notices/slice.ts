import { createSlice } from "@reduxjs/toolkit";
import { NoticesState } from "../../utils/types";
import { fetchNotices } from "./operations";

const initialState: NoticesState = {
  items: [],
  error: null,
  isEmpty: false,
  perPage: 6,
  totalPages: 0,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    resetNotices(state) {
      state.items = [];
      state.totalPages = 0;
      state.isEmpty = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state, action) => {
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.isEmpty = action.payload.results.length === 0;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { resetNotices } = noticesSlice.actions;
export const noticesReducer = noticesSlice.reducer;
