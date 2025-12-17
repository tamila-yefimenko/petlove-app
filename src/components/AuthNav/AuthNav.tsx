import { NavLink, useLocation } from "react-router-dom";
import s from "./AuthNav.module.css";
import Button from "../Button/Button";
import clsx from "clsx";

export interface AuthNavProps {
  onClickItem?: () => void;
  isMenu?: boolean;
  vertical?: boolean;
  isMobile?: boolean;
}

const AuthNav: React.FC<AuthNavProps> = ({
  onClickItem,
  isMenu,
  vertical,
  isMobile,
}) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  function getVariant(vertical: boolean, isHome: boolean) {
    if (vertical) {
      return isHome ? "orange" : "transparent";
    } else {
      return isHome ? "transparent" : "orange";
    }
  }
  const loginVariant = getVariant(Boolean(vertical), isHome);

  return (
    <div className={clsx(s.wrapper, vertical && s.vertical)}>
      <NavLink to="/login" onClick={onClickItem}>
        <Button
          className={s.button}
          fullWidth={isMenu && isMobile}
          size="medium"
          variant={loginVariant}>
          Log in
        </Button>
      </NavLink>

      <NavLink to="/register" onClick={onClickItem}>
        <Button
          className={s.button}
          fullWidth={isMenu && isMobile}
          size="medium"
          variant="light">
          Registration
        </Button>
      </NavLink>
    </div>
  );
};

export default AuthNav;
