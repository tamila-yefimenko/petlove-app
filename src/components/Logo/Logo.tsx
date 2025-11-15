import s from "./Logo.module.css";

const Logo: React.FC = () => {
  return (
    <div className={s.logo}>
      <span className={s.span}>petl</span>
      <svg className={s.icon}>
        <use href="/icons/sprite.svg#icon-heart-circle" />
      </svg>
      <span className={s.span}>ve</span>
    </div>
  );
};

export default Logo;
