import s from "./ToggleBtn.module.css";

export interface ToggleBtnProps {
  isShown: boolean;
  onClick: () => void;
}

export const ToggleBtn: React.FC<ToggleBtnProps> = ({ isShown, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={s.toggleBtn}>
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
