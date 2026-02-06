import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../global/slice";
import { getErrorMessage, goitAPI } from "../auth/operations";
import { AddPetFormValues, Pet } from "../../utils/types";

export const addPet = createAsyncThunk<
  Pet,
  AddPetFormValues,
  { rejectValue: string }
>("addPet/addPet", async (data, thunkAPI) => {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));

    const response = await goitAPI.post<Pet>("users/current/pets/add", data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    dispatch(setLoading(false));
  }
});
