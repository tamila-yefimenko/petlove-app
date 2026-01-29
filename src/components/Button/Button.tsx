import { ReactNode } from "react";
import clsx from "clsx";
import s from "./Button.module.css";

export interface ButtonProps {
  children: ReactNode;
  variant?: "orange" | "gray" | "white" | "light" | "transparent";
  size?: "small" | "medium" | "big";
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "orange",
  size = "small",
  fullWidth = false,
  className,
  type = "button",
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        s.button,
        s[variant],
        s[size],
        fullWidth && s.fullWidth,
        className,
      )}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
