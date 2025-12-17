import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, goitAPI } from "../auth/operations";

export const addToFavorites = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>("favorites/addToFavorites", async (id, thunkAPI) => {
  try {
    const response = await goitAPI.post(`/notices/favorites/add/${id}`);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteFromFavorites = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>("favorites/deleteFromFavorites", async (id, thunkAPI) => {
  try {
    const response = await goitAPI.delete(`/notices/favorites/remove/${id}`);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
