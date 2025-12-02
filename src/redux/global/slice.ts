import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "../../utils/types";

const initialState: GlobalState = {
  isLoading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
