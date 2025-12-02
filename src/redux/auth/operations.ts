import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse } from "../../utils/types";
import { setLoading } from "../global/slice";

export const goitAPI = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

const setAuthNav = (token: string) => {
  goitAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthNav = () => {
  goitAPI.defaults.headers.common.Authorization = ``;
};

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Unknown error";
};

export const registerThunk = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; name: string },
  { rejectValue: string }
>("auth/register", async (body, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));

    const response = await goitAPI.post("/users/signup", body);
    console.log("response", response.data);
    setAuthNav(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    dispatch(setLoading(false));
  }
});

export const loginThunk = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (body, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));

    const response = await goitAPI.post("/users/signin", body);
    setAuthNav(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    dispatch(setLoading(false));
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));

    await goitAPI.post("/users/signout");
    removeAuthNav();
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    dispatch(setLoading(false));
  }
});

export const refreshThunk = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string; state: { auth: any } }
>("auth/refresh", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));

    const persistedToken = thunkAPI.getState().auth.token;
    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No valid token");
    }
    setAuthNav(persistedToken);

    const response = await goitAPI.get("/users/current");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    dispatch(setLoading(false));
  }
});
