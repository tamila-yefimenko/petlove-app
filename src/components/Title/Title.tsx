import clsx from "clsx";
import { ReactNode } from "react";
import s from "./Title.module.css";

export interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return <h2 className={clsx(s.title, className)}>{children}</h2>;
};

export default Title;
