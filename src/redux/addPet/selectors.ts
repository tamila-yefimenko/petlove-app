import { RootState } from "../store";

export const selectName = (state: RootState) => state.addPet.name;
export const selectTitle = (state: RootState) => state.addPet.title;
export const selectImgUrl = (state: RootState) => state.addPet.imgURL;
export const selectSpecies = (state: RootState) => state.addPet.species;
export const selectBirthday = (state: RootState) => state.addPet.birthday;
export const selectSex = (state: RootState) => state.addPet.sex;
export const selectError = (state: RootState) => state.addPet.error;
