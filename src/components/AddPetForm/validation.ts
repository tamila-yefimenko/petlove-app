import * as yup from "yup";

export const addPetSchema = yup.object({
  name: yup.string().trim().min(2, "Name is too short").required(),

  title: yup.string().trim().min(2, "Title is too short").required(),

  species: yup.string().trim().required(),

  sex: yup.string().trim().required(),

  imgURL: yup
    .string()
    .trim()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Invalid image URL",
    )
    .required(),

  birthday: yup
    .string()
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .required(),
});
