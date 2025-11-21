import s from "./BurgerMenu.module.css";

export interface BurgerMenuProps {
  onClick?: () => void;
  isHome: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick, isHome }) => {
  return (
    <>
      <button type="button" onClick={onClick} className={s.menuBtn}>
        <svg className={isHome ? s.iconHome : s.menuIcon}>
          <use href="/icons/sprite.svg#icon-menu-01" />
        </svg>
      </button>
    </>
  );
};

export default BurgerMenu;
