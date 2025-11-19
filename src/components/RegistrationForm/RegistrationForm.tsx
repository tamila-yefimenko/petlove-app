import { Form, Formik, FormikHelpers } from "formik";
import s from "./RegistrationForm.module.css";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { ToggleBtn } from "../ToggleBtn/ToggleBttn";
import { registerThunk } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { InputField } from "../InputField/InputField";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
  email: Yup.string()
    .email("Enter a valid Email")
    .max(64, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(64, "Max length is 64 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setComfirm] = useState(false);

  const handleSubmit = async (
    values: RegistrationValues,
    actions: FormikHelpers<RegistrationValues>
  ) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    // dispatch(setLoading(true));
    try {
      await dispatch(registerThunk(payload)).unwrap();
      navigate("/profile");
      actions.resetForm();
    } catch (error) {
      toast.error(`Registration failed: ${error}`);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className={s.registerForm}>
      <h2 className={s.registerTitle}>Registration</h2>
      <p className={s.registerText}>
        Thank you for your interest in our platform.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}>
        <Form className={s.registerWrapper}>
          <fieldset className={s.fieldset}>
            <div className={s.inputWrapper}>
              <InputField
                className={s.field}
                name="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className={s.inputWrapper}>
              <InputField
                className={s.field}
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className={`${s.inputWrapper} ${s.passwordWrapper}`}>
              <InputField
                name="password"
                isPassword
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={s.field}
              />
              <ToggleBtn
                className={s.toggleBtn}
                isShown={showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
            <div className={`${s.inputWrapper} ${s.passwordWrapper}`}>
              <InputField
                name="confirmPassword"
                isPassword
                type={confirm ? "text" : "password"}
                placeholder="Password"
                className={s.field}
              />
              <ToggleBtn
                className={s.toggleBtn}
                isShown={confirm}
                onClick={() => setComfirm((prev) => !prev)}
              />
            </div>
          </fieldset>
          <Button type="submit" fullWidth className={s.button}>
            Registration
          </Button>
          <Link to={"/login"} className={s.link}>
            Already have an account? <span className={s.span}>Login</span>
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
