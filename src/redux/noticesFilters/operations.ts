import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, goitAPI } from "../auth/operations";

export const fetchCategories = createAsyncThunk(
  "notices/categories",
  async (_, thunkAPI) => {
    try {
      const res = await goitAPI.get("/notices/categories");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchSpecies = createAsyncThunk(
  "notices/species",
  async (_, thunkAPI) => {
    try {
      const res = await goitAPI.get("/notices/species");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchSex = createAsyncThunk("notices/sex", async (_, thunkAPI) => {
  try {
    const res = await goitAPI.get("/notices/sex");
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const fetchLocations = createAsyncThunk(
  "noticesFilters/allLocations",
  async (_, thunkAPI) => {
    try {
      const res = await goitAPI.get("/cities/locations");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const searchCities = createAsyncThunk(
  "noticesFilters/searchCities",
  async (keyword: string, thunkAPI) => {
    try {
      const res = await goitAPI.get("/cities", {
        params: { keyword },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
