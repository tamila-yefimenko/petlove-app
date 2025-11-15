import { Field, Form, Formik } from "formik";
import s from "./LoginForm.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const handleSubmit = () => {};

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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.loginWrapper}>
          <fieldset className={s.fieldset}>
            <Field
              className={s.field}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Field
              className={s.field}
              name="password"
              type="password"
              placeholder="Password"
            />
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
