import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, goitAPI } from "../auth/operations";
import { FetchNoticesParams, NoticesState, Pet } from "../../utils/types";
import { setListLoading, setPageLoading } from "../global/slice";

export const fetchNotices = createAsyncThunk<
  { results: Pet[]; totalPages: number },
  FetchNoticesParams,
  { rejectValue: string; state: { notices: NoticesState } }
>("notices/fetchAll", async (inputParams, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;

  const { notices } = getState();
  const isInitialLoad = notices.items.length === 0;

  try {
    if (isInitialLoad) {
      dispatch(setPageLoading(true));
    } else {
      dispatch(setListLoading(true));
    }

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
    if (isInitialLoad) {
      dispatch(setPageLoading(false));
    } else {
      dispatch(setListLoading(false));
    }
  }
});

export const fetchNoticeById = createAsyncThunk<
  Pet,
  string,
  { rejectValue: string }
>("notices/fetchById", async (id, thunkAPI) => {
  try {
    const response = await goitAPI.get(`/notices/${id}`);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
