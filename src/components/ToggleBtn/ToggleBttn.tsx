import clsx from "clsx";
import s from "./ToggleBtn.module.css";

export interface ToggleBtnProps {
  isShown: boolean;
  onClick: () => void;
  className: string;
}

export const ToggleBtn: React.FC<ToggleBtnProps> = ({
  isShown,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(s.toggleBtn, className && className)}>
      <svg className={s.icon}>
        <use
          href={
            isShown
              ? "/icons/sprite.svg#icon-eye-off"
              : "/icons/sprite.svg#icon-eye"
          }
        />
      </svg>
    </button>
  );
};
