import { Form, Formik, FormikHelpers } from "formik";
import s from "./LoginForm.module.css";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { ToggleBtn } from "../ToggleBtn/ToggleBttn";
import { loginThunk } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { InputField } from "../InputField/InputField";

const FeedbackSchema = Yup.object().shape({
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
});

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>
  ) => {
    try {
      await dispatch(loginThunk(values)).unwrap();
      navigate("/profile");
      actions.resetForm();
    } catch (error) {
      toast.error(`Login failed: ${error}`);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className={s.loginForm}>
      <h2 className={s.loginTitle}>Log in</h2>
      <p className={s.loginText}>
        Welcome! Please enter your credentials to login to the platform:
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}>
        <Form className={s.loginWrapper}>
          <fieldset className={s.fieldset}>
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
          </fieldset>
          <Button type="submit" fullWidth className={s.button}>
            Log in
          </Button>
          <Link to={"/register"} className={s.link}>
            Don't have an account? <span className={s.span}>Register!</span>
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
