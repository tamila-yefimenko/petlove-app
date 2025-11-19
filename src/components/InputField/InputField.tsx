import { useField } from "formik";
import s from "./InputField.module.css";
import clsx from "clsx";
import { useState } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const InputField: React.FC<
  InputFieldProps & { isPassword?: boolean }
> = ({ className, isPassword, ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const showError = meta.touched && meta.error;
  const showSuccess = meta.touched && !meta.error;

  return (
    <div className={s.wrapper}>
      <input
        {...field}
        {...props}
        className={clsx(
          s.field,
          className,
          showError && s.error,
          showSuccess && s.success
        )}
      />

      {showError && field.value && (
        <button
          type="button"
          className={clsx(s.clearBtn, isPassword && s.pwdBtn)}
          onClick={() => helpers.setValue("")}>
          <svg width="18" height="18" className={s.iconClear}>
            <use href="/icons/sprite.svg#icon-x" />
          </svg>
        </button>
      )}

      {showSuccess && (
        <>
          <svg className={clsx(s.ok, isPassword && s.pwdIcon)}>
            <use href="/icons/sprite.svg#icon-check" />
          </svg>
        </>
      )}

      <div className={s.messageArea}>
        {showError && <div className={s.errorText}>{meta.error}</div>}
        {showSuccess && isPassword && (
          <p className={s.successText}>Password is secure</p>
        )}
      </div>
    </div>
  );
};
