import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, goitAPI } from "../auth/operations";
import { FetchNewsParams, NewsState, OneNews } from "../../utils/types";
import { setLoading } from "../global/slice";

export const fetchNews = createAsyncThunk<
  { results: OneNews[]; totalPages: number },
  FetchNewsParams,
  { rejectValue: string; state: { news: NewsState } }
>("news/fetchAll", async (params, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));

    const response = await goitAPI.get("/news", {
      params: params,
    });

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
