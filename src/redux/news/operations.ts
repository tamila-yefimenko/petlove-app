import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, goitAPI } from "../auth/operations";
import { FetchNewsParams, NewsState } from "../../utils/types";

export interface OneNews {
  id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
}

export const fetchNews = createAsyncThunk<
  { results: OneNews[]; totalPages: number },
  FetchNewsParams | undefined,
  { rejectValue: string; state: { news: NewsState } }
>("news/fetchAll", async (params, thunkAPI) => {
  try {
    const state = thunkAPI.getState().news;
    // const { page = state.page, limit = state.limit, keyword } = params;

    const response = await goitAPI.get("/news", {
      params: params,
    });

    return {
      results: response.data.results,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
