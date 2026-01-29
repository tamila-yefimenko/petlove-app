import * as yup from "yup";
import { InferType } from "yup";

export const editUserSchema = yup
  .object({
    name: yup.string().trim().min(2, "Name is too short").notRequired(),

    email: yup
      .string()
      .trim()
      .test(
        "email-or-empty",
        "Invalid email",
        (value) =>
          !value || /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
      ),

    phone: yup
      .string()
      .trim()
      .test(
        "phone-or-empty",
        "Phone must be +380XXXXXXXXX",
        (value) => !value || /^\+38\d{10}$/.test(value),
      ),

    avatar: yup
      .string()
      .trim()
      .test(
        "avatar-or-empty",
        "Invalid image URL",
        (value) =>
          !value ||
          value.startsWith("blob:") ||
          /^https?:\/\/.*\.(png|jpg|jpeg|gif|bmp|webp)$/.test(value),
      ),
  })
  .partial();

export type EditUserFormValues = InferType<typeof editUserSchema>;
