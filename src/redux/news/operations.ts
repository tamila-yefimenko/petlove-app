import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, goitAPI } from "../auth/operations";
import { FetchNewsParams, NewsState, OneNews } from "../../utils/types";
import { setListLoading, setPageLoading } from "../global/slice";

export const fetchNews = createAsyncThunk<
  { results: OneNews[]; totalPages: number },
  FetchNewsParams,
  { rejectValue: string; state: { news: NewsState } }
>("news/fetchAll", async (params, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;

  const { news } = getState();
  const isInitialLoad = news.items.length === 0;

  try {
    if (isInitialLoad) {
      dispatch(setPageLoading(true));
    } else {
      dispatch(setListLoading(true));
    }

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
    if (isInitialLoad) {
      dispatch(setPageLoading(false));
    } else {
      dispatch(setListLoading(false));
    }
  }
});
