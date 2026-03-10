import { createAsyncThunk } from "@reduxjs/toolkit";
import { Friend } from "../../utils/types";
import { setPageLoading } from "../global/slice";
import { getErrorMessage, goitAPI } from "../auth/operations";

export const fetchFriends = createAsyncThunk<
  Friend[],
  void,
  { rejectValue: string }
>("friends/fetchAll", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setPageLoading(true));

    const response = await goitAPI.get("/friends");

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    dispatch(setPageLoading(false));
  }
});
