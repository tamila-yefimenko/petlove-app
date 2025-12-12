import { createSlice } from "@reduxjs/toolkit";
import { NoticesState } from "../../utils/types";
import { fetchNotices } from "./operations";

const initialState: NoticesState = {
  items: [],
  error: null,
  isEmpty: false,
  // page: 1,
  perPage: 6,
  totalPages: 0,
  query: "",
  // filtered: [],
  // filters: {},
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    resetNotices(state) {
      state.items = [];
      // state.page = 1;
      state.totalPages = 0;
      state.isEmpty = false;
      state.query = "";
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    // setPage(state, action) {
    //   state.page = action.payload;
    // },
    // setFilters(state, action) {
    //   state.filters = action.payload;
    // },
    // resetFilters(state) {
    //   state.filters = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state, action) => {
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
        // state.page = action.meta.arg.page;
        state.isEmpty = action.payload.results.length === 0;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { resetNotices, setQuery } = noticesSlice.actions;
export const noticesReducer = noticesSlice.reducer;
