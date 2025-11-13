import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import clsx from "clsx";
import s from "./AuthNav.module.css";
import { useAppSelector } from "../../redux/hooks";

const AuthNav: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const setActiveClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <nav>
      {!isLoggedIn && (
        <>
          <NavLink className={setActiveClass} to="/login">
            Login
          </NavLink>
          <NavLink className={setActiveClass} to="/register">
            Register
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default AuthNav;
