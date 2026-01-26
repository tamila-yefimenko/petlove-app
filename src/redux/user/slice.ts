import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./operations";
import { UserState } from "../../utils/types";

const initialState: UserState = {
  name: "",
  email: "",
  phone: "",
  avatar: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.name = action.payload.name ?? "";
        state.email = action.payload.email;
        state.phone = action.payload.phone ?? "";
        state.avatar = action.payload.avatar ?? "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload ?? "unknown error";
      });
  },
});

export const userReducer = userSlice.reducer;
