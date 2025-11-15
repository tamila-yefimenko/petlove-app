import s from "./BurgerMenu.module.css";

export interface BurgerMenuProps {
  onClick?: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick }) => {
  return (
    <>
      <button type="button" onClick={onClick} className={s.menuBtn}>
        <svg className={s.menuIcon}>
          <use href="/icons/sprite.svg#icon-menu-01" />
        </svg>
      </button>
    </>
  );
};

export default BurgerMenu;
