import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "./operations";
import { FriendsState } from "../../utils/types";

const initialState: FriendsState = {
  items: [],
  error: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state, action) => {
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const friendsReducer = friendsSlice.reducer;
