import { createSlice } from "@reduxjs/toolkit";
import { addPet } from "./operations";
import { AddPetState } from "../../utils/types";

const initialState: AddPetState = {
  name: "",
  title: "",
  imgURL: "",
  species: "",
  birthday: "",
  sex: "",
  error: null,
};

const addPetSlice = createSlice({
  name: "addPet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPet.pending, (state, action) => {
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.name = action.payload.name ?? "";
        state.title = action.payload.title ?? "";
        state.imgURL = action.payload.imgURL;
        state.species = action.payload.species;
        state.birthday = action.payload.birthday;
        state.sex = action.payload.sex;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.error = action.payload ?? "unknown error";
      });
  },
});

export const addPetReducer = addPetSlice.reducer;
