import * as yup from "yup";
import { InferType } from "yup";

export const editUserSchema = yup.object({
  name: yup.string().trim().min(2, "Name is too short").notRequired(),

  email: yup
    .string()
    .trim()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .notRequired(),

  phone: yup
    .string()
    .trim()
    .matches(/^\+38\d{10}$/, "Phone must be +380XXXXXXXXX")
    .notRequired(),

  avatar: yup
    .string()
    .trim()
    .matches(
      /^https?:\/\/.*\.(png|jpg|jpeg|gif|bmp|webp)$/,
      "Invalid image URL",
    )
    .notRequired(),
});

// export type EditUserFormValues = InferType<typeof editUserSchema>;
