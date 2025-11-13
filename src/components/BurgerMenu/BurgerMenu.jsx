import s from "./BurgerMenu.module.css";

const BurgerMenu = ({ onClick }) => {
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
