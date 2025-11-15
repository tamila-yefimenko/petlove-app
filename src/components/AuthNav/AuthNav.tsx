import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";
import Button from "../Button/Button";
import clsx from "clsx";

export interface AuthNavProps {
  onClickItem?: () => void;
  isMenu?: boolean;
  vertical?: boolean;
}

const AuthNav: React.FC<AuthNavProps> = ({ onClickItem, isMenu, vertical }) => {
  return (
    <div className={clsx(s.wrapper, vertical && s.vertical)}>
      <NavLink to="/login" onClick={onClickItem}>
        <Button fullWidth={isMenu} size="medium" variant="orange">
          Log in
        </Button>
      </NavLink>

      <NavLink to="/register" onClick={onClickItem}>
        <Button fullWidth={isMenu} size="medium" variant="light">
          Registration
        </Button>
      </NavLink>
    </div>
  );
};

export default AuthNav;
