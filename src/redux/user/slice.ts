import { createSlice } from "@reduxjs/toolkit";
import { editUser, fetchUser } from "./operations";
import { UserState } from "../../utils/types";

const initialState: UserState = {
  name: "",
  email: "",
  phone: "",
  avatar: "",
  noticesViewed: [],
  noticesFavourite: [],
  pets: [],
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
        state.noticesViewed = action.payload.noticesViewed ?? [];
        state.noticesFavourite = action.payload.noticesFavourite ?? [];
        state.pets = action.payload.pets ?? [];
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload ?? "unknown error";
      })
      .addCase(editUser.pending, (state, action) => {
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.name = action.payload.name ?? state.name;
        state.email = action.payload.email ?? state.email;
        state.phone = action.payload.phone ?? state.phone;
        state.avatar = action.payload.avatar ?? state.avatar;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.payload ?? "unknown error";
      });
  },
});

export const userReducer = userSlice.reducer;
