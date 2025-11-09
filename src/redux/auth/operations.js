import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const goitAPI = axios.create({
  baseURL: "https://petlove.b.goit.study",
});

const setAuthNav = (token) => {
  goitAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthNav = () => {
  goitAPI.defaults.headers.common.Authorization = ``;
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, thunkAPI) => {
    try {
      const response = await goitAPI.post("/users/signup", body);
      console.log("response", response.data);
      setAuthNav(response.data.token);
      return response.data;
    } catch (error) {
      let message = "Unknown error";
      if (error && typeof error === "object" && "message" in error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, thunkAPI) => {
    try {
      const response = await goitAPI.post("/users/signin", body);
      setAuthNav(response.data.token);
      return response.data;
    } catch (error) {
      let message = "Unknown error";
      if (error && typeof error === "object" && "message" in error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await goitAPI.post("/users/signout");
      removeAuthNav();
    } catch (error) {
      let message = "Unknown error";
      if (error && typeof error === "object" && "message" in error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const persistedToken = thunkAPI.getState().auth.token;
      if (!persistedToken) {
        return thunkAPI.rejectWithValue("No valid token");
      }
      setAuthNav(persistedToken);

      const response = await goitAPI.get("/users/current");
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
