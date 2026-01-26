import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../global/slice";
import axios from "axios";
import { getErrorMessage, goitAPI } from "../auth/operations";
import { User } from "../../utils/types";

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
