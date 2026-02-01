import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  deleteFromFavorites,
  editUser,
  fetchUser,
} from "./operations";
import { UserState } from "../../utils/types";

const initialState: UserState = {
  name: "",
  email: "",
  phone: "",
  avatar: "",
  noticesViewed: [],
  noticesFavorites: [],
  noticesFavIds: [],
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
        state.noticesFavorites = action.payload.noticesFavorites ?? [];
        state.noticesFavIds =
          action.payload.noticesFavorites?.map((fav) => fav._id) ?? [];
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
      })
      .addCase(addToFavorites.pending, (state, action) => {
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        const id = action.meta.arg;

        if (!state.noticesFavIds.includes(id)) {
          state.noticesFavIds.push(id);
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(deleteFromFavorites.pending, (state, action) => {
        state.error = null;
      })
      .addCase(deleteFromFavorites.fulfilled, (state, action) => {
        const id = action.meta.arg;

        state.noticesFavIds = state.noticesFavIds.filter(
          (favId) => favId !== id,
        );

        state.noticesFavorites = state.noticesFavorites.filter(
          (notice) => notice._id !== id,
        );
      })
      .addCase(deleteFromFavorites.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const userReducer = userSlice.reducer;
