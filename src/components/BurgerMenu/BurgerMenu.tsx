import s from "./BurgerMenu.module.css";

export interface BurgerMenuProps {
  onClick?: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick }) => {
  return (
    <>
      <button type="button" onClick={onClick} className={s.menuBtn}>
        <svg width="36" height="36" className={s.menuIcon}>
          <use xlinkHref="/icons/sprite.svg#icon-menu-01" />
        </svg>
      </button>
    </>
  );
};

export default BurgerMenu;
