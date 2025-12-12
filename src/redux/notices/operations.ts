import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, goitAPI } from "../auth/operations";
import { FetchNoticesParams, NoticesState, Pet } from "../../utils/types";
import { setLoading } from "../global/slice";

export const fetchNotices = createAsyncThunk<
  { results: Pet[]; totalPages: number },
  FetchNoticesParams,
  { rejectValue: string; state: { notices: NoticesState } }
>("notices/fetchAll", async (inputParams, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));

    const params: any = {};

    Object.entries(inputParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params[key] = value;
      }
    });

    const response = await goitAPI.get("/notices", { params });

    return {
      results: response.data.results,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    dispatch(setLoading(false));
  }
});
