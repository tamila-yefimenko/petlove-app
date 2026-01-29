import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../global/slice";
import axios from "axios";
import { getErrorMessage, goitAPI } from "../auth/operations";
import { EditUserFormValues, Pet, User } from "../../utils/types";

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/fetchUser",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;

    try {
      dispatch(setLoading(true));

      const response = await goitAPI.get("/users/current/full");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const editUser = createAsyncThunk<
  User,
  Partial<EditUserFormValues>,
  { rejectValue: string }
>("user/editUser", async (data, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));

    const response = await goitAPI.patch<User>("users/current/edit", data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    dispatch(setLoading(false));
  }
});

export const addPet = createAsyncThunk<Pet, void, { rejectValue: string }>(
  "user/addPet",
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;

    try {
      dispatch(setLoading(true));

      const response = await goitAPI.post<Pet>("users/current/pets/add", data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    } finally {
      dispatch(setLoading(false));
    }
  },
);
