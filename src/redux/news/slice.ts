import { createSlice } from "@reduxjs/toolkit";
import { NewsState } from "../../utils/types";
import { fetchNews } from "./operations";

const initialState: NewsState = {
  items: [],
  isLoading: false,
  error: null,
  isEmpty: false,
  page: 1,
  limit: 6,
  totalPages: 0,
  query: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNews(state) {
      state.items = [];
      state.page = 1;
      state.totalPages = 0;
      state.isEmpty = false;
      state.query = "";
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page += 1;
        state.isEmpty = action.payload.results.length === 0;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
        state.isLoading = false;
      });
  },
});

export const { resetNews, setQuery } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
