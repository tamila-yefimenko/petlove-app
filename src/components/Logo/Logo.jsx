import s from "./Logo.module.css";

const Logo = () => {
  return (
    <>
      <span>pet</span>
      <svg className={s.icon} width="23" height="23">
        <use href="/icons/sprite.svg#icon-heart-circle" />
      </svg>
      <span>love</span>
    </>
  );
};

export default Logo;
