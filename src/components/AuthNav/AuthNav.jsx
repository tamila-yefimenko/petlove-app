import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import clsx from "clsx";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const setActiveClass = ({ isActive }) => {
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
      <p>Login</p>
      <p>Register</p>
    </nav>
  );
};

export default AuthNav;
