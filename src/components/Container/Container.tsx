import { ReactNode } from "react";
import s from "./Container.module.css";
import clsx from "clsx";

export interface ContainerProps {
  children: ReactNode;
  className: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx(s.container, className && className)}>{children}</div>
  );
};
