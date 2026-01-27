import s from "./EditUserBtn.module.css";

interface EditUserBtnProps {
  onClick: () => void;
}

const EditUserBtn: React.FC<EditUserBtnProps> = ({ onClick }) => {
  return (
    <button className={s.editButton} onClick={onClick}>
      <svg className={s.icon}>
        <use href="/icons/sprite.svg#icon-edit-2" />
      </svg>
    </button>
  );
};

export default EditUserBtn;
