import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "../../utils/types";

const initialState: GlobalState = {
  isPageLoading: false,
  isListLoading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
    setListLoading: (state, action) => {
      state.isListLoading = action.payload;
    },
  },
});

export const { setPageLoading, setListLoading } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
