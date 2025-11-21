import s from "./Logo.module.css";

interface LogoProps {
  isHome: boolean;
}

const Logo: React.FC<LogoProps> = ({ isHome }) => {
  return (
    <div className={s.logo}>
      <span className={isHome ? s.homeSpan : s.logoSpan}>petl</span>
      <svg className={isHome ? s.homeIcon : s.logoIcon}>
        <use href="/icons/sprite.svg#icon-heart-circle" />
      </svg>
      <span className={isHome ? s.homeSpan : s.logoSpan}>ve</span>
    </div>
  );
};

export default Logo;
